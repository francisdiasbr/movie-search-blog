import { Language } from '../../../contexts/LanguageContext';
import { EntriesResponse } from '../../../lib/api/types';
import BaseService from '../../../lib/service/BaseService';
import { RandomRecommendationsResponse, Recommendation } from '../types';

class RecommendationsService extends BaseService {
  protected prefix = 'recommendations';

  findByTconst(tconst: string, language: Language): Promise<EntriesResponse<Recommendation>> {
    return this.get(undefined, this.path('all'), {
      params: { language, page_size: 1, search_term: tconst },
    });
  }

  random(language: Language = 'pt'): Promise<RandomRecommendationsResponse> {
    return this.get(undefined, this.path('random'), { params: { language } });
  }
}

export default new RecommendationsService();
