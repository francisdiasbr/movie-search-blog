# Componentes compartilhados

Este documento lista os componentes de `src/components/`, suas props e onde são usados. Os componentes que pertencem a uma única página (`PostCardList` da Home e `Section`, `SpotifyEmbed`, `ImageGallery` e `RecommendedArticles` de `CompleteArticle`) aparecem no fim, porque são peças importantes das telas mesmo sem estar na pasta compartilhada.

## Resumo

| Componente | Arquivo | Export | Em uso |
| --- | --- | --- | --- |
| `Layout` | `Layout/index.tsx` | nomeado | Todas as páginas, incluindo `NotFound` |
| `Topbar` | `Topbar/index.tsx` | nomeado | `Layout` |
| `LanguageToggle` | `LanguageToggle/index.tsx` | nomeado | `Topbar` |
| `Footer` | `Footer/Footer.tsx` | default | `Layout` |
| `FooterContent` | `Footer/FooterContent.tsx` | default | `Footer` |
| `Card` | `Card/index.tsx` | default | `PostCardList`, `Reviews`, `RecommendedArticles` |
| `Recommendations` | `Recommendations/index.tsx` | default | `Home` |
| `Image` | `Image/index.tsx` | default | `Recommendations` |
| `ErrorMessage` | `ErrorMessage/index.tsx` | nomeado | `Home`, `CompleteArticle`, `Reviews`, `Favorites`, `Review` |
| `NoPostsMessage` | `NoPostsMessage/index.tsx` | nomeado | `Home`, `Reviews` |
| `LoadingSpinner` | `LoadingSpinner/index.tsx` | nomeado | `Home` |
| `SkeletonBlogPost` | `SkeletonBlogPost/index.tsx` | default | `CompleteArticle`, `Review` |
| `ActivityIndicator` | `ActivityIndicator/index.tsx` | nomeado | Nenhum arquivo importa |
| `Button` | `Button/index.tsx` | default | Nenhum arquivo importa |
| `Input` | `Input/index.tsx` | default | Nenhum arquivo importa |
| `SkeletonCard` | `Card/Skeleton.tsx` | default | Nenhum arquivo importa |

## Estrutura da página

### `Layout`

Moldura de todas as páginas: `Topbar` no topo, o conteúdo dentro de um `<main>` centralizado e `Footer` no fim. O contêiner ocupa pelo menos a altura da janela. A faixa em volta do conteúdo usa `theme.colors.primary` como cor de fundo.

| Prop | Tipo | Descrição |
| --- | --- | --- |
| `children` | `React.ReactNode` | Conteúdo da página. |

A largura do conteúdo é 85% da tela e aumenta em telas menores (90% até 1200 px, 95% até 576 px, 100% até 400 px).

### `Topbar`

Barra superior fixa no topo (`position: sticky`). Não recebe props. Usa `useLanguage`, `useNavigate` e `useLocation`, e guarda em estado local se o menu móvel está aberto.

- **Logotipo.** Um `div` com `role="button"` e `tabIndex={0}`, que navega para `/` com clique ou com Enter. O texto vem do CSS (`::after`): só o emoji de pipoca em telas pequenas e "Movies" junto com o emoji a partir de 768 px.
- **Menu de desktop** (a partir de 768 px): quatro `NavItem` (`span`) para `/reviews`, `/blogroll`, `/favorites` e `/blog`. O item da rota atual recebe `$isSelected`.
- **Controles.** `LanguageToggle` e o botão hambúrguer, visível só abaixo de 768 px.
- **Menu móvel.** Lista suspensa com os mesmos quatro itens, controlada por `$isOpen`. Fecha depois de navegar.

Os itens de menu são `span` e `div` com `onClick`, sem `role`, `tabIndex` ou tratamento de teclado. Só o logotipo e o `LanguageToggle` respondem a Enter.

Os rótulos ficam no objeto `translations` do arquivo. A chave `blog` rotula o item "Blogroll" e a chave `blogPage` rotula o item "Blog". A chave `about` não é usada.

### `LanguageToggle`

Alterna o idioma chamando `toggleLanguage` do `LanguageContext`. Não recebe props. Mostra as bandeiras do Brasil e dos Estados Unidos, com a do idioma ativo marcada por `$isActive`. É um `div` com `role="button"`, `tabIndex={0}`, resposta a Enter e `title` no idioma atual ("Mudar para inglês" ou "Change to Portuguese").

### `Footer` e `FooterContent`

Rodapé com fundo escuro em degradê. Não recebem props. O texto é fixo e em inglês ("Developed with ♥ by Francis Dias - GitHub"), com dois links externos que abrem em nova aba: o perfil da autora no LinkedIn e o repositório `francisdiasbr/movie-search-blog` no GitHub.

## Conteúdo

### `Card`

Card de artigo usado nas grades e no bloco de sugestões. Mostra o título e a data no canto inferior, sobre a imagem de capa como fundo. Sem imagem, usa a cor `theme.colors.card`.

| Prop | Tipo | Obrigatória | Descrição |
| --- | --- | --- | --- |
| `post` | `{ tconst: string; primaryTitle: string; created_at: string; imageUrl?: string }` | Sim | Dados do card. `created_at` é exibido como texto, sem formatação. |
| `onClick` | `(movieId: string) => void` | Sim | Chamado com `post.tconst` ao clicar. |
| `isFirst` | `boolean` | Não | Deixa o card maior (altura mínima de 400 px e proporção 2:1, contra 300 px e 1.6:1). |

