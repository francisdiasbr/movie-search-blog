import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';
import About from './pages/About';
import BlogPost from './pages/BlogPost';
import Home from './pages/Home';
import Links from './pages/Links';
import Reviews from './pages/Reviews';
import { store } from './store/store';
import { GlobalStyles } from './styles/GlobalStyles';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyles />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:movieId" element={<BlogPost />} />
          <Route path="/about" element={<About />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/links" element={<Links />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
