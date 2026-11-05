import { useMemo } from 'react';
import { getCurrentTheme } from '../data/themes';
import { daysUntil } from '../lib/format';

export function useCurrentTheme() {
  return useMemo(() => {
    const theme = getCurrentTheme();
    return { theme, daysLeft: daysUntil(theme.endsAt) };
  }, []);
}
