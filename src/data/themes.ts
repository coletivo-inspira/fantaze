import type { MonthlyTheme } from '../types';

/**
 * Cronograma de temas. Para trocar o tema do mês, basta adicionar um novo item
 * com `startsAt`/`endsAt` — o site calcula o tema ativo pela data atual.
 */
export const themes: MonthlyTheme[] = [
  {
    id: 'bridgerton',
    name: 'Bridgerton',
    badge: 'Baile da Temporada',
    tagline: 'Uma noite de gala na Londres da Regência.',
    description:
      'Salões iluminados por candelabros, chás da tarde com flores e brindes à luz de velas. Neste mês o Fantazê se transforma no baile mais comentado da temporada, com direito a segredos, elegância e muito açúcar.',
    startsAt: '2026-11-01',
    endsAt: '2026-11-30',
    palette: {
      bg: '#fbf6ec',
      surface: '#ffffff',
      ink: '#1f2a4a',
      accent: '#8fb3dd',
      accent2: '#e8b4b8',
      gold: '#c9a24b',
    },
    highlights: [
      {
        title: 'Salão de baile',
        description: 'Candelabros, cortinas de veludo e uma pista de “dança” para fotos inesquecíveis.',
      },
      {
        title: 'Cardápio da Temporada',
        description: 'Pratos autorais inspirados na mesa da alta sociedade inglesa do século XIX.',
      },
      {
        title: 'Chá das Cinco',
        description: 'Torres de scones, macarons e blends de chá servidos todos os dias às 17h.',
      },
      {
        title: 'Cartas da Gazeta',
        description: 'Cada mesa recebe um bilhete anônimo com um “segredo” para animar a conversa.',
      },
    ],
    moments: [
      {
        time: 'Chegada',
        title: 'Convite e recepção',
        description: 'Você é recebido por mordomos e damas, com um brinde de boas-vindas.',
      },
      {
        time: 'Entrada',
        title: 'Salão da Temporada',
        description: 'A mesa é servida entre cortinas, rosas e música de câmara.',
      },
      {
        time: 'Jantar',
        title: 'A ceia',
        description: 'Entradas, pratos principais e a carta de chás harmonizados.',
      },
      {
        time: 'Sobremesa',
        title: 'Doces do salão',
        description: 'Bolo debutante, macarons e scones para fechar a noite.',
      },
    ],
    dressCode: 'Tons pastel, luvas, flores no cabelo e gravatas borboleta são muito bem-vindos.',
    playlist: 'Covers de música pop em arranjos de quarteto de cordas.',
    scenes: [
      { kind: 'ballroom', title: 'Salão de baile', caption: 'Lustres, cortinas e o grande arco dourado.' },
      { kind: 'garden', title: 'Jardim das rosas', caption: 'Canteiros e treliças para o seu passeio.' },
      { kind: 'tea', title: 'Salão de chá', caption: 'Mesas pequenas, porcelana e conversas ao pé do ouvido.' },
    ],
  },
];

/** Tema ativo na data informada; se não houver, retorna o mais recente. */
export function getThemeForDate(iso: string): MonthlyTheme | undefined {
  return themes.find((t) => iso >= t.startsAt && iso <= t.endsAt);
}

export function getCurrentTheme(today: Date = new Date()): MonthlyTheme {
  const y = today.getFullYear();
  const m = String(today.getMonth() + 1).padStart(2, '0');
  const d = String(today.getDate()).padStart(2, '0');
  return getThemeForDate(`${y}-${m}-${d}`) ?? themes[themes.length - 1];
}
