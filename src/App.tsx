import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { store } from './store/store';
import { GlobalStyles } from './styles/GlobalStyles';
import Home from './pages/Home';
import BlogPost from './pages/BlogPost';
import AboutUs from './pages/AboutUs';
import './index.css';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyles />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:movieId" element={<BlogPost />} />
          <Route path="/aboutus" element={<AboutUs />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;