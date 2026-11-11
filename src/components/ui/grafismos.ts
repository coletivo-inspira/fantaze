import chair from '../../assets/grafismos/chair.png';
import chairAmbar from '../../assets/grafismos/chair-ambar.png';
import clapper from '../../assets/grafismos/clapper.png';
import clapperAmbar from '../../assets/grafismos/clapper-ambar.png';
import tickets from '../../assets/grafismos/tickets.png';
import ticketsAmbar from '../../assets/grafismos/tickets-ambar.png';
import cutlery from '../../assets/grafismos/cutlery.png';
import cutleryAmbar from '../../assets/grafismos/cutlery-ambar.png';
import bowl from '../../assets/grafismos/bowl.png';
import bowlAmbar from '../../assets/grafismos/bowl-ambar.png';
import sparkles from '../../assets/grafismos/sparkles.png';
import sparklesAmbar from '../../assets/grafismos/sparkles-ambar.png';
import plate from '../../assets/grafismos/plate.png';
import plateAmbar from '../../assets/grafismos/plate-ambar.png';
import cup from '../../assets/grafismos/cup.png';
import cupAmbar from '../../assets/grafismos/cup-ambar.png';
import dice from '../../assets/grafismos/dice.png';
import diceAmbar from '../../assets/grafismos/dice-ambar.png';
import cards from '../../assets/grafismos/cards.png';
import cardsAmbar from '../../assets/grafismos/cards-ambar.png';
import wing from '../../assets/grafismos/wing.png';

/** Grafismos oficiais da marca (cinema e mesa), em traço bordô (fundos claros). */
export const grafismos = { chair, clapper, tickets, cutlery, bowl, sparkles, plate, cup, dice, cards, wing };

/** Mesmos grafismos em âmbar, para fundos escuros (modo escuro e rodapé). */
export const grafismosAmbar = { chair: chairAmbar, clapper: clapperAmbar, tickets: ticketsAmbar, cutlery: cutleryAmbar, bowl: bowlAmbar, sparkles: sparklesAmbar, plate: plateAmbar, cup: cupAmbar, dice: diceAmbar, cards: cardsAmbar, wing };
export type GrafismoName = keyof typeof grafismos;
