import { mkdir, writeFile } from 'node:fs/promises'

const url = 'https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json'
const response = await fetch(url, { signal: AbortSignal.timeout(30000) })
if (!response.ok) throw new Error(`Falha ao obter produtos oficiais: HTTP ${response.status}`)

const source = await response.text()
const payload = JSON.parse(source)
if (payload.success !== true || !Array.isArray(payload.products)) {
  throw new Error('O JSON oficial retornou uma estrutura inválida.')
}

await mkdir(new URL('../public/dados/', import.meta.url), { recursive: true })
await writeFile(new URL('../public/dados/produtos.json', import.meta.url), source, 'utf8')
console.log(`JSON oficial obtido para publicação: ${payload.products.length} produtos, sem alteração dos valores.`)
