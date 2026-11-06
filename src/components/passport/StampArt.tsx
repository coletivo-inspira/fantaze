import { useId } from 'react';
import { grafismos } from '../ui/grafismos';

interface StampArtProps {
  name: string;
  month: string;
  colors: [string, string];
  className?: string;
}

/** Carimbo circular do tema: texto em arco, borboleta ao centro e mês na base. */
export default function StampArt({ name, month, colors, className }: StampArtProps) {
  const uid = useId().replace(/:/g, '');
  const [ink, accent] = colors;
  const label = `FANTAZÊ ✦ ${name.toUpperCase()} ✦`;

  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label={`Carimbo ${name}, ${month}`}>
      <defs>
        <path id={`top-${uid}`} d="M60,60 m-45,0 a45,45 0 1,1 90,0" />
        <path id={`bot-${uid}`} d="M13,60 a47,47 0 0,0 94,0" />
      </defs>
      <circle cx="60" cy="60" r="56" fill="none" stroke={ink} strokeWidth="3" />
      <circle cx="60" cy="60" r="51" fill="none" stroke={ink} strokeWidth="1" strokeDasharray="2 3" />
      <circle cx="60" cy="60" r="31" fill={accent} opacity=".22" />
      <circle cx="60" cy="60" r="31" fill="none" stroke={ink} strokeWidth="1.5" />
      <text fill={ink} fontSize="9.5" fontWeight="800" letterSpacing="1.6" style={{ fontFamily: 'Nunito, sans-serif' }}>
        <textPath href={`#top-${uid}`} startOffset="50%" textAnchor="middle">
          {label}
        </textPath>
      </text>
      <text fill={ink} fontSize="9" fontWeight="800" letterSpacing="1.8" style={{ fontFamily: 'Nunito, sans-serif' }}>
        <textPath href={`#bot-${uid}`} startOffset="50%" textAnchor="middle">
          {month.toUpperCase()}
        </textPath>
      </text>
      <image href={grafismos.wing} x="38" y="38" width="44" height="44" preserveAspectRatio="xMidYMid meet" />
    </svg>
  );
}
