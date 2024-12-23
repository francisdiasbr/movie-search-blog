import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';
import AboutUs from './pages/AboutUs';
import BlogPost from './pages/BlogPost';
import Home from './pages/Home';
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
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/reviews" element={<Reviews />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
