# CLAUDE.md — Site do Fantazê

Site do restaurante temático **Fantazê** (projeto de Publicidade e Propaganda, UNA), tratado como produto real para o cliente final. Responda ao usuário em **português**, de forma concisa.

## Stack e comandos

Vite 8 · React 19 · TypeScript estrito · Tailwind CSS v4 (`@theme` em `src/index.css`) · framer-motion · react-router-dom 7 · lucide-react / react-icons · `cn` (clsx + tailwind-merge).

```bash
npm install
npm run dev
npm run build     # tsc -b + vite build
npm run lint      # ESLint (react-hooks, react-refresh)
```

Depois de qualquer mudança, rode `npx tsc -b && npx eslint . && npx vite build`. Não há navegador headless no ambiente do Claude: a verificação visual é feita pelo usuário (ele manda prints).

## Estrutura

- `src/App.tsx`: rotas lazy dentro de `Layout`. Rotas: `/`, `/tema-do-mes` (exibida como "Em cartaz"), `/tour-3d`, `/cardapio`, `/proximos-temas`, `/reservas`, `/passaporte`, `/sobre`.
- `src/pages/`, `src/components/{layout,ui,home,theme,menu,vote,reservation,passport}/`.
- `src/data/`: conteúdo editável (`restaurant`, `themes`, `menu`, `upcoming`, `passport`).
- `src/services/`: contrato (interface) + implementação local em localStorage para votos, reservas e passaporte. Para usar backend, crie outra implementação e troque o export no fim do arquivo.
- `src/lib/photos.ts`: fotos reais opcionais (ver abaixo). `design/`: fontes vetoriais e grafismos antigos (não entram no build).

## Regras da marca (não contradizer sem consultar o usuário)

- **Logo** (nova, nov/2026, do manual "Identidade visual em ação"): asa em degradê vermelho/laranja/amarelo + "Fantazê" manuscrito e "restaurante temático" em **laranja** (fundo claro). Versão negativa: mesmo desenho com nome em **branco** (fundos cacau/chocolate/bordô). Nunca recolorir a asa. PNGs 1200×265 (proporção `aspect-[1200/265]`), gerados dos originais `fantaze_logo_laranja_fundo_claro.png` / `fantaze_logo_branca_fundo_escuro.png`. `LogoPrincipal` (`logo-completa.png`, laranja) na navbar e na splash. Os carimbos e o favicon usam só a asa (`logo-asa.png`). `public/logo-fantaze.png` (og:image) = logo laranja sobre pêssego. O tour 3D usa a versão branca embutida em base64.
- **Rodapé** usa `Logo.tsx` (nome branco + asa em camada própria, que bate no hover: `logo-letras-branco.png` + `logo-asa-canvas.png`, mesmo canvas; origem da batida `.wing-l` em `index.css`).
- **Favicon** = asa sobre quadrado arredondado pêssego (`public/favicon.svg` com PNG embutido, PNGs e apple-touch). Se a logo vetorial sair do grupo, substituir os PNGs por SVG.
- Versões coloridas da logo (verde, roxo, azul etc.) ficam para depois; por ora só a vermelha/laranja.
- **Grafismos** (`src/assets/grafismos`, via `ui/grafismos.ts` e `<Decor name=…/>`): conjunto de cinema e mesa (chair, clapper, tickets, cutlery, bowl, sparkles, plate, cup, wing, dice, cards) em traço bordô (`nome.png`) e âmbar (`nome-ambar.png`, com `tom="escuro"`, como no rodapé). Os originais em índigo estão em `design/grafismos-indigo/`; os antigos em `design/grafismos-antigos/`.
- Paleta oficial como `brand-*`, agora em **vermelho e laranja** (os nomes dos tokens foram mantidos): indigo = vermelho profundo `#8e1a1f`, purple = vermelho `#d8302a`, blue = laranja `#f26b2d`, pink = coral `#ff6b4a`, ink = `#3d0f12`, mais cream, amber, peach, sand e paper (tons quentes). Fontes (padrão único em todo o site, inclusive nas páginas do tema): Fraunces (todos os títulos, cards e números, peso 600), Nunito (texto corrido), Cormorant Garamond itálico **só** no nome do tema e na frase de efeito dele (`theme.name`, `tagline`, `badge`, nome dos candidatos na votação). Não usar `font-theme` em títulos de seção, cards ou parágrafos. Por tema muda só a cor (`--t-*`) e as imagens. O deck de identidade visual está no Claude Artifacts ("Fantazê — Identidade Visual").
- **Sem modo escuro**: o site é sempre claro (decisão do cliente, nov/2026). O `ThemeToggle`, o script do `index.html` e o CSS `data-theme="dark"` foram removidos; não recriar variantes `dark:`.
- O site deve ser **responsivo para mobile** em tudo que for criado.
- Instagram: `@fantaze`.

