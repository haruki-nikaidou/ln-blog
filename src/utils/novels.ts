import novelsData from '../../content/novels.json';
import type { Novel } from './types';

// Import all cover images
import kagejituCover from '../assets/cover/kagejitu.jpg';
import overlordCover from '../assets/cover/overlord.jpg';
import re0Cover from '../assets/cover/re0.jpg';
import seibutaCover from '../assets/cover/seibuta.jpg';

// Map cover filenames to imported images
const coverImages: Record<string, any> = {
  'kagejitu.jpg': kagejituCover,
  'overlord.jpg': overlordCover,
  're0.jpg': re0Cover,
  'seibuta.jpg': seibutaCover,
};

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

