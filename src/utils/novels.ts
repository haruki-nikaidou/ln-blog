import novelsData from '../../content/novels.json';
import type { Novel } from './types';

// Dynamically import all cover images
const coverImports = import.meta.glob<{ default: any }>('../assets/cover/*.{jpg,jpeg,png,webp}', { eager: true });

// Create a map with just the filename as key
const coverImages: Record<string, any> = {};
for (const [path, module] of Object.entries(coverImports)) {
  const filename = path.split('/').pop()!;
  coverImages[filename] = module.default;
}

// Add coverImage to each novel
export const novels: Novel[] = (novelsData as Novel[]).map((novel) => ({
  ...novel,
  coverImage: coverImages[novel.cover],
}));

export function getNovelById(id: string): Novel | undefined {
  return novels.find((novel) => novel.id === id);
}

export function getNovelsByTag(tagId: string): Novel[] {
  return novels.filter((novel) => novel.tags.includes(tagId));
}

export function searchNovels(query: string): Novel[] {
  const lowerQuery = query.toLowerCase();
  return novels.filter(
    (novel) =>
      novel.name.toLowerCase().includes(lowerQuery) ||
      novel.hiragana.includes(lowerQuery) ||
      novel.alterName.some((alt) => alt.toLowerCase().includes(lowerQuery)) ||
      novel.authors.writer.toLowerCase().includes(lowerQuery) ||
      novel.authors.illustrator.toLowerCase().includes(lowerQuery)
  );
}

