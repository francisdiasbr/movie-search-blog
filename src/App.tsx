import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { LanguageProvider } from './contexts/LanguageContext';
import Blog from './pages/Blog';
import Blogroll from './pages/Blogroll';
import CompleteArticle from './pages/CompleteArticle';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import NotFound from './pages/NotFound';
import Reviews from './pages/Reviews';
import { store } from './store/store';
import { GlobalStyles } from './styles/GlobalStyles';
import { lightTheme } from './styles/theme';

function ThemedApp() {
  return (
    <StyledThemeProvider theme={lightTheme}>
      <GlobalStyles theme={lightTheme} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article/:movieId" element={<CompleteArticle />} />
        <Route path="/movie/:movieId" element={<MovieDetail />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/blogroll" element={<Blogroll />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </StyledThemeProvider>
  );
}

function App() {
  return (
    <LanguageProvider>
      <Provider store={store}>
        <BrowserRouter>
          <ThemedApp />
        </BrowserRouter>
      </Provider>
    </LanguageProvider>
  );
}

export default App;
