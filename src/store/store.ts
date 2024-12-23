import { configureStore } from '@reduxjs/toolkit';

import blogPostImagesReducer from '../features/blogPost/blogPostImagesSlice';
import blogPostReducer from '../features/blogPost/blogPostSlice';
import searchBlogPostReducer from '../features/blogPost/searchBlogPostSlice';
import opinionReducer from '../features/opinion/opinionSlice';

export const store = configureStore({
  reducer: {
    blogPost: blogPostReducer,
    blogPostImages: blogPostImagesReducer,
    searchBlogPost: searchBlogPostReducer,
    opinion: opinionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
