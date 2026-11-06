import type { SceneKind } from '../../types';
import { getScenePhoto } from '../../lib/photos';
import ThemeScene from './ThemeScene';

interface ScenePhotoProps {
  kind: SceneKind;
  alt: string;
  className?: string;
}

/** Foto real do ambiente quando existir em `src/assets/ambiente`; senão, a ilustração. */
export default function ScenePhoto({ kind, alt, className }: ScenePhotoProps) {
  const photo = getScenePhoto(kind);
  if (!photo) return <ThemeScene kind={kind} className={className} />;
  return <img src={photo} alt={alt} loading="lazy" className={`object-cover ${className ?? ''}`} />;
}
