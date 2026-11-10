import BaseService from '../../../lib/service/BaseService';
import { ReviewsSearchParams, ReviewsSearchResponse } from '../types';

class WriteReviewsService extends BaseService {
  protected prefix = 'write-review';

  search(params: ReviewsSearchParams): Promise<ReviewsSearchResponse> {
    const body = {
      filters: params.filters ?? {},
      page: params.page,
      page_size: params.pageSize,
    };
    return this.post(body, this.path('search'));
  }
}

export default new WriteReviewsService();