## Conceito de conteúdo

- Não existe mais "tema do mês". Cada tema fica **em cartaz por cerca de 4 meses**, sem escrever isso explicitamente. Use "Em cartaz", "temporada", "até <data>". Evite "todo mês", "do mês", "mensal".
- Tema atual: Bridgerton, 01/11/2026 a 28/02/2027 (`src/data/themes.ts`). O site escolhe o tema ativo pela data. A paleta do tema vai por variáveis CSS `--t-*` (`ThemeScope`); a marca usa sempre `brand-*`.
- A votação dos próximos temas continua, **sem** campo de sugestão de tema. Os candidatos aparecem como portais em arco (`VoteCard`).
- O site é para o cliente final: **não** escrever "fictício", "demonstração", "nesta versão", "ilustrativo", "projeto acadêmico" nem avisos de teste.

## Imagens

- O Claude não gera nem baixa fotos (sem acesso a bancos de imagem). As imagens vêm do usuário (geradas por IA) e são comprimidas para JPG ~1600 px.
- Ambientes: `src/assets/ambiente/{salao,jardim,cha}.jpg` (3 salas) e `cartaz.jpg` (portal da home). Sem arquivo, cai na ilustração `ThemeScene`.
- Pratos: `src/assets/pratos/<id-do-prato>.jpg` (ids em `src/data/menu.ts`). Sem arquivo, cai na ilustração `DishArt`.
- Fotos de referência do moodboard em `src/assets/photos` (usadas em Sobre).

## Tour 3D do salão

Página estática em `public/salao-3d/index.html` (three.js r128 via cdnjs, sem build), servida em `/salao-3d/index.html` (sempre com `index.html` explícito: no `npm run dev` o Vite não resolve `/salao-3d/` e cai no 404 do app). Aceita `?tema=<id>` (bridgerton, harry, stranger, ghibli) e `?embed=1` (pula a intro e não captura a rolagem do mouse). Fica embutida em `/tema-do-mes#tour-3d` pelo `components/theme/Salao3D.tsx`, que só carrega o iframe após o clique (capa: `src/assets/ambiente/salao-3d.jpg`). Também tem página própria `/tour-3d` (`pages/Tour3D.tsx`, iframe aberto direto, item "Tour 3D" no menu e no rodapé); o botão "Tour 3D do salão" do `ThemeSpotlight` leva para ela. URL montada por `lib/tour3d.ts`. Links internos da página 3D usam `target="_top"`.

## Passaporte

6 carimbos (`src/data/passport.ts`), brindes aos 3 e 6 carimbos. Códigos atuais de teste: `FNT-BRIDGERTON`, `FNT-CARIMBO-02` a `FNT-CARIMBO-06` (não aparecem na tela). Estado salvo em localStorage (`fantaze:passaporte`). O carimbo (`StampArt`) leva a logo ao centro e o nome do tema em arco (fonte reduz para nomes longos).

## Splash

`Splash.tsx` aparece **toda vez** que o site é aberto/recarregado (sem sessionStorage), por ~2,2 s, com a logo principal (asa + nome). Sem cortinas nem botão "entrar".

## Deploy

GitHub Actions → GitHub Pages (`.github/workflows/deploy.yml`), push na `main`. Domínio próprio `fantaze.inspira.dev.br`, base `/`. Só use a variável de repositório `BASE_PATH` se publicar em subpasta. O build gera `404.html` para o fallback de SPA.

## Armadilhas conhecidas

- Navbar: com 7 links, os links de desktop só aparecem a partir de `xl` (abaixo disso, menu hambúrguer); em `lg` eles quebravam linha.
- O botão "voltar ao topo" some em `/reservas` (cobria o "Continuar") e `/tour-3d`.

- `backdrop-filter` em um ancestral faz filhos `position: fixed` se posicionarem em relação a ele (por isso o menu mobile fica fora do `<header>`).
- Arquivos `.fuse_hidden*` podem aparecer na pasta; apague-os e não commite.
- Não use `pkill -f` no ambiente de shell do Claude (derruba o próprio shell).
- Ao mexer em nomes de grafismos, atualize todos os `<Decor name=…>` e a prop `decor` do `PageHeader`.
