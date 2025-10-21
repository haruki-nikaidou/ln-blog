export interface Author {
  writer: string;
  illustrator: string;
}

export type RatingTier = 'F' | 'E' | 'E+' | 'D-' | 'D' | 'D+' | 'C-' | 'C' | 
  'C+' | 'B-' | 'B' | 'B+' | 'A-' | 'A' | 'A+' | 'S-' | 'S' | 'S+' | null;

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

