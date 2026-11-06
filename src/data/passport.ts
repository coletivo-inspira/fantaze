import type { PassportReward, PassportSlot } from '../types';

/**
 * Páginas do passaporte. Cada tema novo ganha um carimbo; os slots futuros
 * ficam “travados” até o tema ser definido pela votação.
 * Para liberar um slot, defina `themeId` e `code`.
 */
export const passportSlots: PassportSlot[] = [
  {
    id: 'carimbo-1',
    themeId: 'bridgerton',
    name: 'Bridgerton',
    month: 'Carimbo 1',
    code: 'FNT-BRIDGERTON',
    colors: ['#30137e', '#8fb3dd'],
  },
  { id: 'carimbo-2', themeId: null, name: 'Universo 2', month: 'Carimbo 2', code: 'FNT-CARIMBO-02', colors: ['#7917b0', '#fc7893'] },
  { id: 'carimbo-3', themeId: null, name: 'Universo 3', month: 'Carimbo 3', code: 'FNT-CARIMBO-03', colors: ['#3c7fdd', '#ffb86f'] },
  { id: 'carimbo-4', themeId: null, name: 'Universo 4', month: 'Carimbo 4', code: 'FNT-CARIMBO-04', colors: ['#fc7893', '#7917b0'] },
  { id: 'carimbo-5', themeId: null, name: 'Universo 5', month: 'Carimbo 5', code: 'FNT-CARIMBO-05', colors: ['#30137e', '#fc7893'] },
  { id: 'carimbo-6', themeId: null, name: 'Universo 6', month: 'Carimbo 6', code: 'FNT-CARIMBO-06', colors: ['#7917b0', '#3c7fdd'] },
];

export const passportRewards: PassportReward[] = [
  {
    id: 'sobremesa',
    stampsRequired: 3,
    title: 'Sobremesa por conta da casa',
    description: 'Uma sobremesa assinatura do tema em cartaz, em qualquer visita.',
  },
  {
    id: 'jantar',
    stampsRequired: 6,
    title: 'Jantar para dois + Brinde da Temporada',
    description: 'Dois pratos principais, duas sobremesas e dois brindes sem álcool.',
  },
];
