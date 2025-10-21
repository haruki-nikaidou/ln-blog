export interface Author {
  writer: string;
  illustrator: string;
}

export type RatingTier = 'F' | 'D' | 'C' | 'B' | 'A' | 'S' | 'S+' | null;

export interface Novel {
  id: string;
  name: string;
  hiragana: string;
  authors: Author;
  alterName: string[];
  tags: string[];
  ratingTier: RatingTier;
  cover: string;
}

export type ReviewLevel = 'spoilerSafe' | 'spoilerAlert' | 'techniqueReview';

export type TagCategory =
  | 'majorCategory'
  | 'minorCategory'
  | 'character'
  | 'technique'
  | 'pattern'
  | 'publisher'
  | 'review';

