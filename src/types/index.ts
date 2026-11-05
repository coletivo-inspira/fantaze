export interface ThemePalette {
  bg: string;
  surface: string;
  ink: string;
  accent: string;
  accent2: string;
  gold: string;
}

export type SceneKind = 'ballroom' | 'garden' | 'tea';

export interface ThemeHighlight {
  title: string;
  description: string;
}

export interface ThemeMoment {
  time: string;
  title: string;
  description: string;
}

export interface MonthlyTheme {
  id: string;
  name: string;
  /** Texto curto exibido em chips e selos */
  badge: string;
  tagline: string;
  description: string;
  /** Datas ISO (yyyy-mm-dd), inclusivas */
  startsAt: string;
  endsAt: string;
  palette: ThemePalette;
  highlights: ThemeHighlight[];
  moments: ThemeMoment[];
  dressCode: string;
  playlist: string;
  scenes: { kind: SceneKind; title: string; caption: string }[];
}

export type DishArtKind = 'plate' | 'tart' | 'cake' | 'macarons' | 'cup' | 'glass' | 'flute' | 'scones';
export type DishTag = 'assinatura' | 'vegetariano' | 'sem-alcool' | 'com-alcool';

export interface MenuItem {
  id: string;
  category: MenuCategoryId;
  name: string;
  description: string;
  price: number;
  art: DishArtKind;
  /** Cores usadas na ilustração do prato */
  colors: [string, string];
  tags: DishTag[];
}

export type MenuCategoryId = 'entradas' | 'pratos' | 'sobremesas' | 'bebidas';

export interface MenuCategory {
  id: MenuCategoryId;
  label: string;
  subtitle: string;
}

export interface UpcomingTheme {
  id: string;
  name: string;
  tagline: string;
  colors: [string, string];
  /** Votos iniciais fictícios (a camada de serviço soma os votos reais) */
  seedVotes: number;
  icon: 'wand' | 'bolt' | 'rabbit' | 'ghost' | 'leaf' | 'ring' | 'sparkles';
}

export interface Suggestion {
  id: string;
  name: string;
  createdAt: string;
  votes: number;
}

export interface VoteTally {
  id: string;
  name: string;
  tagline: string;
  colors: [string, string];
  icon: UpcomingTheme['icon'];
  votes: number;
  isSuggestion: boolean;
}

export interface TimeSlot {
  time: string;
  available: boolean;
  seatsLeft: number;
}

export interface ReservationRequest {
  date: string;
  time: string;
  people: number;
  /** Tema ativo na data escolhida (ou 'a-definir') */
  themeId: string;
  experience: 'salao' | 'cha' | 'celebracao';
  name: string;
  phone: string;
  email: string;
  notes: string;
}

export interface Reservation extends ReservationRequest {
  code: string;
  createdAt: string;
  status: 'pendente' | 'confirmada';
}
