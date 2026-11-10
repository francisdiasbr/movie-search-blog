# Telas

Este documento percorre cada página do frontend: o que aparece, o que dá para fazer, quais componentes e estado são usados, quais chamadas à API são disparadas e como a página se comporta enquanto carrega, quando não há dados e quando há erro.

Os caminhos de API são relativos à URL base (`VITE_MOVIE_SEARCH_BLOG_API_URL`). O detalhe de cada rota está em [api-consumida.md](api-consumida.md).

## Resumo das rotas

| Rota | Página | Chama a API | Usa Redux |
| --- | --- | --- | --- |
| `/` | [Home](#home-) | Sim | Sim |
| `/article/:movieId` | [CompleteArticle](#completearticle-articlemovieid) | Sim | Sim |
| `/movie/:movieId` | [MovieDetail](#moviedetail-moviemovieid) | Sim | Não (estado local) |
| `/reviews` | [Reviews](#reviews-reviews) | Sim | Sim |
| `/favorites` | [Favorites](#favorites-favorites) | Sim | Sim |
| `/blogroll` | [Blogroll](#blogroll-blogroll) | Não | Não |
| `/blog` | [Blog](#blog-blog) | Não | Não |
| `*` | [NotFound](#notfound-) | Não | Não |
| sem rota | [Review](#review-sem-rota) | Sim | Sim |

Todas as páginas são renderizadas dentro de `Layout`, que acrescenta a barra superior (`Topbar`) e o rodapé (`Footer`). A exceção são alguns estados de erro e de vazio, indicados em cada seção.

## Elementos comuns a todas as telas

- **Barra superior.** O logotipo (um emoji de pipoca, com o texto "Movies" a partir de 768 px) leva para `/`. Os itens de menu são, na ordem: "Críticas" (`/reviews`), "Blogroll" (`/blogroll`), "Vale a Pena Assistir" (`/favorites`) e "Blog" (`/blog`). Em inglês: "Reviews", "Blogroll", "Worth Watching" e "Blog". O item da rota atual fica destacado. Abaixo de 768 px o menu vira um botão hambúrguer que abre uma lista suspensa; a lista fecha ao navegar.
- **Alternância de idioma.** Um controle com as bandeiras do Brasil e dos Estados Unidos troca entre `pt` e `en`.
- **Rodapé.** Texto fixo em inglês, com links para o LinkedIn da autora e para o repositório no GitHub.

## Home (`/`)

Arquivos: `src/pages/Home/index.tsx`, `src/pages/Home/components/PostCardList.tsx`, `src/hooks/useBlogPosts.ts`.

### O que a pessoa vê e faz

- No topo, o bloco "Recomendações", com o subtítulo "Da minha watchlist do IMDb": uma faixa com rolagem horizontal de cards de filmes, cada um com pôster, título, ano e nota do IMDb. Clicar em um filme abre `/movie/{tconst}`.
- Abaixo, uma grade de cards de artigos. Cada card mostra o título do filme e a data sobre uma imagem de capa. O primeiro card ocupa a largura inteira e é mais alto. Clicar em um card abre `/article/{tconst}`.

Não há campo de busca nem paginação na tela. O hook `useBlogPosts` expõe `query`, `setQuery` e `handleSearch`, mas a Home não os usa.

### Componentes

`Layout`, `Recommendations`, `LoadingSpinner`, `NoPostsMessage`, `ErrorMessage`, `PostCardList` (que renderiza `Card`).

### Estado

- `blogPostsAndReviews.cardsData`, `status` e `error`, lidos pelo hook `useBlogPosts`.
- `recommendations.data`, `status` e `error`, lidos pelo componente `Recommendations`.

### Chamadas à API

| Quando | Método e caminho | Thunk |
| --- | --- | --- |
| Na primeira montagem, se `blogPostsAndReviews.status` for `'idle'` | `POST home/cards` com `{ filters: {}, page: 1, page_size: 10 }` | `fetchBlogPostCards` |
| Na primeira montagem, se `recommendations.status` for `'idle'` | `GET recommendations/random?language={pt\|en}` | `fetchRandomRecommendations` |

As duas buscas acontecem uma única vez por sessão de navegação: ao voltar para a Home, os dados já estão na store e nada é pedido de novo.

### Carregamento, vazio e erro

| Situação | Comportamento |
| --- | --- |
| Cards carregando | `LoadingSpinner` (ícone giratório) abaixo das recomendações. |
| Cards carregados, lista vazia | `NoPostsMessage`: "Nenhum post encontrado." ou "No posts found.". |
| Erro nos cards | A página inteira é substituída por `ErrorMessage` com a mensagem do thunk, sem `Layout` (sem barra superior e sem rodapé). |
| Recomendações carregando | O bloco mostra título, subtítulo e o texto "Carregando recomendações...". |
| Erro nas recomendações | O bloco mostra título, subtítulo e a mensagem de erro; a grade de cards continua funcionando. |
| Recomendações vazias | O bloco não é renderizado. |

Não há skeleton nesta tela.

## CompleteArticle (`/article/:movieId`)

Arquivos: `src/pages/CompleteArticle/index.tsx`, `Components.tsx`, `sectionTitles.ts`, `styles.ts`.

Esta é a página de leitura. Para um mesmo `tconst`, ela junta até quatro fontes: a crítica autoral, o post de blog, as imagens e o registro do filme nos favoritos. Um filme pode ter só a crítica, só o post ou os dois.

### O que a pessoa vê e faz

1. **Cabeçalho (hero).** O título do filme (`primaryTitle` do post ou, na falta dele, da crítica) sobre a primeira imagem do filme como fundo. Se o filme estiver nos favoritos, aparece uma linha em itálico com ano, país e diretor.
2. **Crítica autoral**, se existir: o texto `content[language].text`, quebrado em parágrafos a cada `\n`.
3. **Post de blog**, se existir, em seções:
   - Introdução, resumo do enredo e análise das atuações. Os títulos dessas três seções estão vazios em `sectionTitles`, então aparece só o texto.
   - "O que eu achei?" (`personal_impressions`).
   - "Recomendações" (`recommendations`).
   - "Trilha sonora": um player do Spotify incorporado, quando `spotify_album_url` existe e é um link reconhecido do Spotify.
   - "Referências": lista numerada de links que abrem em nova aba.
   
   Uma seção com conteúdo vazio não é renderizada. O campo `conclusion` existe no tipo `BlogPostContent`, mas a página não o exibe.
4. **Coluna de imagens**, se houver imagens: todas as imagens do filme, cada uma com a legenda no idioma atual.
5. **"Você também poderá gostar de:"**: até três cards de outros artigos, sorteados entre posts e críticas, que levam a `/article/{tconst}`.

### Componentes

`Layout`, `SkeletonBlogPost`, `ErrorMessage`, a página `NotFound` e os componentes locais de `Components.tsx`: `Section`, `SpotifyEmbed`, `ImageGallery` e `RecommendedArticles` (que usa `Card`).

### Estado

`blogPost`, `authoralReview`, `blogPostImages` (`imageUrls`, `subtitles`, `coverImages`), `favorites` (`currentFavorite`, `status`) e `blogPostsAndReviews.data`.

Ao desmontar a página, ou quando `movieId` muda, o efeito dispara `clearBlogPostState`, `clearImageState`, `clearAuthoralReviewState` e `clearFavoriteState`.

### Chamadas à API

Disparadas juntas quando a página monta ou quando `movieId` muda:

| Método e caminho | Thunk | Para quê |
| --- | --- | --- |
| `GET images/{tconst}` | `fetchAllImageUrls` | Imagem do cabeçalho e coluna de imagens. |
| `GET generate-blogpost/{tconst}` | `fetchBlogPost` | Post de blog. Um 404 é tratado como "não existe". |
| `GET write-review/{tconst}` | `fetchAuthoralReview` | Crítica autoral. Um 404 é tratado como "não existe". |
| `POST favorites/search` com `{ filters: { tconst: { $eq: tconst } }, search_term: '' }` | `getFavoriteById` | Ano, país e diretor do cabeçalho. |
| `POST home/cards` com `{ filters: {}, page: 1, page_size: 20 }` | `fetchBlogPostsAndReviews` | Artigos para o bloco de sugestões. |
| `POST write-review/search` com `{ filters: {}, page: 1, page_size: 10 }` | `fetchBlogPostsAndReviews` | Críticas para o bloco de sugestões. |

Depois, para cada artigo sugerido que não tem `imageUrl` e ainda não tem capa em `coverImages`:

| Método e caminho | Thunk | Observação |
| --- | --- | --- |
| `GET images/{tconst}` | `fetchCoverImage` | Antes de chamar a API, procura a resposta na Cache API do navegador (`movie-images-cache`). |

### Carregamento, vazio e erro

| Situação | Comportamento |
| --- | --- |
| `blogPost`, `authoralReview` ou `favorites` em `'loading'` | `SkeletonBlogPost` dentro do `Layout`: três blocos cinza estáticos (título, texto e imagem), sem animação. |
| Post e crítica falharam e nenhum tem dados | `ErrorMessage` com a mensagem do post ou da crítica, sem `Layout`. |
| Só um dos dois falhou | A página mostra o que carregou. |
| Nem post nem crítica existem para o `tconst` (os dois responderam 404) | A página renderiza `NotFound`: a tela 404, dentro do `Layout`, com link para a página inicial. |
| Sem imagens | O cabeçalho fica sem imagem de fundo e a coluna de imagens não aparece; o texto ocupa a largura toda. |
| Falha ao buscar imagens ou favorito | Não há mensagem; os trechos que dependem desses dados simplesmente não aparecem. |
| Sem artigos para sugerir | O bloco de sugestões não é renderizado. |

## MovieDetail (`/movie/:movieId`)

Arquivos: `src/pages/MovieDetail/index.tsx`, `styles.ts`. Serviços: `MovieDetailService`, `RecommendationsService`.

É a ficha de um filme da lista de recomendações. O único caminho de navegação até ela é o carrossel da Home.

### O que a pessoa vê e faz

1. **Bloco do filme.** Pôster, título e quatro metadados: ano, nota do IMDb (`{nota}/10`), duração (`{n} min`) e gêneros. O botão "Ver no IMDb" abre `movie.url` em nova aba.
2. **Diretor**, quando a API devolve dados: foto (ou o texto "Sem foto"), nome e biografia. Se `directorInfo.directors` tiver mais de um item, o título muda para "Diretores" e cada um é listado.
3. **Trilha sonora**, quando a API devolve dados: descrição geral e a lista de faixas. Cada faixa mostra capa do álbum (ou um emoji de nota musical), título, artista e descrição. Se a faixa tem `external_urls.spotify`, o botão "Abrir no Spotify" abre o link em nova aba. Não há reprodução de prévia: o campo `preview_url` existe no tipo `Track`, mas a tela não o usa.

A página atualiza `document.title` para `{título} ({ano}) - Movie Search Blog`. O título não é restaurado ao sair da página.

O pôster vem de `movie.image_url`, com o sufixo de tamanho do IMDb trocado por `._V1_UX400_CR0,0,400,600_AL_.jpg`. Sem `image_url`, o código monta uma URL de reserva em `m.media-amazon.com` a partir do `tconst`; se essa URL responde com imagem válida é algo não verificado.

### Componentes

Só `Layout`. Todo o resto são styled-components locais.

### Estado

Estado local com `useState`: `movie`, `directorInfo`, `soundtrackInfo`, `loading` (começa em `true`) e `error`. Nada é gravado no Redux, então os dados são buscados de novo a cada visita.

### Chamadas à API

O efeito roda quando `movieId` ou `language` mudam.

| Ordem | Método e caminho | Quando |
| --- | --- | --- |
| 1 | `GET movie-detail/{tconst}?language={pt\|en}` | Sempre. Se a resposta tiver `movie`, a página usa `movie`, `director` e `soundtrack` dessa resposta e para aqui. |
| 2 | `GET recommendations/all?language={pt\|en}&page_size=1&search_term={tconst}` | Se a chamada 1 falhar ou vier sem `movie`. |
| 3a | `GET directors/{nome do diretor}?language={pt\|en}&tconst={tconst}` | Em paralelo com 3b, se o filme tiver `director`. |
| 3b | `GET music/soundtrack?director={diretor}&language={pt\|en}&title={título}&year={ano}` | Em paralelo com 3a. |

A falha de 3a ou de 3b é absorvida (`.catch(() => null)`): a seção correspondente só não aparece. O diagrama de sequência desse fluxo está em [arquitetura.md](arquitetura.md#fluxo-real-abrir-a-ficha-de-um-filme).

### Carregamento, vazio e erro

| Situação | Comportamento |
| --- | --- |
| Carregando | Texto "Carregando..." dentro do `Layout`, com `role="status"` e `aria-live="polite"`. Não há skeleton. |
| Filme não encontrado (chamada 2 sem resultados) ou rota sem `movieId` | Texto "Filme não encontrado" com `role="alert"`. |
| Falha na chamada 2 | Texto "Erro ao carregar filme" com `role="alert"`. |
| Sem diretor ou sem trilha | A seção correspondente não é renderizada. |

Os estados de carregamento e de erro desta página ficam dentro do `Layout`, ao contrário das páginas que usam `ErrorMessage`.

## Reviews (`/reviews`)

Arquivos: `src/pages/Reviews/index.tsx`, `styles.ts`.

### O que a pessoa vê e faz

Uma grade de cards com todas as críticas autorais, no mesmo formato da Home: título e data sobre a imagem de capa, com o primeiro card em destaque. Clicar em um card abre `/article/{tconst}`.

A data mostrada é o `created_at` como veio da API; este thunk não formata a data.

### Componentes

`Layout`, `Card`, `NoPostsMessage`, `ErrorMessage`. O indicador de carregamento é um styled-component local (`S.ActivityIndicator`), não o componente compartilhado `ActivityIndicator`.

### Estado

`writeReviews.data`, `status` e `error`.

### Chamadas à API

| Quando | Método e caminho | Thunk |
| --- | --- | --- |
| Na montagem, se `writeReviews.status` for `'idle'` | `POST write-review/search` com `{ filters: {}, page: 1, page_size: 50 }` | `fetchAllAuthoralReviews` |

A busca acontece uma vez por sessão de navegação. Não há paginação: a tela mostra no máximo as 50 críticas da primeira página.

### Carregamento, vazio e erro

| Situação | Comportamento |
| --- | --- |
| Carregando | Indicador de atividade centralizado. |
| Lista vazia | `NoPostsMessage`. |
| Erro | `ErrorMessage` com a mensagem do thunk, sem `Layout`. |

## Favorites (`/favorites`)

Arquivos: `src/pages/Favorites/index.tsx`, `styles.ts`. No menu, o item se chama "Vale a Pena Assistir".

### O que a pessoa vê e faz

Título "Filmes de A a Z", um parágrafo de descrição e a lista de filmes favoritos ordenada por `primaryTitle` e agrupada pela primeira letra. Cada linha mostra o título em negrito e itálico, seguido de diretor e ano.

Os filmes que têm post ou crítica aparecem sublinhados, em verde (`#4A7200`) e com cursor de clique; clicar leva a `/article/{tconst}`. Os demais são texto simples.

### Componentes

`Layout` e `ErrorMessage`. O indicador de carregamento é um styled-component local.

### Estado

- `favorites.data`, `error`, `initialFetchDone` e `status`.
- `blogPostsAndReviews.data`, usado para montar o conjunto de `tconst` que têm conteúdo.

### Chamadas à API

Disparadas na montagem, enquanto `favorites.initialFetchDone` for `false`:

| Método e caminho | Thunk |
| --- | --- |
| `POST favorites/search` com `{ filters: {}, page: 1, page_size: 1000, search_term: '' }` | `searchFavorites` |
| `POST home/cards` com `{ filters: {}, page: 1, page_size: 100 }` | `fetchBlogPostsAndReviews` |
| `POST write-review/search` com `{ filters: {}, page: 1, page_size: 10 }` | `fetchBlogPostsAndReviews` |

A página pede `page: 1` e `pageSize: 1000` (constante `ALL_FAVORITES_PAGE_SIZE`) para trazer a lista inteira de uma vez, porque a API pagina com 10 itens por padrão. Não há paginação na tela; uma lista com mais de 1000 favoritos seria cortada.

### Carregamento, vazio e erro

| Situação | Comportamento |
| --- | --- |
| Carregando | Título e descrição visíveis, com o indicador de atividade abaixo. |
| Lista vazia | Só título e descrição; não há mensagem de vazio. |
| Erro em `favorites` | `ErrorMessage` com a mensagem do thunk, sem `Layout`. |
| Falha ao buscar posts e críticas | Sem mensagem; nenhum filme fica clicável. |

## Blogroll (`/blogroll`)

Arquivo: `src/pages/Blogroll/index.tsx`.

Página estática. Mostra o título "Blogroll", uma frase de descrição e uma lista de três links externos definidos no próprio arquivo (A Sharper Focus, IMDb e Filmsite), que abrem em nova aba. Usa `Layout` e `useLanguage`. Não chama a API, não usa Redux e não tem estados de carregamento, vazio ou erro.

## Blog (`/blog`)

Arquivo: `src/pages/Blog/index.tsx`.

Página estática. Mostra o título "Blog do Cinema", uma descrição e seis textos curtos, cada um com título, parágrafo e data, todos escritos no objeto `translations` do próprio arquivo, em português e em inglês. Os textos não são clicáveis e não vêm da API. Usa `Layout` e `useLanguage`. Não há estados de carregamento, vazio ou erro.

Os estilos inline dos blocos usam as variáveis CSS `--background-secondary`, `--text`, `--text-secondary` e `--text-tertiary`, que não são definidas em nenhum lugar do projeto.

## NotFound (`*`)

Arquivos: `src/pages/NotFound/index.tsx`, `styles.ts`.

É a tela 404. Aparece em dois casos: quando o endereço não corresponde a nenhuma rota e quando `CompleteArticle` descobre que o `tconst` não tem post nem crítica.

Mostra o código "404", o título "Página não encontrada", a frase "O endereço que você abriu não existe ou foi removido." e o link "Voltar para a página inicial", um `<Link>` para `/`. Em inglês: "Page not found", "The address you opened does not exist or was removed." e "Back to the home page".

Usa `Layout` e `useLanguage`, então mantém a barra superior e o rodapé. Não chama a API, não usa Redux e não tem estados de carregamento, vazio ou erro.

## Review (sem rota)

Arquivo: `src/pages/Review/index.tsx`.

A página existe no diretório de trabalho, mas não é importada em `App.tsx` nem em outro arquivo, então não é acessível. Fica registrada aqui porque foi alterada junto com as demais.

Pelo código, ela mostraria só a crítica autoral de um filme: título, linha com ano, país e diretor (quando o filme está nos favoritos), o texto no idioma atual e uma coluna de imagens sem legenda.

| Item | Detalhe |
| --- | --- |
| Estado | `authoralReview`, `blogPostImages.imageUrls`, `favorites.currentFavorite` e `favorites.status`. |
| Chamadas | `GET images/{tconst}`, `GET write-review/{tconst}` e `POST favorites/search` filtrando por `tconst`. |
| Carregamento | `SkeletonBlogPost` dentro do `Layout`. |
| Erro | `ErrorMessage` sem `Layout`. |
| Sem crítica | Retorna `null` (tela em branco); esta página não usa `NotFound`. |
