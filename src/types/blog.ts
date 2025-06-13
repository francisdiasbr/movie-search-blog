export interface BlogPost {
  data: {
    content: {
      en: {
        title: string;
        introduction: string;
        stars_and_characters: string;
        historical_context: string;
        cultural_importance: string;
        technical_analysis: string;
        conclusion: string;
      };
      pt: {
        title: string;
        introduction: string;
        stars_and_characters: string;
        historical_context: string;
        cultural_importance: string;
        technical_analysis: string;
        conclusion: string;
      };
    };
    created_at: string;
    isAiGenerated: boolean;
    images: string[];
    original_movie_soundtrack: string;
    poster_url: string;
    primaryTitle: string;
    references: string[];
    soundtrack_video_url: string;
    tconst: string;
  };
} 