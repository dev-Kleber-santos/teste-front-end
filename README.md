# Econverse — catálogo de produtos

Interface do teste técnico Front-End Júnior da Econverse, implementada em React e TypeScript a partir do Figma. O catálogo consome o JSON oficial e apresenta os detalhes do produto selecionado em um modal acessível.

## Tecnologias e pré-requisitos

- React 19, TypeScript, Vite e Sass; sem biblioteca de UI.
- ESLint com regras de TypeScript e React Hooks.
- Node.js 24 e npm 12 (ambiente utilizado), conexão com a internet para produtos e fotografias.
- Navegador atualizado com suporte a `HTMLDialogElement`.

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

## Publicação no GitHub Pages

Endereço: https://dev-kleber-santos.github.io/teste-front-end/

O workflow `.github/workflows/deploy.yml` executa em pushes para `main` e manualmente em Actions. Usa ações oficiais do GitHub, Node.js 24, `npm ci`, lint, build e publicação de `dist`. O Vite usa `base: /teste-front-end/`; imports de imagens e CSS respeitam esse caminho. As fontes continuam usando fallback.

A origem do JSON oficial não permite CORS. Em desenvolvimento, `/api/products` usa o proxy Vite. No build, `scripts/prepare-products.mjs` baixa o JSON oficial sem modificar seus valores para `dist/dados/produtos.json`. No site publicado, o navegador consulta essa cópia na mesma origem. Os produtos são atualizados a cada publicação, não em tempo real. Se o download falhar, o build e a publicação falham. A cópia gerada não é versionada.

### Executar e validar

```sh
npm ci
npm run dev
npm run lint
npm run build
npm run preview
```

Desenvolvimento: `http://localhost:5173/teste-front-end/`. Preview: `http://localhost:4173/teste-front-end/`. No PowerShell, use `npm.cmd` se `npm.ps1` estiver bloqueado.

Com Chrome headless de testes na porta 9223:

```sh
npm run test:browser -- http://127.0.0.1:4173/teste-front-end/ /teste-front-end/dados/produtos.json
```

O teste verifica produtos reais, modal, foco, erros de consulta e larguras desktop, tablet e mobile. A unidade de `price` continua não documentada; nenhuma conversão monetária foi presumida.
