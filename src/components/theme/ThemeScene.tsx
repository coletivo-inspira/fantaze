import { useId } from 'react';
import type { SceneKind } from '../../types';

interface ThemeSceneProps {
  kind: SceneKind;
  className?: string;
}

/**
 * Ilustrações da ambientação do tema em cartaz (usam as variáveis `--t-*`).
 * Servem como arte oficial até que existam fotos reais do espaço.
 */
export default function ThemeScene({ kind, className }: ThemeSceneProps) {
  const uid = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" className={className} role="img" aria-hidden>
      <defs>
        <linearGradient id={`wall-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--t-accent)" stopOpacity=".55" />
          <stop offset="1" stopColor="var(--t-bg)" />
        </linearGradient>
        <radialGradient id={`glow-${uid}`} cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#fff2b8" stopOpacity=".95" />
          <stop offset="1" stopColor="#fff2b8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`floor-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--t-gold)" stopOpacity=".35" />
          <stop offset="1" stopColor="var(--t-gold)" stopOpacity=".75" />
        </linearGradient>
      </defs>

      {kind === 'ballroom' && (
        <g>
          <rect width="400" height="500" fill={`url(#wall-${uid})`} />
          {/* arco central */}
          <path d="M90 360 V170 a110 110 0 0 1 220 0 V360Z" fill="var(--t-bg)" stroke="var(--t-gold)" strokeWidth="6" />
          <path d="M100 360 V170 a100 100 0 0 1 200 0 V360Z" fill="var(--t-accent)" opacity=".35" />
          <path d="M200 70 V360 M100 215 H300 M120 130 L280 360 M280 130 L120 360" stroke="var(--t-gold)" strokeWidth="2" opacity=".6" />
          <circle cx="200" cy="150" r="60" fill="none" stroke="var(--t-gold)" strokeWidth="2" opacity=".5" />
          {/* lua e estrelas */}
          <circle cx="250" cy="130" r="14" fill="#fff6d0" />
          {[[150, 110], [180, 80], [225, 100], [160, 175], [255, 190]].map(([x, y], i) => (
            <path key={i} d={`M${x} ${y - 5} L${x + 1.5} ${y - 1.5} L${x + 5} ${y} L${x + 1.5} ${y + 1.5} L${x} ${y + 5} L${x - 1.5} ${y + 1.5} L${x - 5} ${y} L${x - 1.5} ${y - 1.5}Z`} fill="#fff" opacity=".9" />
          ))}
          {/* cortinas */}
          <path d="M0 0 H110 Q80 120 70 330 Q40 400 0 420Z" fill="var(--t-accent-2)" opacity=".92" />
          <path d="M400 0 H290 Q320 120 330 330 Q360 400 400 420Z" fill="var(--t-accent-2)" opacity=".92" />
          <path d="M0 0 H400 V40 Q300 70 200 40 Q100 70 0 40Z" fill="var(--t-gold)" opacity=".9" />
          <path d="M20 40 Q40 200 55 360 M50 40 Q70 200 80 340" stroke="#fff" strokeWidth="2" opacity=".35" fill="none" />
          <path d="M380 40 Q360 200 345 360 M350 40 Q330 200 320 340" stroke="#fff" strokeWidth="2" opacity=".35" fill="none" />
          {/* lustre */}
          <path d="M200 0 V70" stroke="var(--t-gold)" strokeWidth="3" />
          <circle cx="200" cy="130" r="70" fill={`url(#glow-${uid})`} />
          <path d="M160 100 Q200 140 240 100 M170 112 Q200 150 230 112" stroke="var(--t-gold)" strokeWidth="3" fill="none" />
          <path d="M150 98 H250" stroke="var(--t-gold)" strokeWidth="4" strokeLinecap="round" />
          {[155, 180, 200, 220, 245].map((x) => (
            <g key={x}>
              <rect x={x - 2} y="82" width="4" height="16" fill="#fffaf0" />
              <ellipse cx={x} cy="78" rx="3" ry="6" fill="#ffd36b" />
            </g>
          ))}
          {[165, 200, 235].map((x) => (
            <path key={x} d={`M${x} 120 v18`} stroke="#fff" strokeWidth="1.5" opacity=".7" />
          ))}
          {/* chão */}
          <rect y="360" width="400" height="140" fill={`url(#floor-${uid})`} />
          {Array.from({ length: 8 }).map((_, i) => (
            <path key={i} d={`M${i * 60 - 80} 500 L${200 + (i - 3.5) * 22} 360`} stroke="var(--t-bg)" strokeWidth="2" opacity=".5" />
          ))}
          {[385, 415, 455].map((y) => (
            <path key={y} d={`M0 ${y} H400`} stroke="var(--t-bg)" strokeWidth="2" opacity=".4" />
          ))}
        </g>
      )}

      {kind === 'garden' && (
        <g>
          <rect width="400" height="500" fill={`url(#wall-${uid})`} />
          <circle cx="300" cy="110" r="42" fill="#fff6d0" opacity=".9" />
          <path d="M0 330 Q100 280 200 320 T400 300 V500 H0Z" fill="#a8b89a" />
          <path d="M0 380 Q120 340 220 375 T400 360 V500 H0Z" fill="#8fa883" />
          {/* treliça */}
          <path d="M60 400 V170 a140 140 0 0 1 280 0 V400" fill="none" stroke="#fff" strokeWidth="10" />
          <path d="M60 400 V170 a140 140 0 0 1 280 0 V400" fill="none" stroke="var(--t-gold)" strokeWidth="2" />
          {Array.from({ length: 7 }).map((_, i) => (
            <path key={i} d={`M${60 + i * 40} 400 V${190 + Math.abs(i - 3) * 20}`} stroke="#fff" strokeWidth="3" opacity=".8" />
          ))}
          {/* rosas */}
          {[[75, 210], [92, 280], [70, 350], [325, 215], [310, 290], [330, 350], [120, 120], [280, 110], [200, 55], [160, 70], [245, 68]].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="14" fill="var(--t-accent-2)" />
              <circle cx={x} cy={y} r="9" fill="#fff" opacity=".35" />
              <path d={`M${x - 5} ${y} q5 -7 10 0 q-5 7 -10 0`} fill="var(--t-gold)" opacity=".6" />
              <ellipse cx={x + 14} cy={y + 9} rx="8" ry="4" fill="#6f8f55" transform={`rotate(25 ${x + 14} ${y + 9})`} />
            </g>
          ))}
          {/* banco */}
          <rect x="140" y="400" width="120" height="10" rx="3" fill="#fff" />
          <rect x="146" y="410" width="8" height="40" fill="var(--t-gold)" />
          <rect x="246" y="410" width="8" height="40" fill="var(--t-gold)" />
          <path d="M140 400 V360 H260 V400" fill="none" stroke="#fff" strokeWidth="6" />
        </g>
      )}

      {kind === 'tea' && (
        <g>
          <rect width="400" height="500" fill={`url(#wall-${uid})`} />
          {/* janela */}
          <rect x="120" y="50" width="160" height="200" rx="80" fill="#fff6d0" opacity=".9" stroke="var(--t-gold)" strokeWidth="6" />
          <path d="M200 50 V250 M120 150 H280" stroke="var(--t-gold)" strokeWidth="3" />
          <path d="M0 20 H400" stroke="var(--t-gold)" strokeWidth="6" />
          <path d="M20 20 Q40 200 20 330 H0 V20Z M380 20 Q360 200 380 330 H400 V20Z" fill="var(--t-accent-2)" opacity=".9" />
          {/* mesa */}
          <ellipse cx="200" cy="370" rx="190" ry="26" fill="var(--t-gold)" opacity=".5" />
          <rect x="0" y="360" width="400" height="140" fill={`url(#floor-${uid})`} />
          <ellipse cx="200" cy="350" rx="150" ry="22" fill="#fff" />
          <ellipse cx="200" cy="346" rx="150" ry="20" fill="none" stroke="var(--t-accent)" strokeWidth="2" />
          {/* torre de doces */}
          <rect x="198" y="210" width="4" height="130" fill="var(--t-gold)" />
          <ellipse cx="200" cy="335" rx="58" ry="8" fill="#fff" stroke="var(--t-gold)" />
          <ellipse cx="200" cy="278" rx="44" ry="7" fill="#fff" stroke="var(--t-gold)" />
          <ellipse cx="200" cy="224" rx="30" ry="6" fill="#fff" stroke="var(--t-gold)" />
          {[[170, 328, 'var(--t-accent-2)'], [200, 330, 'var(--t-accent)'], [230, 328, '#f4e3a0'], [180, 270, 'var(--t-accent)'], [215, 272, 'var(--t-accent-2)'], [200, 216, 'var(--t-accent-2)']].map(([x, y, c], i) => (
            <g key={i}>
              <ellipse cx={x as number} cy={(y as number) - 5} rx="13" ry="7" fill={c as string} />
              <ellipse cx={x as number} cy={(y as number) - 8} rx="9" ry="3" fill="#fff" opacity=".4" />
            </g>
          ))}
          {/* bule */}
          <g transform="translate(60 300)">
            <ellipse cx="40" cy="48" rx="34" ry="30" fill="#fff" stroke="var(--t-accent)" strokeWidth="3" />
            <path d="M74 36 q22 -6 16 14 q-4 8 -16 4" fill="none" stroke="var(--t-accent)" strokeWidth="4" strokeLinecap="round" />
            <path d="M8 40 q-18 -4 -14 -18" fill="none" stroke="var(--t-accent)" strokeWidth="4" strokeLinecap="round" />
            <ellipse cx="40" cy="20" rx="18" ry="6" fill="#fff" stroke="var(--t-accent)" strokeWidth="3" />
            <circle cx="40" cy="12" r="5" fill="var(--t-gold)" />
            <path d="M24 50 q16 10 32 0" stroke="var(--t-accent-2)" strokeWidth="4" fill="none" />
          </g>
          {/* xícaras */}
          {[290, 330].map((x) => (
            <g key={x} transform={`translate(${x} 318)`}>
              <path d="M0 6 H28 q0 22 -14 22 q-14 0 -14 -22Z" fill="#fff" stroke="var(--t-accent-2)" strokeWidth="2.5" />
              <path d="M28 10 q10 0 7 8 q-2 4 -9 3" fill="none" stroke="var(--t-accent-2)" strokeWidth="2.5" />
              <ellipse cx="14" cy="7" rx="13" ry="3" fill="#c98f4a" />
            </g>
          ))}
        </g>
      )}
    </svg>
  );
}
