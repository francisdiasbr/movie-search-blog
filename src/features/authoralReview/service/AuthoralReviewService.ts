import { ApiResponse } from '../../../lib/api/types';
import BaseService from '../../../lib/service/BaseService';
import { AuthoralReview } from '../types';

class AuthoralReviewService extends BaseService {
  protected prefix = 'write-review';

  getByTconst(tconst: string): Promise<ApiResponse<AuthoralReview>> {
    return this.get(tconst);
  }
}

export default new AuthoralReviewService();
