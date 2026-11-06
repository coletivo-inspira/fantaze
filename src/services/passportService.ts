import { passportRewards, passportSlots } from '../data/passport';
import type { ClaimResult, PassportState } from '../types';
import { readStorage, wait, writeStorage } from './storage';

/**
 * Contrato do passaporte. Na versão final o código do carimbo deve ser validado
 * no servidor (ex.: QR code lido pela equipe ou código de uso único por mesa).
 * Hoje a validação é local (códigos em `data/passport.ts`).
 */
export interface PassportService {
  getState(): PassportState;
  claim(code: string): Promise<ClaimResult>;
  redeem(rewardId: string): Promise<string | null>;
}

const KEY = 'fantaze:passaporte';
const empty: PassportState = { stamps: {}, redeemed: {} };

function normalize(code: string) {
  return code.trim().toUpperCase().replace(/\s+/g, '');
}

function voucherCode() {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let out = '';
  for (let i = 0; i < 6; i++) out += alphabet[Math.floor(Math.random() * alphabet.length)];
  return `BRD-${out}`;
}

const localPassportService: PassportService = {
  getState() {
    return readStorage<PassportState>(KEY, empty);
  },

  async claim(rawCode) {
    await wait(500);
    const code = normalize(rawCode);
    const slot = passportSlots.find((s) => s.code === code);
    if (!slot) return { ok: false, reason: 'invalid' };

    const state = readStorage<PassportState>(KEY, empty);
    if (state.stamps[slot.id]) return { ok: false, reason: 'already' };

    state.stamps[slot.id] = new Date().toISOString().slice(0, 10);
    writeStorage(KEY, state);
    return { ok: true, slot };
  },

  async redeem(rewardId) {
    await wait(500);
    const reward = passportRewards.find((r) => r.id === rewardId);
    const state = readStorage<PassportState>(KEY, empty);
    if (!reward || Object.keys(state.stamps).length < reward.stampsRequired) return null;
    if (state.redeemed[rewardId]) return state.redeemed[rewardId];

    const voucher = voucherCode();
    state.redeemed[rewardId] = voucher;
    writeStorage(KEY, state);
    return voucher;
  },
};

export const passportService: PassportService = localPassportService;
