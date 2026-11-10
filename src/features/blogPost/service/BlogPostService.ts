import { ApiResponse } from '../../../lib/api/types';
import BaseService from '../../../lib/service/BaseService';
import { BlogPostEntry } from '../types';

class BlogPostService extends BaseService {
  protected prefix = 'generate-blogpost';

  getByTconst(tconst: string): Promise<ApiResponse<BlogPostEntry>> {
    return this.get(tconst);
  }
}

export default new BlogPostService();
