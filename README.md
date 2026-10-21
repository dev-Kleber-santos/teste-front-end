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
