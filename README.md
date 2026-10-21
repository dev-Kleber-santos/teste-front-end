# Econverse — catálogo de produtos

Interface do teste técnico Front-End Júnior da Econverse, implementada em React e TypeScript a partir do Figma. O catálogo consome o JSON oficial e apresenta os detalhes do produto selecionado em um modal acessível.

## Tecnologias e pré-requisitos

- React 19, TypeScript, Vite e Sass; sem biblioteca de UI.
- ESLint com regras de TypeScript e React Hooks.
- Node.js 24 e npm 12 (ambiente utilizado), conexão com a internet para produtos e fotografias.
- Navegador atualizado com suporte a `HTMLDialogElement`.

## Instalação e execução

Execute na raiz do repositório, sem criar outra pasta de projeto:

```sh
npm ci
npm run dev
```

Abra a URL informada pelo Vite, normalmente `http://localhost:5173`. No PowerShell, se a política bloquear `npm.ps1`, use `npm.cmd` nos mesmos comandos. Nenhum arquivo de variáveis de ambiente é necessário.

```sh
npm run lint
npm run build
npm run preview
```

O build gera `dist/`; o preview serve esse build localmente, normalmente na porta 4173. `node_modules/`, `dist/`, logs e caches de compilação são ignorados pelo Git.

## Funcionalidades

- Cabeçalho, banner principal, sete categorias, três vitrines, parceiros, marcas, newsletter e rodapé.
- Produtos do JSON oficial compartilhados entre as vitrines; rolagem horizontal e adaptação para telas estreitas.
- Validação da resposta em tempo de execução, cancelamento da consulta, carregamento, estado vazio, erro e nova tentativa.
- Descrição do modal exibida somente quando fornecida e não vazia; ausência ou `null` não geram texto substituto.
- Modal com nome, foto, descrição e preço do item selecionado; fechamento pelo botão ou Escape, foco inicial, contenção de Tab, retorno ao acionador e bloqueio de rolagem do fundo.
- HTML semântico, labels acessíveis, foco visível e link para pular ao conteúdo.

## Organização

```text
src/
  assets/figma/        Assets estáticos do layout
  components/
    catalog/          Cards, vitrines e modal
    layout/           Cabeçalho e rodapé
    marketing/        Banner, categorias, parceiros e marcas
  hooks/              Estado e ciclo da consulta de produtos
  pages/              Composição da Home
  services/           Fetch e validação do JSON
  styles/             Tokens e estilos globais Sass
  types/              Contrato TypeScript dos produtos
scripts/              Verificação de integração no navegador
```

## Teste de navegador

O teste existente usa Chrome DevTools Protocol e as APIs nativas do Node.js, sem dependências adicionais. Ele consulta a API real e precisa de internet, do Vite na porta 5173 e de uma instância dedicada do Chrome com depuração local habilitada:

```sh
chrome --headless --remote-debugging-address=127.0.0.1 --remote-debugging-port=9223 --user-data-dir=/caminho/temporario/econverse-browser-test
npm run test:browser
```

Use o caminho do executável do Chrome e uma pasta temporária adequada ao seu sistema. Encerre a instância dedicada após o teste. O script cria e fecha sua própria aba. Verifica nomes, imagens e preços contra a resposta real, detalhes de três produtos no modal, fechamento, foco e ausência de erros JavaScript no fluxo normal. Examina overflow nas larguras de 1440, 768 e 390 px e verifica carregamento das imagens. Também simula carregamento, erro HTTP, nova tentativa, lista vazia, contrato inválido, JSON malformado e falha de rede apenas na memória do navegador. Capturas são salvas no diretório temporário do sistema, fora do repositório. As mensagens `APROVADO` pertencem ao teste, não à aplicação. Não há suíte de testes unitários.

Essas verificações não substituem testes com leitor de tela, outros navegadores e revisão de contraste e fidelidade visual. Os textos cinza pequenos e as fontes em fallback ainda exigem revisão antes da entrega final.

## Integração e limitações conhecidas

