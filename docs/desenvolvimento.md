# Desenvolvimento

Este documento explica como instalar, rodar e gerar o build do frontend, quais variáveis de ambiente ele usa, o que o lint cobre e o que está configurado para o Netlify.

## Requisitos

| Item | Versão | De onde vem |
| --- | --- | --- |
| Node.js | 20 ou superior | Campo `engines` do `package.json` (`>=20.0.0`) e `NODE_VERSION = "20"` no `netlify.toml`. |
| npm | A que acompanha o Node | O repositório tem `package-lock.json`. |
| Backend | `movie-search-blog-backend` rodando e acessível | O frontend não tem dados locais nem mocks: quase todas as telas dependem da API. |

Não há arquivo `.nvmrc`.

## Instalação

```bash
npm install
```

## Variáveis de ambiente

O Vite só expõe ao código as variáveis com prefixo `VITE_`. Elas são lidas de um arquivo `.env` na raiz do projeto, que está no `.gitignore`. O repositório não tem `.env.example`.

| Variável | Obrigatória | Onde é lida | Descrição |
| --- | --- | --- | --- |
| `VITE_MOVIE_SEARCH_BLOG_API_URL` | Sim | `src/lib/api/BaseApi.ts` | URL base da API. Barras finais são removidas. Como o frontend não acrescenta prefixo e o backend registra as rotas sob `/api`, o valor precisa incluir `/api`. |

Exemplo de `.env`, com um endereço local ilustrativo (a porta depende de como o backend é iniciado):

```bash
VITE_MOVIE_SEARCH_BLOG_API_URL=http://localhost:5000/api
```

Se a variável estiver ausente, a aplicação abre normalmente, mas toda requisição falha: `BaseApi` lança o erro `VITE_MOVIE_SEARCH_BLOG_API_URL não está definido nas variáveis de ambiente.`, que chega às telas como a mensagem de erro de cada thunk.

O valor é embutido no bundle no momento do build. Trocar a variável exige um novo build ou reiniciar o servidor de desenvolvimento.

O `.env` local também contém `VITE_IFRAMELY_API_KEY`. Nenhum arquivo de `src/` lê essa variável.

O backend precisa aceitar requisições da origem do frontend (CORS). A configuração de CORS do backend não foi verificada neste documento.

## Scripts

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Sobe o servidor de desenvolvimento do Vite, com recarga automática. A porta é a padrão do Vite, porque `vite.config.ts` não define outra. |
| `npm run build` | Gera o build em `dist/` com `vite build`. Não roda o compilador TypeScript antes; ver "Verificação de tipos". |
| `npm run preview` | Serve localmente o conteúdo de `dist/`. |
| `npm run lint` | Roda `eslint .`. |

## Configuração do Vite

`vite.config.ts` tem três pontos:

- o plugin `@vitejs/plugin-react`;
- `optimizeDeps.exclude: ['lucide-react']`;
- o alias `@` apontando para `./src`.

O alias também está em `tsconfig.json` e `tsconfig.app.json` (`paths`). Apesar disso, a regra `no-restricted-imports` do ESLint proíbe importar com `@/`: o código usa só caminhos relativos.

## Lint

A configuração está em `eslint.config.js` (formato flat config) e se aplica a `**/*.{ts,tsx}`, ignorando `dist`.

| Grupo | Regras ativas |
| --- | --- |
| React Hooks | Regras recomendadas de `eslint-plugin-react-hooks`, com `exhaustive-deps` desligada. |
| React Refresh | `only-export-components` como aviso. |
| Imports | `import-helpers/order-imports` como aviso: módulos externos primeiro, depois os locais, com linha em branco entre os grupos e ordem alfabética. `no-restricted-imports` como erro para `@/*`. |
| Acessibilidade | `jsx-a11y/aria-props`, `click-events-have-key-events`, `heading-has-content`, `interactive-supports-focus` e `no-noninteractive-element-interactions`, todas como erro. |
| Estilo | Aspas simples, espaço dentro de chaves e no máximo duas props por linha no JSX (`react/jsx-max-props-per-line`). |
| Desligadas | `no-unused-vars`, `@typescript-eslint/no-unused-vars`, `@typescript-eslint/no-explicit-any`, `react/prop-types`, `react/react-in-jsx-scope`. |

O Prettier está instalado e o plugin é carregado, mas a regra `prettier/prettier` está comentada e não há arquivo de configuração do Prettier. Na prática o Prettier não é aplicado pelo lint.

