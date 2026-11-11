import { useId } from 'react';
import logo from '../../assets/logo-asa.png';

interface StampArtProps {
  name: string;
  month: string;
  colors: [string, string];
  className?: string;
}

/** Carimbo circular do tema: nome em arco, asa do Fantazê ao centro e identificação na base. */
export default function StampArt({ name, month, colors, className }: StampArtProps) {
  const uid = useId().replace(/:/g, '');
  const [ink, accent] = colors;
  const label = `✦ ${name.toUpperCase()} ✦`;
  // O arco superior tem ~140 unidades de comprimento: reduz a fonte para nomes longos
  const topSize = Math.min(10, 128 / (label.length * 0.82));

  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label={`Carimbo ${name}, ${month}`}>
      <defs>
        <path id={`top-${uid}`} d="M60,60 m-44,0 a44,44 0 1,1 88,0" />
        <path id={`bot-${uid}`} d="M14,60 a46,46 0 0,0 92,0" />
      </defs>
      <circle cx="60" cy="60" r="56" fill="none" stroke={ink} strokeWidth="3" />
      <circle cx="60" cy="60" r="52" fill="none" stroke={ink} strokeWidth="0.8" strokeDasharray="2 3" />
      <circle cx="60" cy="60" r="32" fill="#fff" fillOpacity=".55" />
      <circle cx="60" cy="60" r="32" fill={accent} opacity=".15" />
      <circle cx="60" cy="60" r="32" fill="none" stroke={ink} strokeWidth="1.5" />
      <text fill={ink} fontSize={topSize} fontWeight="800" letterSpacing="1" style={{ fontFamily: 'Nunito, sans-serif' }}>
        <textPath href={`#top-${uid}`} startOffset="50%" textAnchor="middle">
          {label}
        </textPath>
      </text>
      <text fill={ink} fontSize="8.5" fontWeight="800" letterSpacing="1.6" style={{ fontFamily: 'Nunito, sans-serif' }}>
        <textPath href={`#bot-${uid}`} startOffset="50%" textAnchor="middle">
          {month.toUpperCase()}
        </textPath>
      </text>
      <image href={logo} x="40" y="40" width="40" height="40" preserveAspectRatio="xMidYMid meet" />
    </svg>
  );
}
