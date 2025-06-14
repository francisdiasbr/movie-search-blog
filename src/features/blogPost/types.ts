export interface BlogPostContent {
  en: {
    title: string;
    introduction: string;
    conclusion: string;
    cultural_importance: string;
    historical_context: string;
    stars_and_characters: string;
    technical_analysis: string;
  };
  pt: {
    title: string;
    introduction: string;
    conclusion: string;
    cultural_importance: string;
    historical_context: string;
    stars_and_characters: string;
    technical_analysis: string;
  };
}

export interface BlogPostEntry {
  _id: string;
  content: BlogPostContent;
  created_at: string;
  images?: string[];
  imageUrl?: string;
  isAiGenerated: boolean;
  original_movie_soundtrack: string;
  poster_url: string;
  primaryTitle: string;
  references: string[];
  soundtrack_video_url: string;
  spotify_album_url: string;
  tconst: string;
  type?: 'blogpost' | 'review';
  soundtrack?: string;
}
