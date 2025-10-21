import type { Novel } from './types';

/**
 * Sort novels by hiragana reading in Japanese aiueo order
 */
export function sortNovelsByHiragana(novels: Novel[]): Novel[] {
  return [...novels].sort((a, b) => {
    return a.hiragana.localeCompare(b.hiragana, 'ja-JP');
  });
}

/**
 * Group novels by their first hiragana character
 */
export function groupNovelsByFirstCharacter(novels: Novel[]): Map<string, Novel[]> {
  const grouped = new Map<string, Novel[]>();
  
  for (const novel of novels) {
    const firstChar = novel.hiragana.charAt(0);
    if (!grouped.has(firstChar)) {
      grouped.set(firstChar, []);
    }
    grouped.get(firstChar)!.push(novel);
  }
  
  return grouped;
}

/**
 * Get the hiragana section header (あ行, か行, etc.)
 */
export function getHiraganaSection(char: string): string {
  const sections: { [key: string]: string } = {
    'あ': 'あ行', 'い': 'あ行', 'う': 'あ行', 'え': 'あ行', 'お': 'あ行',
    'か': 'か行', 'き': 'か行', 'く': 'か行', 'け': 'か行', 'こ': 'か行',
    'が': 'か行', 'ぎ': 'か行', 'ぐ': 'か行', 'げ': 'か行', 'ご': 'か行',
    'さ': 'さ行', 'し': 'さ行', 'す': 'さ行', 'せ': 'さ行', 'そ': 'さ行',
    'ざ': 'さ行', 'じ': 'さ行', 'ず': 'さ行', 'ぜ': 'さ行', 'ぞ': 'さ行',
    'た': 'た行', 'ち': 'た行', 'つ': 'た行', 'て': 'た行', 'と': 'た行',
    'だ': 'た行', 'ぢ': 'た行', 'づ': 'た行', 'で': 'た行', 'ど': 'た行',
    'な': 'な行', 'に': 'な行', 'ぬ': 'な行', 'ね': 'な行', 'の': 'な行',
    'は': 'は行', 'ひ': 'は行', 'ふ': 'は行', 'へ': 'は行', 'ほ': 'は行',
    'ば': 'は行', 'び': 'は行', 'ぶ': 'は行', 'べ': 'は行', 'ぼ': 'は行',
    'ぱ': 'は行', 'ぴ': 'は行', 'ぷ': 'は行', 'ぺ': 'は行', 'ぽ': 'は行',
    'ま': 'ま行', 'み': 'ま行', 'む': 'ま行', 'め': 'ま行', 'も': 'ま行',
    'や': 'や行', 'ゆ': 'や行', 'よ': 'や行',
    'ら': 'ら行', 'り': 'ら行', 'る': 'ら行', 'れ': 'ら行', 'ろ': 'ら行',
    'わ': 'わ行', 'を': 'わ行', 'ん': 'わ行',
  };
  
  return sections[char] || 'その他';
}

