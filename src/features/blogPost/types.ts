export interface BlogPostEntry {
  _id: string;
  content: {
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
  };
  created_at: string;
  images: string[];
  original_movie_soundtrack: string;
  poster_url: string;
  primaryTitle: string;
  references: string[];
  soundtrack_video_url: string;
  tconst: string;
  type?: 'blogpost' | 'review';
}
