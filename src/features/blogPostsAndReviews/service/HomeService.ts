import BaseService from '../../../lib/service/BaseService';
import { BlogPostCardsResponse, SearchParams } from '../types';

class HomeService extends BaseService {
  protected prefix = 'home';

  // Lightweight card payload (title, date and S3 cover) for listings.
  cards(params: SearchParams): Promise<BlogPostCardsResponse> {
    const body = {
      filters: params.filters ?? {},
      page: params.page || 1,
      page_size: params.pageSize || 10,
    };
    return this.post(body, this.path('cards'));
  }
}

export default new HomeService();
