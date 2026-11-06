import type { DishArtKind } from '../../types';

interface DishArtProps {
  kind: DishArtKind;
  colors: [string, string];
  className?: string;
}

/**
 * Ilustrações vetoriais dos pratos (usadas quando não há foto em src/assets/pratos).
 * Cada ilustração usa duas cores do item para manter a paleta do tema.
 */
export default function DishArt({ kind, colors, className }: DishArtProps) {
  const [c1, c2] = colors;
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-hidden>
      {kind === 'plate' && (
        <g>
          <ellipse cx="60" cy="100" rx="40" ry="5" fill="#000" opacity=".08" />
          <circle cx="60" cy="60" r="42" fill="#fff" />
          <circle cx="60" cy="60" r="42" fill="none" stroke="#c9a24b" strokeWidth="1.5" opacity=".7" />
          <circle cx="60" cy="60" r="31" fill="none" stroke="#e9e1d1" strokeWidth="1" />
          <ellipse cx="55" cy="60" rx="17" ry="12" fill={c1} />
          <ellipse cx="72" cy="55" rx="8" ry="6" fill={c2} />
          <circle cx="45" cy="52" r="3.5" fill={c2} />
          <circle cx="68" cy="70" r="3" fill={c2} />
          <circle cx="60" cy="72" r="2" fill={c1} opacity=".7" />
        </g>
      )}
      {kind === 'tart' && (
        <g>
          <ellipse cx="60" cy="98" rx="38" ry="5" fill="#000" opacity=".08" />
          <path d="M18 70 L26 92 H94 L102 70 Z" fill={c1} />
          <path d="M26 74 v14 M38 74 v16 M50 74 v16 M62 74 v16 M74 74 v16 M86 74 v14" stroke="#fff" strokeWidth="1.2" opacity=".35" />
          <ellipse cx="60" cy="70" rx="42" ry="14" fill={c1} />
          <ellipse cx="60" cy="68" rx="35" ry="10" fill={c2} />
          <circle cx="48" cy="66" r="4" fill="#fff" opacity=".6" />
          <circle cx="66" cy="63" r="5" fill="#fff" opacity=".45" />
          <circle cx="76" cy="70" r="3" fill="#fff" opacity=".6" />
          <path d="M56 56 q4 -12 10 -2" stroke="#7a9a63" strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
      )}
      {kind === 'cake' && (
        <g>
          <ellipse cx="60" cy="102" rx="42" ry="5" fill="#000" opacity=".08" />
          <rect x="22" y="62" width="76" height="38" rx="6" fill={c1} />
          <rect x="22" y="78" width="76" height="6" fill="#fff" opacity=".5" />
          <rect x="30" y="38" width="60" height="30" rx="6" fill={c1} />
          <rect x="30" y="50" width="60" height="5" fill="#fff" opacity=".5" />
          <path d="M26 62 q4 10 8 0 q4 10 8 0 q4 10 8 0 q4 10 8 0 q4 10 8 0 q4 10 8 0 q4 10 8 0 q4 10 8 0 q4 10 8 0 q4 10 8 0 q4 10 8 0 V58 H26Z" fill={c2} />
          <path d="M30 40 q3 9 6 0 q3 9 6 0 q3 9 6 0 q3 9 6 0 q3 9 6 0 q3 9 6 0 q3 9 6 0 q3 9 6 0 q3 9 6 0 q3 9 6 0 V36 H30Z" fill={c2} />
          <circle cx="60" cy="30" r="6" fill="#d94d6a" />
          <path d="M60 24 q4 -8 9 -8" stroke="#6f8f55" strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
      )}
      {kind === 'macarons' && (
        <g>
          <ellipse cx="60" cy="100" rx="44" ry="5" fill="#000" opacity=".08" />
          {[
            { x: 32, y: 78, a: c1 },
            { x: 62, y: 80, a: c2 },
            { x: 86, y: 78, a: '#c9b6e8' },
            { x: 48, y: 52, a: '#b8cf9a' },
            { x: 76, y: 52, a: '#f4e3a0' },
          ].map((m, i) => (
            <g key={i}>
              <ellipse cx={m.x} cy={m.y + 5} rx="15" ry="6" fill={m.a} />
              <rect x={m.x - 14} y={m.y - 1} width="28" height="6" rx="3" fill="#fff" />
              <ellipse cx={m.x} cy={m.y - 2} rx="15" ry="7" fill={m.a} />
              <ellipse cx={m.x - 4} cy={m.y - 4} rx="6" ry="2" fill="#fff" opacity=".35" />
            </g>
          ))}
        </g>
      )}
      {kind === 'cup' && (
        <g>
          <ellipse cx="60" cy="98" rx="40" ry="6" fill="#fff" />
          <ellipse cx="60" cy="98" rx="40" ry="6" fill="none" stroke="#c9a24b" strokeWidth="1.2" />
          <path d="M30 56 H82 q0 34 -26 34 q-26 0 -26 -34Z" fill="#fff" stroke={c2} strokeWidth="2" />
          <path d="M82 62 q20 -2 14 14 q-4 8 -16 6" fill="none" stroke={c2} strokeWidth="3" strokeLinecap="round" />
          <ellipse cx="56" cy="56" rx="26" ry="5" fill={c1} />
          <path d="M42 70 q14 8 28 0" stroke={c1} strokeWidth="3" fill="none" strokeLinecap="round" opacity=".6" />
          <path d="M46 44 q-6 -8 0 -14 M60 44 q-6 -8 0 -14 M74 44 q-6 -8 0 -14" stroke="#b8b0c9" strokeWidth="2" fill="none" strokeLinecap="round" opacity=".7" />
        </g>
      )}
      {kind === 'glass' && (
        <g>
          <ellipse cx="60" cy="104" rx="28" ry="4" fill="#000" opacity=".08" />
          <path d="M34 28 H86 L80 98 q-1 6 -7 6 H47 q-6 0 -7 -6Z" fill="#fff" opacity=".85" stroke={c1} strokeWidth="2" />
          <path d="M38 48 H82 L78 96 q0 3 -4 3 H46 q-4 0 -4 -3Z" fill={c1} opacity=".75" />
          <circle cx="60" cy="44" r="12" fill={c2} stroke="#fff" strokeWidth="2" />
          <path d="M60 32 V56 M48 44 H72" stroke="#fff" strokeWidth="1" opacity=".7" />
          <circle cx="50" cy="74" r="3" fill="#fff" opacity=".5" />
          <circle cx="68" cy="84" r="2.5" fill="#fff" opacity=".5" />
          <circle cx="62" cy="66" r="2" fill="#fff" opacity=".5" />
          <path d="M72 30 L88 6" stroke="#7a9a63" strokeWidth="3" strokeLinecap="round" />
        </g>
      )}
      {kind === 'flute' && (
        <g>
          <ellipse cx="60" cy="108" rx="22" ry="3.5" fill="#000" opacity=".08" />
          <path d="M44 10 H76 q2 40 -12 56 V94 H80 a2 2 0 0 1 0 4 H40 a2 2 0 0 1 0 -4 H56 V66 Q42 50 44 10Z" fill="#fff" opacity=".75" stroke={c2} strokeWidth="2" />
          <path d="M46 28 H74 q1 28 -10 40 q-4 4 -4 4 q0 0 -4 -4 Q45 56 46 28Z" fill={c1} opacity=".85" />
          <circle cx="56" cy="50" r="2" fill="#fff" />
          <circle cx="63" cy="40" r="1.6" fill="#fff" />
          <circle cx="58" cy="32" r="1.4" fill="#fff" />
          <circle cx="66" cy="54" r="1.4" fill="#fff" />
          <path d="M84 32 l3 -6 l3 6 l-3 6Z M26 20 l2 -4 l2 4 l-2 4Z" fill="#c9a24b" />
        </g>
      )}
      {kind === 'scones' && (
        <g>
          <ellipse cx="60" cy="106" rx="42" ry="4" fill="#000" opacity=".08" />
          <rect x="58" y="22" width="4" height="82" fill="#c9a24b" />
          <ellipse cx="60" cy="100" rx="40" ry="6" fill="#fff" stroke="#c9a24b" strokeWidth="1.2" />
          <ellipse cx="60" cy="66" rx="32" ry="5" fill="#fff" stroke="#c9a24b" strokeWidth="1.2" />
          <ellipse cx="60" cy="34" rx="24" ry="4.5" fill="#fff" stroke="#c9a24b" strokeWidth="1.2" />
          <path d="M26 96 q6 -16 18 -14 q8 2 8 14Z" fill={c1} />
          <path d="M70 96 q4 -16 18 -14 q8 4 6 14Z" fill={c1} />
          <path d="M40 62 q6 -14 18 -12 q8 2 8 12Z" fill={c1} />
          <circle cx="86" cy="60" r="6" fill={c2} />
          <circle cx="46" cy="90" r="4" fill={c2} />
          <circle cx="60" cy="26" r="7" fill={c2} />
          <path d="M60 20 q3 -6 8 -6" stroke="#6f8f55" strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
}
