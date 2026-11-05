import type { PassportReward, PassportSlot } from '../types';

/**
 * Páginas do passaporte. Cada tema novo ganha um carimbo; os slots futuros
 * ficam “travados” até o tema ser definido pela votação.
 * Para liberar um slot, defina `themeId` e `code`.
 */
export const passportSlots: PassportSlot[] = [
  {
    id: 'nov-2026',
    themeId: 'bridgerton',
    name: 'Bridgerton',
    month: 'Nov 2026',
    code: 'FNT-BRIDGERTON',
    colors: ['#30137e', '#8fb3dd'],
  },
  { id: 'dez-2026', themeId: null, name: 'Em breve', month: 'Dez 2026', code: null, colors: ['#7917b0', '#fc7893'] },
  { id: 'jan-2027', themeId: null, name: 'Em breve', month: 'Jan 2027', code: null, colors: ['#3c7fdd', '#ffb86f'] },
  { id: 'fev-2027', themeId: null, name: 'Em breve', month: 'Fev 2027', code: null, colors: ['#fc7893', '#7917b0'] },
  { id: 'mar-2027', themeId: null, name: 'Em breve', month: 'Mar 2027', code: null, colors: ['#30137e', '#fc7893'] },
  { id: 'abr-2027', themeId: null, name: 'Em breve', month: 'Abr 2027', code: null, colors: ['#7917b0', '#3c7fdd'] },
];

export const passportRewards: PassportReward[] = [
  {
    id: 'sobremesa',
    stampsRequired: 3,
    title: 'Sobremesa por conta da casa',
    description: 'Uma sobremesa assinatura do tema do mês, em qualquer visita.',
  },
  {
    id: 'jantar',
    stampsRequired: 6,
    title: 'Jantar para dois + Brinde da Temporada',
    description: 'Dois pratos principais, duas sobremesas e dois brindes sem álcool.',
  },
];
