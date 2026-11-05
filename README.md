# Fantazê

Site do restaurante temático **Fantazê** — todo mês, um novo mundo à mesa.

Stack (mesmo padrão do projeto `nathalia-verri`): Vite · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · React Router 7 · lucide-react.

## Como rodar

```bash
npm install
npm run dev      # desenvolvimento
npm run build    # tsc + build de produção
npm run lint
```

## Estrutura

```
src/
  App.tsx                 rotas (lazy) dentro do <Layout />
  main.tsx
  index.css               tema Tailwind (@theme) com a paleta da marca + animações
  pages/                  Home, MonthlyTheme, Menu, NextThemes, Reservations, Passport, About, NotFound
  components/
    layout/               Navbar, Footer, Layout, Splash, ScrollRestoration, ScrollToTopButton
    ui/                   Logo, Button, Reveal, SectionHeading, PageHeader, Decor, Marquee, ThemeScope
    home/                 seções da página inicial
    theme/                ThemeScene (ilustrações), ThemePortal, ThemeCountdown
    menu/                 MenuCard, DishArt (ilustrações dos pratos)
    vote/                 VoteCard, SuggestionForm, ThemeIcon
    reservation/          ReservationFlow (3 passos), ReservationSuccess, opções
  data/                   restaurant.ts, themes.ts, menu.ts, upcoming.ts  (dados fictícios)
  services/               votesService, reservationService (contratos + implementação local)
  hooks/                  useVotes, useCurrentTheme
  lib/                    cn, format
  types/
public/                   favicon (svg/png), logo-fantaze.svg/png
```

## Como trocar o tema do mês

1. Adicione um objeto em `src/data/themes.ts` com `startsAt`/`endsAt` e a paleta do universo.
2. Adicione o cardápio do tema em `src/data/menu.ts`.

O site escolhe o tema ativo pela data atual. A paleta do tema é aplicada via variáveis CSS (`--t-*`) pelo `<ThemeScope />`; a marca usa sempre as cores `brand-*`.

## Deploy no GitHub Pages

O workflow `.github/workflows/deploy.yml` roda lint e build em todo push/PR para `main` e publica no GitHub Pages a cada push em `main`.

Configuração única no repositório:

1. **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Faça push na branch `main`. Com domínio próprio (ex.: `fantaze.inspira.dev.br`), configure-o em Settings → Pages → Custom domain.

Detalhes:

- A base do site vem de `VITE_BASE_PATH`; o padrão do workflow é `/` (domínio próprio). Se publicar em `https://<usuario>.github.io/<repositorio>/`, crie a variável de repositório `BASE_PATH` com o valor `/<repositorio>/`.
- O build gera um `404.html` idêntico ao `index.html`, para que recarregar uma rota como `/cardapio` continue funcionando.
- Para testar o build local com a base do Pages: `VITE_BASE_PATH=/fantaze/ npm run build && npm run preview`.

## Integração com sistemas reais

`votesService` e `reservationService` exportam uma interface (`VotesService`, `ReservationService`) e uma implementação local (localStorage, dados simulados). Para usar um backend, crie outra implementação da mesma interface e troque o export no fim do arquivo — as telas não precisam mudar.

## Observações

- As ilustrações de ambientação e dos pratos são vetoriais (placeholders) até haver fotografias reais.
- As fotos do moodboard (`src/assets/photos`) são referências do projeto; substitua por imagens com direitos de uso antes de publicar.
- Restaurante fictício (projeto acadêmico). Marcas e universos citados pertencem aos seus detentores.