Resultado de `npx eslint .` no diretório de trabalho atual: nenhum erro e dois avisos, um de ordem de imports em `src/components/Image/index.tsx` e um de `react-refresh` em `src/contexts/LanguageContext.tsx`.

## Verificação de tipos

Não existe script de verificação de tipos no `package.json`, e `npm run build` não chama o `tsc`. Para conferir os tipos manualmente:

```bash
npx tsc --noEmit -p tsconfig.app.json
```

Os arquivos de configuração do TypeScript são:

| Arquivo | Papel |
| --- | --- |
| `tsconfig.json` | Configuração principal: `strict`, `noUnusedLocals`, `noUnusedParameters`, `jsx: react-jsx`, alias `@/*`. Inclui `src/**/*` e `vite.config.ts` e referencia `tsconfig.node.json`. |
| `tsconfig.app.json` | Mesmas opções de compilação, incluindo todos os `.ts` e `.tsx`. |
| `tsconfig.node.json` | Projeto composto só para `vite.config.ts`. |
| `tsconfig.config.json` | Configuração CommonJS para `vite.config.ts`, usada pelo `parserOptions.project` do ESLint. |

No diretório de trabalho atual, o comando acima passa sem erros, e `npm run build` também conclui. Já `npx tsc --noEmit -p tsconfig.json` falha com `TS6305`, por causa da referência ao projeto composto `tsconfig.node.json`; use o `tsconfig.app.json`.

## Testes

O projeto não tem testes: não há script `test`, biblioteca de testes nas dependências nem arquivos de teste em `src/`. Também não há configuração de integração contínua no repositório.

## Build

`npm run build` gera `dist/` com `index.html`, a pasta `assets/` e `popcorn-icon.svg` (copiado de `public/`). A pasta `dist/` está no `.gitignore`.

O `index.html` de origem define `lang="en"`, o título `Movies`, o favicon `/popcorn-icon.svg` e carrega do Google Fonts as famílias Roboto, Montserrat e Old Standard TT.

## Configuração do Netlify

O arquivo `netlify.toml` tem só duas definições:

```toml
[build.environment]
  NODE_VERSION = "20"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

- `NODE_VERSION = "20"` fixa a versão do Node usada no build.
- A regra de redirecionamento devolve `index.html` com status 200 para qualquer caminho. É o que permite abrir diretamente ou recarregar endereços como `/article/tt0050083` e `/movie/tt0050083`, já que o roteamento é feito no navegador pelo `BrowserRouter`.

O que o arquivo não define:

| Item | Situação |
| --- | --- |
| Comando de build e pasta de publicação | Ausentes do `netlify.toml`. Teriam de estar nas configurações do site no painel do Netlify (o esperado para este projeto seria `npm run build` e `dist`). Não verificado. |
| `VITE_MOVIE_SEARCH_BLOG_API_URL` | Precisa ser definida no ambiente de build do Netlify, porque o valor é embutido no bundle. Não verificado. |

No momento em que este documento foi escrito, o blog não está no ar: o endereço do Netlify responde 404. O selo "Netlify Status" que aparece no `README.md` aponta para o site `themoviesearchblog`.

## Dependências

Em uso no código:

| Pacote | Uso |
| --- | --- |
| `react`, `react-dom` | Interface. |
| `react-router-dom` | Rotas e navegação. |
| `@reduxjs/toolkit`, `react-redux` | Store, slices e thunks. |
| `styled-components` | Estilos e tema. |
| `date-fns` | Formatação de datas em `blogPostsAndReviewsSlice.ts`. |
| `lucide-react` | Ícone do `LoadingSpinner`. |

Declaradas no `package.json`, mas sem nenhuma importação em `src/`: `@fortawesome/fontawesome-svg-core`, `@fortawesome/free-brands-svg-icons`, `@fortawesome/free-solid-svg-icons`, `@fortawesome/react-fontawesome`, `react-icons` e `react-responsive`. Entre as de desenvolvimento, `autoprefixer` não tem configuração de PostCSS no repositório.

## Convenções do código

- Imports relativos, com módulos externos antes dos locais.
- Um `styles.ts` ao lado de cada `index.tsx`, importado como `S`.
- Props só de estilo com prefixo `$`.
- Cada feature em `src/features/{nome}/` com slice, `types.ts` e `service/`.
- Nenhuma URL montada fora de um service; thunks criados com `createApiThunk` e ligados ao slice com `addStatusCases`.
- Textos de interface em um objeto `translations` com as chaves `pt` e `en`, no próprio arquivo que os usa.
