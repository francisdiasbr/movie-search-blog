# Documentação técnica do Movie Search Blog (frontend)

Esta pasta descreve em detalhe o frontend do blog do projeto Movie Search: uma aplicação React + TypeScript, empacotada com Vite, com estado em Redux Toolkit e estilos em styled-components. Os dados vêm da API do repositório `movie-search-blog-backend`.

O conteúdo foi escrito a partir da leitura do código em `src/` no estado atual do diretório de trabalho, que inclui alterações ainda não commitadas (a camada `src/lib/` e os `service/` de cada feature). Onde algo não pôde ser confirmado pelo código, o texto diz "não verificado".

## Índice

| Documento | O que cobre |
| --- | --- |
| [arquitetura.md](arquitetura.md) | Estrutura de pastas, roteamento, store Redux, camada de acesso à API, contextos, idioma pt/en, estilos e diagramas. |
| [telas.md](telas.md) | Cada rota, incluindo a página 404: o que a pessoa vê, componentes, estado, chamadas à API e estados de carregamento, vazio e erro. |
| [componentes.md](componentes.md) | Componentes compartilhados de `src/components/`, suas props e onde são usados. |
| [api-consumida.md](api-consumida.md) | Todas as rotas do backend chamadas pelo frontend, quem chama e o formato de resposta esperado. |
| [desenvolvimento.md](desenvolvimento.md) | Instalação, execução, build, lint, variáveis de ambiente e configuração do Netlify. |

## Resumo em um parágrafo

A aplicação é uma SPA com sete rotas de conteúdo e uma rota coringa de página não encontrada, declaradas em `src/App.tsx`. A página inicial mostra um carrossel de recomendações e uma grade de cards de artigos. Cada artigo (`/article/:movieId`) combina, para o mesmo filme, uma crítica autoral, um post de blog em seções, imagens e uma linha de metadados do filme. A página `/movie/:movieId` mostra a ficha de um filme recomendado, com diretor e trilha sonora. Há ainda uma lista de críticas, uma lista de filmes favoritos de A a Z, um blogroll e uma página "Blog" com conteúdo fixo no código. Todo o texto de interface existe em português e inglês, e a escolha é guardada no `localStorage`.

## Convenções usadas nestes documentos

- `tconst` é o identificador do filme no IMDb (por exemplo `tt0050083`). É a chave usada nas rotas e nas chamadas à API.
- Os caminhos de API aparecem relativos à URL base definida em `VITE_MOVIE_SEARCH_BLOG_API_URL`. O frontend não acrescenta nenhum prefixo; se a API vive em `/api`, esse trecho precisa fazer parte da variável.
- "Thunk" se refere a uma ação assíncrona criada com `createApiThunk` (um invólucro de `createAsyncThunk`).
