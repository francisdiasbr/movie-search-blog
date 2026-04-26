import { configureStore } from '@reduxjs/toolkit';

import authoralReviewReducer from '../features/authoralReview/authoralReviewSlice';
import blogPostImagesReducer from '../features/blogPost/blogPostImagesSlice';
import blogPostReducer from '../features/blogPost/blogPostSlice';
import blogPostsAndReviewsReducer from '../features/blogPostsAndReviews/blogPostsAndReviewsSlice';
import favoritesReducer from '../features/favorites/favoritesSlice';
import recommendationsReducer from '../features/recommendations/recommendationsSlice';
import writeReviewsReducer from '../features/writeReviews/writeReviewsSlice';

export const store = configureStore({
  reducer: {
    authoralReview: authoralReviewReducer,
    blogPost: blogPostReducer,
    blogPostImages: blogPostImagesReducer,
    blogPostsAndReviews: blogPostsAndReviewsReducer,
    favorites: favoritesReducer,
    recommendations: recommendationsReducer,
    writeReviews: writeReviewsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
