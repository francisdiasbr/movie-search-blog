const API_URL = 'https://the-movie-search-app-638de9ab055f.herokuapp.com/api';

export async function fetchMovieBlogPost(movieId: string) {
  try {
    const response = await fetch(`${API_URL}/generate-blogpost/${movieId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch blog post');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching blog post:', error);
    throw error;
  }
}