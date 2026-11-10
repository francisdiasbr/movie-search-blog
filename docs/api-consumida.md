# API consumida

Este documento lista todas as rotas do backend (`movie-search-blog-backend`) que o frontend chama, quem as chama e o que o frontend espera receber.

## Como ler

- Os caminhos são relativos à URL base definida em `VITE_MOVIE_SEARCH_BLOG_API_URL`. O frontend não acrescenta prefixo. No backend as rotas são registradas sob `/api` (`app.py`), então a variável precisa terminar em `/api`.
- Só existem chamadas `GET` e `POST`. Nenhuma leva autenticação.
- Corpos de `POST` vão em JSON, com `Content-Type: application/json`.
- "Resposta esperada" descreve os tipos TypeScript que o frontend declara. O frontend não valida a resposta em tempo de execução: os tipos são só uma suposição do código. A conferência campo a campo com o que o backend realmente devolve é algo não verificado; o que foi conferido no backend é a existência de cada rota e de cada método.

## Tabela de rotas

| # | Método | Caminho | Service e método | Chamado por |
| --- | --- | --- | --- | --- |
| 1 | `POST` | `home/cards` | `HomeService.cards` | Thunks `fetchBlogPostCards` (Home) e `fetchBlogPostsAndReviews` (`CompleteArticle`, `Favorites`) |
| 2 | `GET` | `generate-blogpost/{tconst}` | `BlogPostService.getByTconst` | Thunk `fetchBlogPost` (`CompleteArticle`) |
| 3 | `GET` | `write-review/{tconst}` | `AuthoralReviewService.getByTconst` | Thunk `fetchAuthoralReview` (`CompleteArticle`, `Review`) |
| 4 | `POST` | `write-review/search` | `WriteReviewsService.search` | Thunks `fetchAllAuthoralReviews` (`Reviews`) e `fetchBlogPostsAndReviews` (`CompleteArticle`, `Favorites`) |
| 5 | `GET` | `images/{tconst}` | `ImagesService.list` | Thunks `fetchAllImageUrls` (`CompleteArticle`, `Review`) e `fetchCoverImage` (`RecommendedArticles`) |
| 6 | `POST` | `favorites/search` | `FavoritesService.search` e `FavoritesService.getByTconst` | Thunks `searchFavorites` (`Favorites`) e `getFavoriteById` (`CompleteArticle`, `Review`) |
| 7 | `GET` | `recommendations/random` | `RecommendationsService.random` | Thunk `fetchRandomRecommendations` (componente `Recommendations`, na Home) |
| 8 | `GET` | `recommendations/all` | `RecommendationsService.findByTconst` | `MovieDetail`, direto |
| 9 | `GET` | `movie-detail/{tconst}` | `MovieDetailService.getCached` | `MovieDetail`, direto |
| 10 | `GET` | `directors/{nome}` | `MovieDetailService.getDirector` | `MovieDetail`, direto |
| 11 | `GET` | `music/soundtrack` | `MovieDetailService.getSoundtrack` | `MovieDetail`, direto |

A página `Review` aparece na tabela porque o código existe, mas ela não tem rota em `App.tsx`.

## Detalhe por rota

### 1. `POST home/cards`

Lista enxuta de artigos para os cards.

Corpo enviado:

```json
{ "filters": {}, "page": 1, "page_size": 10 }
```

| Quem chama | `page_size` |
| --- | --- |
| Home (`useBlogPosts`) | 10 |
| `CompleteArticle` | 20 |
| `Favorites` | 100 |

O hook `useBlogPosts` sabe montar um filtro `{ "$or": [{ "primaryTitle": { "$regex": "...", "$options": "i" } }] }` quando há texto de busca, mas nenhuma tela preenche esse texto, então `filters` vai sempre vazio.

Resposta esperada (`BlogPostCardsResponse`):

