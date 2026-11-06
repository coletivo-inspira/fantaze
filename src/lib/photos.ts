/**
 * Fotos reais opcionais. Basta colocar o arquivo na pasta certa, com o nome certo:
 *
 *  - pratos:    src/assets/pratos/<id-do-prato>.jpg      (ids em src/data/menu.ts, ex.: tartelete-gazeta.jpg)
 *  - ambientes: src/assets/ambiente/<salao|jardim|cha>.jpg
 *
 * Aceita .jpg, .jpeg, .png e .webp. Sem foto, o site mostra a ilustração.
 */
const dishFiles = import.meta.glob('../assets/pratos/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const sceneFiles = import.meta.glob('../assets/ambiente/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

function indexByName(files: Record<string, string>) {
  const map: Record<string, string> = {};
  for (const [path, url] of Object.entries(files)) {
    const name = path.split('/').pop()!.replace(/\.[^.]+$/, '');
    map[name] = url;
  }
  return map;
}

const dishPhotos = indexByName(dishFiles);
const scenePhotos = indexByName(sceneFiles);

export const getDishPhoto = (id: string): string | undefined => dishPhotos[id];

/** `kind` do ThemeScene (ballroom/garden/tea) -> nome do arquivo */
const sceneFileName = { ballroom: 'salao', garden: 'jardim', tea: 'cha' } as const;

export const getScenePhoto = (kind: keyof typeof sceneFileName): string | undefined =>
  scenePhotos[sceneFileName[kind]];

/** Foto do portal “Em cartaz” da home: src/assets/ambiente/cartaz.jpg */
export const getCartazPhoto = (): string | undefined => scenePhotos['cartaz'];
