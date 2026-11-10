import BaseService from '../../../lib/service/BaseService';
import { ImagesListResponse } from '../types';

class ImagesService extends BaseService {
  protected prefix = 'images';

  list(tconst: string): Promise<ImagesListResponse> {
    return this.get(tconst);
  }
}

export default new ImagesService();
