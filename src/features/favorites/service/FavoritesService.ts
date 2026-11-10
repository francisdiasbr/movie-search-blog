import BaseService from '../../../lib/service/BaseService';
import { FavoritesEntry, FavoritesSearchParams, FavoritesSearchResponse } from '../types';

class FavoritesService extends BaseService {
  protected prefix = 'favorites';

  // There is no GET by id on favorites, so the lookup is a search by tconst.
  async getByTconst(tconst: string): Promise<FavoritesEntry | null> {
    const response = await this.search({ filters: { tconst: { $eq: tconst } } });
    return response.entries[0] ?? null;
  }

  search(params: FavoritesSearchParams = {}): Promise<FavoritesSearchResponse> {
    const body = {
      filters: params.filters ?? {},
      search_term: params.searchTerm ?? '',
    };
    return this.post(body, this.path('search'));
  }
}

export default new FavoritesService();