| Campo | Tipo | Uso |
| --- | --- | --- |
| `entries` | `BlogPostCard[]` | Lista de cards. |
| `entries[].tconst` | `string` | Chave do card e destino da navegação. |
| `entries[].primaryTitle` | `string` | Título no card. |
| `entries[].created_at` | `string` (ISO) | Convertido para `dd/MM/yyyy` no thunk. |
| `entries[].imageUrl` | `string`, opcional | Imagem de fundo do card. |
| `entries[]._id` | `string`, opcional | Não usado. |
| `total_documents` | `number` | Guardado, mas não exibido. |

### 2. `GET generate-blogpost/{tconst}`

Post de blog de um filme.

Resposta esperada: `{ data: BlogPostEntry }`. O thunk usa só `data`.

| Campo de `data` | Tipo | Uso na tela |
| --- | --- | --- |
| `primaryTitle` | `string` | Título do cabeçalho. |
| `content.pt` e `content.en` | objeto com `title`, `introduction`, `plot_summary`, `acting_analysis`, `personal_impressions`, `recommendations`, `conclusion` | Seções do artigo. `title` e `conclusion` não são exibidos. |
| `spotify_album_url` | `string` | Player do Spotify. |
| `references` | `string[]` | Lista de links. |
| `created_at` | `string` | Passa por `formatDate`; não é exibido. |
| `_id`, `tconst`, `isAiGenerated`, `original_movie_soundtrack`, `poster_url`, `soundtrack_video_url`, `images`, `imageUrl`, `type`, `soundtrack` | vários | Declarados no tipo, sem uso na tela. |

Um status 404 é convertido em `null` por `nullIfNotFound` e não conta como erro.

### 3. `GET write-review/{tconst}`

Crítica autoral de um filme.

Resposta esperada: `{ data: AuthoralReview }`.

| Campo de `data` | Tipo | Uso na tela |
| --- | --- | --- |
| `primaryTitle` | `string` | Título, quando não há post de blog. |
| `content.pt.text` e `content.en.text` | `string` | Texto da crítica, dividido em parágrafos por `\n`. |
| `created_at` | `string` | Passa por `formatDate`; não é exibido. |
| `_id`, `tconst`, `isAiGenerated`, `references`, `images` | vários | Sem uso na tela. |

Um status 404 é convertido em `null`.

### 4. `POST write-review/search`

Lista de críticas.

Corpo enviado:

```json
{ "filters": {}, "page": 1, "page_size": 50 }
```

| Quem chama | `page_size` |
| --- | --- |
| `Reviews` (`fetchAllAuthoralReviews`) | 50 |
| `fetchBlogPostsAndReviews` (`CompleteArticle`, `Favorites`) | 10, fixo |

Resposta esperada (`ReviewsSearchResponse`):

| Campo | Tipo | Uso |
| --- | --- | --- |
| `entries` | `MovieReviewResponse[]` | Lista de críticas. |
| `entries[].tconst` | `string` | Chave e destino da navegação. |
| `entries[].primaryTitle` | `string` | Título no card. |
| `entries[].created_at` | `string` | Exibido como veio em `Reviews`; convertido de ISO para `dd/MM/yyyy` em `fetchBlogPostsAndReviews`. |
| `entries[].imageUrl` | `string`, opcional | Capa do card. Sem ela, `RecommendedArticles` busca a capa pela rota 5. |
| `entries[].content`, `_id`, `isAiGenerated`, `references`, `images` | vários | Sem uso nas listas. |
| `total_documents` | `number` | Não exibido. |

### 5. `GET images/{tconst}`

Imagens de um filme.

Resposta esperada (`ImagesListResponse`):

| Campo | Tipo | Uso |
| --- | --- | --- |
| `images` | `ImageItem[]` | Lista de imagens. |
| `images[].url` | `string` | Endereço da imagem. A primeira vira o fundo do cabeçalho e a capa em `coverImages`. |
| `images[].subtitle_pt`, `images[].subtitle_en` | `string`, opcionais | Legendas. Na falta, o thunk usa `'Cena do filme'` e `'Movie scene'`. |
| `images[].filename` | `string` | Sem uso. |

Diferente das outras rotas de leitura, esta resposta não vem embrulhada em `data`.

