export const restaurant = {
  name: 'Fantazê',
  slogan: 'Todo mês, um novo mundo à mesa.',
  essence: 'Trazer alegria à vida e as pessoas de volta umas às outras.',
  audience: 'Para todas as idades que acreditam em outros mundos.',
  personality: ['Lúdica', 'Sensorial', 'Divertida'],
  address: {
    street: 'Rua dos Sonhos, 123',
    district: 'Savassi',
    city: 'Belo Horizonte — MG',
    zip: '30140-000',
  },
  phone: '(31) 99999-0000',
  email: 'ola@fantaze.com.br',
  instagram: 'fantaze.restaurante',
  hours: [
    { days: 'Segunda', time: 'Fechado', closed: true },
    { days: 'Terça a quinta', time: '18h às 23h' },
    { days: 'Sexta e sábado', time: '12h às 00h' },
    { days: 'Domingo', time: '12h às 22h' },
  ],
  /** Dias da semana (0 = domingo) em que o restaurante funciona */
  openWeekdays: [0, 2, 3, 4, 5, 6],
  /** Horários de reserva oferecidos por dia da semana */
  slotsByWeekday: {
    0: ['12:00', '13:30', '15:00', '17:00', '19:00', '20:30'],
    2: ['18:00', '19:30', '21:00'],
    3: ['18:00', '19:30', '21:00'],
    4: ['18:00', '19:30', '21:00'],
    5: ['12:00', '13:30', '15:00', '18:00', '19:30', '21:00', '22:30'],
    6: ['12:00', '13:30', '15:00', '18:00', '19:30', '21:00', '22:30'],
  } as Record<number, string[]>,
  maxPeoplePerReservation: 12,
  pillars: [
    {
      title: 'Um universo por mês',
      description:
        'Ambientação, cardápio, trilha sonora e até o figurino da equipe mudam a cada ciclo. Voltar sempre é descobrir um lugar novo.',
    },
    {
      title: 'Experiência sensorial',
      description:
        'Aromas, texturas, luz e som desenhados juntos. Cada prato conta um pedaço da história do tema.',
    },
    {
      title: 'Você escolhe o próximo',
      description:
        'Os próximos mundos nascem da votação do público. Quem frequenta ajuda a decidir para onde o Fantazê vai.',
    },
    {
      title: 'Para todas as idades',
      description:
        'Um lugar para crianças curiosas, adultos nostálgicos e todo mundo que ainda acredita em outros mundos.',
    },
  ],
  story: [
    {
      year: 'A ideia',
      title: 'Um restaurante que muda de mundo',
      description:
        'Nascemos de uma pergunta simples: e se jantar fosse também uma viagem? Queríamos devolver à mesa o encantamento das histórias que marcaram a gente.',
    },
    {
      year: 'A marca',
      title: 'Uma borboleta e uma assinatura',
      description:
        'A borboleta representa a transformação: cada mês o Fantazê se transforma sem perder a essência. A letra manuscrita traz o lado afetivo e lúdico.',
    },
    {
      year: 'O ciclo',
      title: 'Votação, curadoria e estreia',
      description:
        'O público vota, a equipe cria a ambientação e o cardápio autoral, e no primeiro dia do mês o portal se abre com um novo universo.',
    },
  ],
};

export type Restaurant = typeof restaurant;
