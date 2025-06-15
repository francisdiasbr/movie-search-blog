export interface BlogPost {
  data: {
    content: {
      en: {
        title: string;
        introduction: string;
        plot_summary: string;
        acting_analysis: string;
        personal_impressions: string;
        recommendations: string;
        original_movie_soundtrack: string;
      };
      pt: {
        title: string;
        introduction: string;
        plot_summary: string;
        acting_analysis: string;
        personal_impressions: string;
        recommendations: string;
        original_movie_soundtrack: string;
      };
    };
    created_at: string;
    isAiGenerated: boolean;
    original_movie_soundtrack: string;
    primaryTitle: string;
    references: string[];
    soundtrack_video_url: string;
    tconst: string;
  };
} 