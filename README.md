# The Movie Blog 🎬

[![Netlify Status](https://api.netlify.com/api/v1/badges/7431b07d-a0e7-4853-a1fe-bb8a878b3a37/deploy-status)](https://app.netlify.com/sites/themoviesearchblog/deploys)

[English Version](README_EN.md)


Uma aplicação web bilíngue (PT/EN) para explorar análises detalhadas de filmes clássicos, com foco em aspectos técnicos, históricos e culturais.

## 🌟 Características

- **Interface Bilíngue**: Suporte completo para Português e Inglês
- **Análises Detalhadas**: Seções estruturadas cobrindo diversos aspectos dos filmes
- **Design Responsivo**: Experiência otimizada para diferentes dispositivos
- **Navegação Intuitiva**: Interface limpa e fácil de usar
- **Galeria de Imagens**: Visualização de cenas e cartazes dos filmes
- **Trilhas Sonoras**: Informações sobre as músicas originais dos filmes

## 🚀 Tecnologias

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Styled Components](https://styled-components.com/)
- [React Router](https://reactrouter.com/)

## 📦 Instalação

Instale as dependências
```bash
npm install
```
Inicie o servidor de desenvolvimento
```bash
npm run dev
```

## Configuração

1. crie um arquivo .env na raiz do projeto com as seguintes variáveis:
```bash
VITE_MOVIE_SEARCH_BLOG_API_URL=api_url_aqui
```

## Estrutura do Projeto

```bash
src/
├── components/ # Componentes reutilizáveis
├── contexts/ # Contexto de idioma com ContextAPI
├── features/ # Features Redux
├── pages/ # Componentes de página
├── store/ # Configuração do Redux
├── styles/ # Estilos globais
└── types/ # Definições de tipos TypeScript
```

## 🎯 Principais Funcionalidades

### Navegação Bilíngue
- Toggle fácil entre PT/EN
- Persistência da preferência de idioma
- Conteúdo totalmente traduzido

### Análise de Filmes
- Introdução
- Elenco e Personagens
- Contexto Histórico
- Importância Cultural
- Análise Técnica
- Trilha Sonora Original
- Conclusão

### Galeria de Mídia
- Cartazes dos filmes
- Cenas importantes
- Interface responsiva


## Documentação

A documentação técnica detalhada fica na pasta [`docs/`](docs/README.md):

- [Arquitetura](docs/arquitetura.md): pastas, rotas, store Redux, acesso à API, idioma e estilos.
- [Telas](docs/telas.md): o que cada página mostra, o estado que usa e as chamadas que dispara.
- [Componentes](docs/componentes.md): componentes compartilhados e suas props.
- [API consumida](docs/api-consumida.md): rotas do backend usadas pelo frontend.
- [Desenvolvimento](docs/desenvolvimento.md): instalação, scripts, variáveis de ambiente e configuração do Netlify.
