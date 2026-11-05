import { useCallback, useState } from 'react';
import { passportRewards, passportSlots } from '../data/passport';
import { passportService } from '../services/passportService';
import type { ClaimResult, PassportState } from '../types';

export function usePassport() {
  const [state, setState] = useState<PassportState>(() => passportService.getState());
  const [busy, setBusy] = useState(false);

  const stampCount = Object.keys(state.stamps).length;
  const totalSlots = passportSlots.length;
  const nextReward = passportRewards.find((r) => stampCount < r.stampsRequired) ?? null;

  const claim = useCallback(async (code: string): Promise<ClaimResult> => {
    setBusy(true);
    const result = await passportService.claim(code);
    setState(passportService.getState());
    setBusy(false);
    return result;
  }, []);

  const redeem = useCallback(async (rewardId: string) => {
    setBusy(true);
    const voucher = await passportService.redeem(rewardId);
    setState(passportService.getState());
    setBusy(false);
    return voucher;
  }, []);

  return { state, stampCount, totalSlots, nextReward, busy, claim, redeem };
}
