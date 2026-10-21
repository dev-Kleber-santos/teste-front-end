// Chrome headless com --remote-debugging-port=9223. Sem dependências adicionais.
import assert from 'node:assert/strict'
import { writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
// Aba dedicada: a simulação não deve contaminar uma aba de revisão manual.
const targetResponse = await fetch('http://127.0.0.1:9223/json/new?about:blank', { method: 'PUT' })
assert.ok(targetResponse.ok, 'Chrome deve estar iniciado com --remote-debugging-port=9223')
const target = await targetResponse.json()
const socket = new WebSocket(target.webSocketDebuggerUrl)
await new Promise(resolve => socket.addEventListener('open', resolve, { once: true }))
let sequence = 0
const pending = new Map()
const errors = []
socket.addEventListener('message', event => {
  const message = JSON.parse(event.data)
  if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails.text)
  if (message.method === 'Runtime.consoleAPICalled' && message.params.type === 'error') errors.push(message.params.args)
  if (message.id) { pending.get(message.id)?.(message); pending.delete(message.id) }
})
function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = ++sequence
    const timeout = setTimeout(() => { pending.delete(id); reject(new Error(`Tempo esgotado: ${method}`)) }, 20000)
    pending.set(id, message => { clearTimeout(timeout); message.error ? reject(new Error(JSON.stringify(message.error))) : resolve(message.result) })
    socket.send(JSON.stringify({ id, method, params }))
  })
}
async function evaluate(expression) {
  const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })
  if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails))
  return result.result.value
}
async function waitFor(expression) {
  for (let attempt = 0; attempt < 100; attempt++) {
    if (await evaluate(expression)) return
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  throw new Error(`Condição não atendida: ${expression}`)
}
try {
  await send('Runtime.enable')
  await send('Page.enable')
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false })
  await send('Page.navigate', { url: 'http://127.0.0.1:5173/' })
  await waitFor('document.querySelectorAll(".product-card").length === 30')
  console.log('APROVADO: 10 produtos reais em cada uma das 3 vitrines')
  const products = await evaluate('fetch("/api/products").then(r=>r.json()).then(r=>r.products)')
  const expected = products.map(product => product.productName)
  assert.deepEqual(await evaluate('[...document.querySelectorAll("#vitrine-1-title")[0].parentElement.querySelectorAll("h3")].map(n=>n.textContent)'), expected)
  assert.deepEqual(await evaluate('[...document.querySelectorAll(".product-track")[0].querySelectorAll("img")].map(image=>image.src)'), products.map(product => product.photo))
  assert.deepEqual(await evaluate('[...document.querySelectorAll(".product-track")[0].querySelectorAll(".product-price strong")].map(price=>price.textContent)'), products.map(product => new Intl.NumberFormat('pt-BR').format(product.price)))
  for (const index of [0, 1, 9]) {
    await evaluate(`{ const button = document.querySelectorAll('.product-open')[${index}]; button.focus(); button.click(); }`)
    await waitFor('!!document.querySelector("dialog[open]")')
    assert.equal(await evaluate('document.querySelector("dialog h2").textContent'), expected[index])
    assert.equal(await evaluate('document.querySelector("#modal-product-description").textContent'), products[index].descriptionShort)
    assert.equal(await evaluate('document.querySelector("dialog img").src'), products[index].photo)
    assert.equal(await evaluate('document.querySelector("dialog .product-price strong").textContent'), new Intl.NumberFormat('pt-BR').format(products[index].price))
    assert.equal(await evaluate('/LOREM IPSUM|Many desktop publishing/i.test(document.querySelector("dialog").textContent)'), false)
    console.log(`APROVADO: ${products[index].productName}; JSON=${products[index].price}; card/modal=${new Intl.NumberFormat('pt-BR').format(products[index].price)}`)
    assert.equal(await evaluate('document.activeElement.className'), 'modal-close')
    for (let tab = 0; tab < 3; tab++) await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 })
    assert.equal(await evaluate('document.querySelector("dialog").contains(document.activeElement)'), true)
    if (index === 1) await evaluate('document.querySelector(".modal-close").click()')
    else await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 })
    await waitFor('!document.querySelector("dialog")')
    assert.equal(await evaluate(`document.activeElement === document.querySelectorAll('.product-open')[${index}]`), true)
  }
  console.log('APROVADO: modal para produtos 1, 2 e 10; botão, Escape, foco inicial, contenção e retorno de foco')
  // As capturas são temporárias, fora do repositório; não constituem novos relatórios.
  for (const width of [1440, 768, 390]) {
    await send('Emulation.setDeviceMetricsOverride', { width, height: 1000, deviceScaleFactor: 1, mobile: false })
    assert.equal(await evaluate('document.documentElement.scrollWidth <= innerWidth'), true, `Overflow na largura ${width}`)
    await evaluate('[...document.images].forEach(image => { image.loading = "eager" })')
    await waitFor('[...document.images].every(image => image.complete)')
    assert.equal(await evaluate('[...document.images].every(image => image.naturalWidth > 0)'), true, 'Imagens devem carregar sem falhas')
    const metrics = await send('Page.getLayoutMetrics')
    const screenshot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width, height: Math.ceil(metrics.cssContentSize.height), scale: 1 } })
    await writeFile(join(tmpdir(), `econverse-audit-${width}.png`), Buffer.from(screenshot.data, 'base64'))
  }
  console.log('APROVADO: desktop 1440px, tablet 768px e mobile 390px sem overflow; imagens reais carregadas')
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true })
  assert.equal(await evaluate('document.documentElement.scrollWidth <= innerWidth'), true)
  await evaluate('document.querySelector(".product-open").click()')
  await waitFor('!!document.querySelector("dialog[open]")')
  assert.equal(await evaluate('document.querySelector("dialog").getBoundingClientRect().width <= innerWidth'), true)
  await evaluate('document.querySelector(".modal-close").click()')
  console.log('APROVADO: viewport 390px sem overflow da página e modal contido')
  assert.deepEqual(errors, [])
  console.log('APROVADO: sem exceções JS ou console.error no fluxo normal')
  // Remover/limpar somente a descrição de produtos reais em memória; a origem não é alterada.
  await send('Page.addScriptToEvaluateOnNewDocument', { source: `
    const fetchWithDescriptions = window.fetch;
    window.fetch = async (...args) => {
      const response = await fetchWithDescriptions(...args);
      if (String(args[0]) !== '/api/products') return response;
      const payload = await response.json();
      delete payload.products[0].descriptionShort;
      payload.products[1].descriptionShort = '';
      payload.products[2].descriptionShort = null;
      return new Response(JSON.stringify(payload), {status: response.status, headers: {'Content-Type': 'application/json'}});
    };
    window.__optionalDescriptionTest = true;
  ` })
  await send('Page.reload')
  await waitFor('window.__optionalDescriptionTest === true && document.querySelectorAll(".product-card").length === 30')
  for (const index of [0, 1, 2]) {
    await evaluate(`document.querySelectorAll('.product-open')[${index}].click()`)
    await waitFor('!!document.querySelector("dialog[open]")')
    assert.equal(await evaluate('document.querySelector("dialog h2").textContent'), expected[index])
    assert.equal(await evaluate('document.querySelector("#modal-product-description")'), null)
    assert.equal(await evaluate('document.querySelector("dialog").hasAttribute("aria-describedby")'), false)
    assert.equal(await evaluate('document.querySelector("dialog .product-price strong").textContent'), new Intl.NumberFormat('pt-BR').format(products[index].price))
    assert.equal(await evaluate('document.querySelector("dialog img").src'), products[index].photo)
    await evaluate('document.querySelector(".modal-close").click()')
    await waitFor('!document.querySelector("dialog")')
  }
  assert.deepEqual(errors, [])
  console.log('APROVADO: descrição ausente, vazia e null; sem texto substituto nem referência ARIA inexistente')
  // Interceptar fetch em memória para verificar os estados, sem alterar dados/servidor.
  await send('Page.addScriptToEvaluateOnNewDocument', { source: `const originalFetch = window.fetch; window.fetch = (...args) => String(args[0]) === '/api/products' ? new Promise(resolve => setTimeout(() => resolve(new Response('{}', {status: 503})), 1200)) : originalFetch(...args);` })
  await send('Page.reload')
  await waitFor('document.querySelector(".catalog-state")?.textContent.includes("Carregando")')
  await waitFor('document.querySelector("[role=alert]")?.textContent.includes("503")')
  await evaluate('document.querySelector("[role=alert] button").click()')
  await waitFor('document.querySelector(".catalog-state")?.textContent.includes("Carregando")')
  console.log('APROVADO: carregamento, erro HTTP e nova tentativa')
  // Substitui somente respostas de teste; nenhum produto de demonstração é persistido.
  const scenarios = [
    { expression: 'Promise.resolve(new Response(JSON.stringify({success: true, products: []})))', condition: 'document.querySelector(".catalog-state")?.textContent.includes("Nenhum produto")' },
    { expression: 'Promise.resolve(new Response(JSON.stringify({success: true, products: [{}]})))', condition: 'document.querySelector("[role=alert]")?.textContent.includes("inválidos")' },
    { expression: 'Promise.resolve(new Response("json-inválido"))', condition: '!!document.querySelector("[role=alert]")' },
    { expression: 'Promise.reject(new TypeError("Rede indisponível"))', condition: '!!document.querySelector("[role=alert]")' },
  ]
  for (const [index, scenario] of scenarios.entries()) {
    await send('Page.addScriptToEvaluateOnNewDocument', { source: `window.__catalogScenario = ${index}; window.fetch = () => ${scenario.expression};` })
    await send('Page.reload')
    await waitFor(`window.__catalogScenario === ${index}`)
    await waitFor(scenario.condition)
  }
  console.log('APROVADO: lista vazia, contrato inválido, JSON malformado e falha de rede')
} finally {
  socket.close()
  await fetch(`http://127.0.0.1:9223/json/close/${target.id}`)
}
