import { configureStore } from '@reduxjs/toolkit';

import blogPostSlice from './features/blogPost/blogPostSlice';
import searchBlogPostSlice from './features/blogPost/searchBlogPostSlice';

export const store = configureStore({
  reducer: {
    blogPost: blogPostSlice,
    searchBlogPost: searchBlogPostSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
