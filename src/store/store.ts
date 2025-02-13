import { configureStore } from '@reduxjs/toolkit';

import authoralReviewReducer from '../features/authoralReview/authoralReviewSlice';
import blogPostImagesReducer from '../features/blogPost/blogPostImagesSlice';
import blogPostReducer from '../features/blogPost/blogPostSlice';
import searchBlogPostReducer from '../features/blogPost/searchBlogPostSlice';
import blogPostsAndReviewsReducer from '../features/blogPostsAndReviews/blogPostsAndReviewsSlice';
import favoritesReducer from '../features/favorites/favoritesSlice';
import writeReviewsReducer from '../features/writeReviews/writeReviewsSlice';

export const store = configureStore({
  reducer: {
    authoralReview: authoralReviewReducer,
    blogPost: blogPostReducer,
    blogPostImages: blogPostImagesReducer,
    blogPostsAndReviews: blogPostsAndReviewsReducer,
    favorites: favoritesReducer,
    searchBlogPost: searchBlogPostReducer,
    writeReviews: writeReviewsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