`fetchCoverImage` guarda a resposta na Cache API do navegador (cache `movie-images-cache`, chave `/images/{tconst}`) e a reutiliza nas próximas vezes, sem expiração.

### 6. `POST favorites/search`

Lista de favoritos e busca de um favorito por `tconst`. O backend não tem `GET` por identificador em favoritos, então `FavoritesService.getByTconst` usa a mesma rota com filtro.

Corpos enviados:

```json
{ "filters": {}, "page": 1, "page_size": 1000, "search_term": "" }
```

```json
{ "filters": { "tconst": { "$eq": "tt0050083" } }, "search_term": "" }
```

O primeiro corpo é o da página `Favorites`, que pede `page: 1` e `pageSize: 1000` (constante `ALL_FAVORITES_PAGE_SIZE`) porque a API pagina com 10 itens por padrão. O segundo é o de `getByTconst`, que não informa paginação: `page` e `page_size` ficam `undefined` e somem do JSON, e a busca por um único `tconst` não precisa deles.

Resposta esperada (`FavoritesSearchResponse`):

| Campo | Tipo | Uso |
| --- | --- | --- |
| `entries` | `FavoritesEntry[]` | Lista de filmes. `getByTconst` usa `entries[0]` ou `null`. |
| `entries[].tconst` | `string` | Chave e destino da navegação. |
| `entries[].primaryTitle` | `string` | Título, ordenação e agrupamento por letra. |
| `entries[].director` | `string` | Linha da lista e cabeçalho do artigo. |
| `entries[].startYear` | `string` | Linha da lista e cabeçalho do artigo. |
| `entries[].country` | `string` | Cabeçalho do artigo. |
| `entries[]._id`, `originalTitle`, `wiki`, `soundtrack`, `plot`, `stars`, `plot_keywords`, `genres`, `writers`, `trivia`, `quote`, `rating` | vários | Declarados no tipo, sem uso na tela. |
| `total_documents`, `countries`, `years` | `number`, `string[]`, `number[]` | Sem uso na tela. |

### 7. `GET recommendations/random`

Filmes do carrossel da Home.

Query string: `language=pt` ou `language=en`.

Resposta esperada (`RandomRecommendationsResponse`):

| Campo | Tipo | Uso |
| --- | --- | --- |
| `data` | `Recommendation[]` | Filmes do carrossel. |
| `data[].tconst` | `string` | Chave, destino da navegação e URL de reserva do pôster. |
| `data[].title` | `string` | Título. |
| `data[].year` | `string` | Ano. |
| `data[].imdb_rating` | `string` | Nota. |
| `data[].image_url` | `string`, opcional | Pôster. |
| `total` | `number` | Guardado, não exibido. |

Observação sobre o backend: no código atual de `recommendations/routes.py`, esta rota não lê o parâmetro `language` e devolve a lista inteira ordenada pela posição na watchlist; o nome `random` é histórico.

### 8. `GET recommendations/all`

Usada por `MovieDetail` para encontrar um filme pelo `tconst` quando a rota 9 não resolve.

Query string: `language`, `page_size=1` e `search_term={tconst}`.

Resposta esperada: `EntriesResponse<Recommendation>`, isto é, `{ entries: Recommendation[], total_documents? }`. A página usa `entries[0]`.

| Campo de `Recommendation` | Tipo | Uso em `MovieDetail` |
| --- | --- | --- |
| `title` | `string` | Título e `document.title`. |
| `year` | `string` | Ano e parâmetro da rota 11. |
| `imdb_rating` | `string` | Nota. |
| `runtime` | `string` | Duração. |
| `genres` | `string` | Gêneros. |
| `director` | `string` | Parâmetro das rotas 10 e 11. |
| `url` | `string` | Botão "Ver no IMDb". |
| `image_url` | `string`, opcional | Pôster. |
| `tconst` | `string` | Parâmetro da rota 10 e URL de reserva do pôster. |
| `_id`, `position`, `original_title`, `title_type` | vários | Sem uso na tela. |

