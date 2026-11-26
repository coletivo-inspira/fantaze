/**
 * Endereço do tour 3D (página estática em public/salao-3d).
 * Sempre com index.html explícito: o servidor de dev do Vite não resolve índice de pasta em public/.
 */
const BASE = `${import.meta.env.BASE_URL}salao-3d/index.html`;

/** `embed`: pula a intro e não captura a rolagem do mouse (para usar dentro de iframe). */
export function tour3dUrl(themeId: string, embed = false): string {
  const params = new URLSearchParams();
  if (embed) params.set('embed', '1');
  params.set('tema', themeId);
  return `${BASE}?${params.toString()}`;
}