Quem usa o `Card` passa `imageUrl` já tratado com `encodeURI`. O contêiner é um `div` com `onClick`, sem suporte a teclado.

### `Recommendations`

Carrossel horizontal de filmes recomendados, exibido no topo da Home. Não recebe props; é um componente conectado, que lê e busca os próprios dados.

- **Estado.** `state.recommendations` (`data`, `status`, `error`).
- **Chamada.** Quando `status` é `'idle'`, dispara `fetchRandomRecommendations({ language })`, que faz `GET recommendations/random?language=...`.
- **Interação.** Clicar em um filme navega para `/movie/{tconst}`.
- **Imagem.** Usa `movie.image_url` trocando o sufixo de tamanho do IMDb por `._V1_UX400_CR0,0,400,600_AL_.jpg`. Sem `image_url`, monta uma URL de reserva a partir do `tconst`.
- **Estados.** Em `'loading'` mostra "Carregando recomendações..."; em `'failed'` mostra `error` (ou o texto de reserva do componente); com lista vazia retorna `null`.

Cada card mostra pôster, título (com `title` para o texto completo), ano e nota do IMDb.

### `Image`

Imagem com tratamento de carregamento e de falha.

| Prop | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `src` | `string` | sem padrão | Endereço da imagem. Sem `src`, mostra o texto de reserva. |
| `alt` | `string` | `''` | Texto alternativo. |
| `fallbackText` | `string` | `'Sem imagem'` | Texto mostrado quando não há `src` ou quando a imagem falha. |
| `className` | `string` | sem padrão | Repassado ao contêiner. |

Enquanto a imagem não termina de carregar, aparece o texto "Carregando..." (fixo em português).

## Mensagens e carregamento

### `ErrorMessage`

Caixa vermelha com a mensagem de erro, centralizada em um contêiner com altura mínima de 100% da janela.

| Prop | Tipo | Descrição |
| --- | --- | --- |
| `message` | `string` | Texto do erro. |

As páginas retornam `ErrorMessage` no lugar de todo o conteúdo, fora do `Layout`. Por isso a tela de erro não tem barra superior nem rodapé.

### `NoPostsMessage`

Parágrafo centralizado com "Nenhum post encontrado." ou "No posts found.", conforme o idioma. Não recebe props.

### `LoadingSpinner`

Ícone `Loader2` da `lucide-react`, com a classe `spinner` (a rotação é definida em `LoadingSpinner/styles.ts`). Não recebe props.

### `SkeletonBlogPost`

Esqueleto da página de artigo: três blocos cinza (título, conteúdo e imagem). Não recebe props e não tem animação.

## Componentes sem uso

Estes arquivos existem, mas nenhum outro arquivo de `src/` os importa.

| Componente | O que é |
| --- | --- |
| `ActivityIndicator` | Indicador de atividade. `Reviews` e `Favorites` usam versões próprias, definidas nos seus `styles.ts`. |
| `Button` | `styled.button` com a prop `hasMarginLeft` (sem o prefixo `$`). |
| `Input` | Campo de texto com as props obrigatórias `type`, `value`, `onChange`, `onKeyPress` e `placeholder`. |
| `SkeletonCard` (`Card/Skeleton.tsx`) | Esqueleto de card, com cores fixas. |

## Componentes locais de página

### `PostCardList` (`pages/Home/components/PostCardList.tsx`)

Transforma a lista de cards da Home em elementos `Card`.

| Prop | Tipo | Descrição |
| --- | --- | --- |
| `posts` | `BlogPostCard[]` | Cards a exibir. |
| `onCardClick` | `(post: BlogPostCard) => void` | Chamado com o card clicado. |

O primeiro card recebe `isFirst`. Quando há mais de um card, o componente insere um `<div className="card-break" />` depois do primeiro; o CSS da grade o esconde (`display: none`). A página `Reviews` repete essa mesma lógica no próprio arquivo.

### Componentes de `pages/CompleteArticle/Components.tsx`

| Componente | Props | Comportamento |
| --- | --- | --- |
| `Section` | `title?: string`, `content: string` | Renderiza um `<h2>` e um `<p>`. Retorna `null` se `content` estiver vazio. O `<h2>` é renderizado mesmo com título vazio. |
| `SpotifyEmbed` | `url: string` | Extrai tipo e identificador de um link `spotify.com/(album\|artist\|playlist\|episode\|show\|track)/{id}` e renderiza um `iframe` de `open.spotify.com/embed`. Retorna `null` se o link não casar com o padrão. O `iframe` não tem `title`. |
| `ImageGallery` | `images: string[]`, `subtitles?: { en: string; pt: string }[]` | Lista as imagens, cada uma com a legenda no idioma atual. O `alt` é `Imagem {n}`, fixo em português. |
| `RecommendedArticles` | `currentMovieId?: string` | Junta posts e críticas de `blogPostsAndReviews.data`, remove o artigo atual, embaralha e mostra até três `Card`. Para artigos sem `imageUrl`, dispara `fetchCoverImage` e usa `blogPostImages.coverImages`. |

`Review/index.tsx` tem uma `ImageGallery` própria, mais simples, sem legendas.
