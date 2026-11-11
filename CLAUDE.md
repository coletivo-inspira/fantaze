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

- `src/App.tsx`: rotas lazy dentro de `Layout`. Rotas: `/`, `/tema-do-mes` (exibida como "Em cartaz"), `/cardapio`, `/proximos-temas`, `/reservas`, `/passaporte`, `/sobre`.
- `src/pages/`, `src/components/{layout,ui,home,theme,menu,vote,reservation,passport}/`.
- `src/data/`: conteúdo editável (`restaurant`, `themes`, `menu`, `upcoming`, `passport`).
- `src/services/`: contrato (interface) + implementação local em localStorage para votos, reservas e passaporte. Para usar backend, crie outra implementação e troque o export no fim do arquivo.
- `src/lib/photos.ts`: fotos reais opcionais (ver abaixo). `design/`: fontes vetoriais e grafismos antigos (não entram no build).

## Regras da marca (não contradizer sem consultar o usuário)

- **Logo** definida pelo grupo (PNG com fundo transparente, extraída de `Design sem nome.zip`): asa em degradê vermelho/laranja/amarelo + nome manuscrito em vermelho. Nunca recolorir a asa. `LogoPrincipal` (`src/assets/logo-completa.png`) é usada na navbar e na splash. Os carimbos usam só a asa (`logo-asa.png`).
- **Rodapé** usa `Logo.tsx` (nome branco + asa em camada própria, que bate no hover: `logo-letras-branco.png` + `logo-asa-canvas.png`).
- **Favicon** = asa sobre quadrado arredondado pêssego (`public/favicon.svg` com PNG embutido, PNGs e apple-touch). Se a logo vetorial sair do grupo, substituir os PNGs por SVG.
- Versões coloridas da logo (verde, roxo, azul etc.) ficam para depois; por ora só a vermelha/laranja.
- **Grafismos** (`src/assets/grafismos`, via `ui/grafismos.ts` e `<Decor name=…/>`): conjunto novo de cinema e mesa (chair, clapper, tickets, cutlery, bowl, sparkles, plate, cup, wing, dice, cards). Os antigos estão em `design/grafismos-antigos/`.
- Paleta oficial como `brand-*`, agora em **vermelho e laranja** (os nomes dos tokens foram mantidos): indigo = vermelho profundo `#8e1a1f`, purple = vermelho `#d8302a`, blue = laranja `#f26b2d`, pink = coral `#ff6b4a`, ink = `#3d0f12`, mais cream, amber, peach, sand e paper (tons quentes). Fontes: Caprasimo (títulos), Nunito (texto), Cormorant Garamond (tema em cartaz).
- **Modo escuro (marrom, não preto)**: botão `ThemeToggle` na navbar alterna `data-theme="dark"` no `<html>` (salvo em `localStorage` `fantaze:tema`; padrão = claro; script no `index.html` evita o flash). Implementação 100% em `src/index.css`: tokens `brand-*` redefinidos (indigo/ink viram creme para texto, paper vira marrom `#231510`), mais overrides para `bg-brand-indigo` (painel marrom `#3b1c13`; botões/links viram vermelho), `bg-white` e `--t-*`. A variante Tailwind `dark:` está habilitada para isso. No escuro a navbar/splash trocam a logo para a versão de nome branco. Ao criar componentes, prefira tokens `brand-*`/`--t-*` e evite cores fixas em fundos claros.
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

## Passaporte

6 carimbos (`src/data/passport.ts`), brindes aos 3 e 6 carimbos. Códigos atuais de teste: `FNT-BRIDGERTON`, `FNT-CARIMBO-02` a `FNT-CARIMBO-06` (não aparecem na tela). Estado salvo em localStorage (`fantaze:passaporte`). O carimbo (`StampArt`) leva a logo ao centro e o nome do tema em arco (fonte reduz para nomes longos).

## Splash

`Splash.tsx` aparece **toda vez** que o site é aberto/recarregado (sem sessionStorage), por ~2,2 s, com a logo principal (asa + nome). Sem cortinas nem botão "entrar".

## Deploy

GitHub Actions → GitHub Pages (`.github/workflows/deploy.yml`), push na `main`. Domínio próprio `fantaze.inspira.dev.br`, base `/`. Só use a variável de repositório `BASE_PATH` se publicar em subpasta. O build gera `404.html` para o fallback de SPA.

## Armadilhas conhecidas

- `backdrop-filter` em um ancestral faz filhos `position: fixed` se posicionarem em relação a ele (por isso o menu mobile fica fora do `<header>`).
- Arquivos `.fuse_hidden*` podem aparecer na pasta; apague-os e não commite.
- Não use `pkill -f` no ambiente de shell do Claude (derruba o próprio shell).
- Ao mexer em nomes de grafismos, atualize todos os `<Decor name=…>` e a prop `decor` do `PageHeader`.
