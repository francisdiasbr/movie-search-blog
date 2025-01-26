export interface ReviewContent {
  pt: {
    text: string;
  };
  en: {
    text: string;
  };
}

export interface MovieReviewResponse {
  _id: string;
  tconst: string;
  primaryTitle: string;
  content: ReviewContent;
  created_at: string;
  isAiGenerated: boolean;
  references?: string[];
  images?: string[];
}

