import { configureStore } from '@reduxjs/toolkit';

import searchBlogPostReducer from '../features/blogPost/searchBlogPostSlice';
import blogPostReducer from '../features/blogPost/blogPostSlice';
import opinionReducer from '../features/opinion/opinionSlice';

export const store = configureStore({
  reducer: {
    searchBlogPost: searchBlogPostReducer,
    blogPost: blogPostReducer,
    opinion: opinionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 