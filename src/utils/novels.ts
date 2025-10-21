import novelsData from '../../content/novels.json';
import type { Novel } from './types';

export const novels: Novel[] = novelsData as Novel[];

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