### 9. `GET movie-detail/{tconst}`

Ficha já montada pelo backend, com filme, diretor e trilha sonora.

Query string: `language`.

Resposta esperada (`MovieDetailCache`):

| Campo | Tipo | Uso |
| --- | --- | --- |
| `movie` | `Recommendation`, opcional | Se presente, a página usa esta resposta e não faz as chamadas 8, 10 e 11. |
| `director` | `DirectorInfo` ou `null`, opcional | Seção do diretor. |
| `soundtrack` | `SoundtrackInfo` ou `null`, opcional | Seção da trilha sonora. |

Qualquer erro nesta chamada é ignorado e a página segue para a rota 8.

### 10. `GET directors/{nome}`

Dados do diretor. O nome vai no caminho, codificado com `encodeURIComponent`.

Query string: `language` e `tconst`.

Resposta esperada (`DirectorInfo`):

| Campo | Tipo | Uso |
| --- | --- | --- |
| `name` | `string` | Nome. |
| `bio` | `string` | Biografia. |
| `photo` | `string` ou `null` | Foto; sem ela aparece "Sem foto". |
| `directors` | `DirectorInfo[]`, opcional | Com mais de um item, a página lista todos e usa o título "Diretores". |
| `_id` | `string`, opcional | Sem uso. |

Uma falha nesta chamada só esconde a seção do diretor.

### 11. `GET music/soundtrack`

Trilha sonora do filme.

Query string: `title`, `year`, `director` e `language`. Parâmetros vazios são omitidos.

Resposta esperada (`SoundtrackInfo`):

| Campo | Tipo | Uso |
| --- | --- | --- |
| `description` | `string` | Texto de abertura da seção. |
| `tracks` | `Track[]` | Lista de faixas. |
| `tracks[].title`, `tracks[].artist` | `string` | Título e artista. |
| `tracks[].description` | `string` | Descrição da faixa. |
| `tracks[].album.images[0].url` | `string` | Capa do álbum. |
| `tracks[].external_urls.spotify` | `string`, opcional | Botão "Abrir no Spotify". |
| `tracks[].preview_url` | `string` ou `null` | Sem uso na tela. |
| `tracks[].spotify_id`, `tracks[].duration_ms`, `tracks[].album.name` | vários | Sem uso na tela. |
| `movie_title`, `movie_year`, `movie_director`, `source`, `_id` | vários | Sem uso na tela. |

Uma falha nesta chamada só esconde a seção da trilha sonora.

## Formato dos erros

`ApiError.fromResponse` procura a mensagem do backend em `data` (quando é string) e depois em `message`. Na falta das duas, usa `HTTP error {status}`. Essa mensagem fica só no objeto de erro: o que vai para o Redux e para a tela é o texto de reserva do thunk. Ver [arquitetura.md](arquitetura.md#tratamento-de-resposta-e-de-erro).

| Status | Tratamento no frontend |
| --- | --- |
| 404 nas rotas 2 e 3 | Vira `null`; a página trata como "este filme não tem post" ou "não tem crítica". Se as duas respondem 404, `CompleteArticle` mostra a página `NotFound`. |
| Qualquer status fora de 2xx nas demais rotas com thunk | Thunk rejeitado, `status: 'failed'` e mensagem de reserva em `error`. |
| Falha de rede, CORS ou variável de ambiente ausente | `ApiError` com status `0`; mesmo tratamento do item anterior. |
| Erro nas rotas 9, 10 e 11 | Absorvido dentro de `MovieDetail`. |
| Erro na rota 8 | `MovieDetail` mostra "Erro ao carregar filme". |

## Rotas do backend que o frontend não usa

O backend registra outros recursos em `app.py` que este frontend não chama: `personal-opinion`, `prepopulate`, `generate-blogpost/search`, `images/{tconst}/{filename}`, `directors/all`, `music/all`, as rotas de administração de `movie-detail` (`stats`, `cleanup`, `invalidate`) e as de escrita em `recommendations` (`add`, `bulk-add`, `clear` e a remoção por `tconst`).
