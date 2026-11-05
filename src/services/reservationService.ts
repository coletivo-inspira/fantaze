import { restaurant } from '../data/restaurant';
import { parseISODate } from '../lib/format';
import type { Reservation, ReservationRequest, TimeSlot } from '../types';
import { readStorage, wait, writeStorage } from './storage';

/**
 * Contrato de reservas. A implementação atual simula disponibilidade e salva
 * localmente. Para integrar com um sistema real (ex.: API própria, Anota AI,
 * Tagme), implemente `ReservationService` e troque o export no final do arquivo.
 */
export interface ReservationService {
  getAvailability(date: string, people: number): Promise<TimeSlot[]>;
  create(request: ReservationRequest): Promise<Reservation>;
}

const KEY = 'fantaze:reservas';
const CAPACITY_PER_SLOT = 40;

/** Pseudo-aleatório determinístico: a mesma data sempre gera a mesma lotação. */
function seeded(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 1000) / 1000;
}

function generateCode(): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let out = '';
  for (let i = 0; i < 6; i++) out += alphabet[Math.floor(Math.random() * alphabet.length)];
  return `FNT-${out}`;
}

const localReservationService: ReservationService = {
  async getAvailability(date, people) {
    await wait(300);
    const weekday = parseISODate(date).getDay();
    const times = restaurant.slotsByWeekday[weekday] ?? [];
    const saved = readStorage<Reservation[]>(KEY, []);

    return times.map((time) => {
      const base = Math.round(seeded(`${date}-${time}`) * (CAPACITY_PER_SLOT + 6));
      const mine = saved
        .filter((r) => r.date === date && r.time === time)
        .reduce((sum, r) => sum + r.people, 0);
      const seatsLeft = Math.max(0, CAPACITY_PER_SLOT - base - mine);
      return { time, seatsLeft, available: seatsLeft >= people };
    });
  },

  async create(request) {
    await wait(900);
    const reservation: Reservation = {
      ...request,
      code: generateCode(),
      createdAt: new Date().toISOString(),
      status: 'pendente',
    };
    const saved = readStorage<Reservation[]>(KEY, []);
    saved.push(reservation);
    writeStorage(KEY, saved);
    return reservation;
  },
};

export const reservationService: ReservationService = localReservationService;
