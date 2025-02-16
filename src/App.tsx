import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import './index.css';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeProvider';
import { useTheme } from './contexts/useTheme';
import About from './pages/About';
import AboutMe from './pages/AboutMe';
import AboutProject from './pages/AboutProject';
import BlogPost from './pages/BlogPost';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import Links from './pages/Links';
import Review from './pages/Review';
import Reviews from './pages/Reviews';
import { store } from './store/store';
import { GlobalStyles } from './styles/GlobalStyles';
import { lightTheme, darkTheme } from './styles/theme';

function ThemedApp() {
  const { theme } = useTheme();
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  return (
    <StyledThemeProvider theme={currentTheme}>
      <GlobalStyles theme={currentTheme} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:movieId" element={<BlogPost />} />
        <Route path="/review/:movieId" element={<Review />} />
        <Route path="/about" element={<About />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/links" element={<Links />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/about-project" element={<AboutProject />} />
        <Route path="/about-me" element={<AboutMe />} />
      </Routes>
    </StyledThemeProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Provider store={store}>
          <BrowserRouter>
            <ThemedApp />
          </BrowserRouter>
        </Provider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
