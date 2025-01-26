export interface ReviewContent {
  en: {
    text: string;
  };
  pt: {
    text: string;
  };
}

export interface AuthoralReview {
  _id: string;
  tconst: string;
  primaryTitle: string;
  content: ReviewContent;
  created_at: string;
  isAiGenerated: boolean;
  references?: string[];
  images?: string[];
}