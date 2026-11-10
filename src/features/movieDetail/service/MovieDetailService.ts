import { Language } from '../../../contexts/LanguageContext';
import BaseService from '../../../lib/service/BaseService';
import { DirectorInfo, MovieDetailCache, SoundtrackInfo, SoundtrackQuery } from '../types';

class MovieDetailService extends BaseService {
  protected prefix = 'movie-detail';

  // Movie + director + soundtrack already assembled by the backend, when cached.
  getCached(tconst: string, language: Language): Promise<MovieDetailCache> {
    return this.get(tconst, this.prefix, { params: { language } });
  }

  getDirector(name: string, tconst: string, language: Language): Promise<DirectorInfo> {
    return this.get(name, 'directors', { params: { language, tconst } });
  }

  getSoundtrack({ director, title, year }: SoundtrackQuery, language: Language): Promise<SoundtrackInfo> {
    return this.get(undefined, 'music/soundtrack', { params: { director, language, title, year } });
  }
}

export default new MovieDetailService();
