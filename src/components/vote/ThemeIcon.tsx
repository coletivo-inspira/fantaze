import { Wand2, Zap, Rabbit, Ghost, Leaf, CircleDot, Sparkles } from 'lucide-react';
import type { UpcomingTheme } from '../../types';

const icons = {
  wand: Wand2,
  bolt: Zap,
  rabbit: Rabbit,
  ghost: Ghost,
  leaf: Leaf,
  ring: CircleDot,
  sparkles: Sparkles,
} as const;

export default function ThemeIcon({ name, size = 24 }: { name: UpcomingTheme['icon']; size?: number }) {
  const Icon = icons[name];
  return <Icon size={size} />;
}
