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
