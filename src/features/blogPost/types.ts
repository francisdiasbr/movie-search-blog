export interface BlogPostContent {
  en: {
    title: string;
    introduction: string;
    plot_summary: string;
    acting_analysis: string;
    personal_impressions: string;
    recommendations: string;
    conclusion: string;
  };
  pt: {
    title: string;
    introduction: string;
    plot_summary: string;
    acting_analysis: string;
    personal_impressions: string;
    recommendations: string;
    conclusion: string;
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
