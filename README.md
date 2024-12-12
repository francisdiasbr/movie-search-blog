# Movie Search Blog 🎬

## Sobre o Projeto
Uma aplicação web que permite aos usuários explorar posts de blog sobre filmes clássicos. O projeto utiliza uma arquitetura moderna com React e Redux, oferecendo uma experiência fluida de navegação e busca.

## Tecnologias Utilizadas
- React
- TypeScript
- Redux Toolkit
- React Router DOM
- Styled Components

## Estrutura do Projeto
```
src/
├── api/
│   └── service.js        # Serviço base para chamadas API
├── components/
│   └── MovieDetails.tsx  # Componente de detalhes do filme
├── features/
│   └── blogPost/
│       ├── blogPostSlice.ts        # Slice para detalhes do post
│       └── searchBlogPostSlice.ts  # Slice para busca de posts
├── store/
│   ├── hooks.ts          # Hooks customizados do Redux
│   ├── store.ts          # Configuração da store
│   └── types.ts          # Tipos globais
├── styles/
│   ├── Card.styles.ts    # Estilos dos cards
│   └── GlobalStyles.ts   # Estilos globais
└── Home/
    └── index.tsx         # Página principal
```

## Funcionalidades
- 🔍 Busca de posts de blog sobre filmes
- 📖 Visualização detalhada de cada post

## Como Executar

1. Instale as dependências:
```bash
yarn
```

3. Execute o projeto:
```bash
yarn dev
```