- O JSON disponibiliza somente `productName`, `descriptionShort`, `photo` e `price`. Não são fabricados IDs, categorias ou atributos comerciais. A unidade monetária não está documentada: o número original é exibido em notação pt-BR, com indicação de unidade não especificada. Confirmar a unidade antes da apresentação monetária final.
- A origem não informou cabeçalho CORS nas consultas realizadas. Em desenvolvimento e preview, `/api/products` usa um proxy Vite restrito ao endpoint oficial. Hospedar apenas `dist/` não fornece essa rota: uma publicação futura exige proxy equivalente ou CORS na origem.
- Busca, navegação por categorias, favoritos, conta, compra, links institucionais e envio da newsletter são apenas apresentação ou controles desativados. Carrinho e checkout não foram implementados por falta de contrato funcional.
- Poppins, Outfit e Work Sans estão declaradas, mas seus arquivos ainda não foram obtidos; o navegador usa fallback Arial. A reprodução pixel a pixel permanece pendente.
- O segundo conjunto de parceiros reutiliza provisoriamente a imagem do primeiro, com aviso visível. O gradiente do banner principal é aproximado; setas das vitrines ainda não foram implementadas. Textos Lorem Ipsum de parceiros e rodapé foram substituídos por textos em português brasileiro.
- Os assets originais incluem imagens grandes (banner principal de aproximadamente 6,5 MB), ainda sem otimização. Produtos e fotografias dependem da disponibilidade externa.
- A responsividade é uma adaptação de implementação; não foi identificado um layout mobile oficial.

## Referências e entrega

- [Figma original](https://www.figma.com/file/rWnzPeoxgynuNPsJjV0VmV/Teste-Front-End-Jr?node-id=0%3A1)
- [Cópia usada na implementação](https://www.figma.com/design/Bdvd16RLRT1q5xUk3xR0Af/Teste-Front-End-Jr--c%C3%B3pia-?node-id=0-1)
- [Referência da vitrine](https://app.econverse.com.br/teste-front-end/junior/tecnologia/layout/vitrine-produtos.png)
- [JSON oficial](https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json)

As instruções originais estão preservadas abaixo. A entrega ainda exige conferir a fidelidade visual e a unidade de preço, além de confirmar o fork e o envio do link conforme o processo seletivo.

---

# Teste Econverse: Vaga Desenvolvedor Front-End

### Vem ser #Econverse!

Segue abaixo as instruções para a execução do teste.

## Instruções
- Faça um fork desse projeto para a sua conta pessoal do GitHub.
- Desenvolva a página conforme as **Especificações Técnicas** 
- Crie um README com as instruções para compilar, testar e rodar o projeto.
- O link do repositório deverá ser enviado para o e-mail gustavo.cipriano@econverse.com.br com o título **Teste Vaga FrontEnd**

## Especificações Técnicas
- Desenvolver a pagina em React e TypeScript conforme o [layout](https://www.figma.com/file/rWnzPeoxgynuNPsJjV0VmV/Teste-Front-End-Jr?node-id=0%3A1). Para conseguir pegar os elementos do Figma, basta copiar o layout para sua conta que terá acesso de edição.
- Montar a [vitrine](https://app.econverse.com.br/teste-front-end/junior/tecnologia/layout/vitrine-produtos.png) de produtos consumindo as informações dos produtos em json atraves desse [Link](https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json).
- Desenvolver a interação ao clicar em um produto conforme layout. A interação consiste em abrir um modal com as principais informações do produto presente no arquivo [JSON](https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json) conforme o produto que clicar.
- Utilizar Pré-processador Sass, Less ou Stylus.
- Respeitar o Layout pixel a pixel, tamanho das fontes, cores e botões.
- Não Utilizar bibliotecas UI como Bootstrap, Foundation, ou afins.

## Pontos Extras
- Utilizar Boas práticas de SEO
- Uso de HTML semântico

## O que avaliaremos em seu teste
- Organização do projeto
- Lógica do código
- Componentização
- Alcance dos objetivos propostos

**Boa sorte! ;)**
