import chair from '../../assets/grafismos/chair.png';
import clapper from '../../assets/grafismos/clapper.png';
import tickets from '../../assets/grafismos/tickets.png';
import cutlery from '../../assets/grafismos/cutlery.png';
import bowl from '../../assets/grafismos/bowl.png';
import sparkles from '../../assets/grafismos/sparkles.png';
import plate from '../../assets/grafismos/plate.png';
import cup from '../../assets/grafismos/cup.png';
import wing from '../../assets/grafismos/wing.png';
import dice from '../../assets/grafismos/dice.png';
import cards from '../../assets/grafismos/cards.png';

/** Grafismos oficiais da marca (cinema e mesa), extraídos do manual de identidade visual. */
export const grafismos = { chair, clapper, tickets, cutlery, bowl, sparkles, plate, cup, wing, dice, cards };
export type GrafismoName = keyof typeof grafismos;
