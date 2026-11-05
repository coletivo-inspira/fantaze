import type { UpcomingTheme } from '../types';

/** Universos candidatos aos próximos meses. Votos iniciais são fictícios. */
export const upcomingThemes: UpcomingTheme[] = [
  {
    id: 'harry-potter',
    name: 'Harry Potter',
    tagline: 'Salão principal, cerveja amanteigada e mesas flutuantes.',
    colors: ['#7a1f2b', '#d9a441'],
    seedVotes: 184,
    icon: 'wand',
  },
  {
    id: 'stranger-things',
    name: 'Stranger Things',
    tagline: 'Anos 80, luzes de Natal e um portal para o Mundo Invertido.',
    colors: ['#a3121f', '#1b1b3a'],
    seedVotes: 156,
    icon: 'bolt',
  },
  {
    id: 'alice',
    name: 'Alice no País das Maravilhas',
    tagline: 'Chá maluco, rainha de copas e porções que mudam de tamanho.',
    colors: ['#3c7fdd', '#fc7893'],
    seedVotes: 142,
    icon: 'rabbit',
  },
  {
    id: 'wandinha',
    name: 'Wandinha',
    tagline: 'Gótico, sombrio e deliciosamente sarcástico.',
    colors: ['#2a2a35', '#8b6bb8'],
    seedVotes: 97,
    icon: 'ghost',
  },
  {
    id: 'ghibli',
    name: 'Estúdio Ghibli',
    tagline: 'Banhos termais, florestas encantadas e comidas que dão água na boca.',
    colors: ['#5aa27c', '#f2d379'],
    seedVotes: 121,
    icon: 'leaf',
  },
  {
    id: 'senhor-dos-aneis',
    name: 'O Senhor dos Anéis',
    tagline: 'Banquete no Condado e segundo café da manhã dos hobbits.',
    colors: ['#4d6b3a', '#c9a24b'],
    seedVotes: 88,
    icon: 'ring',
  },
];
