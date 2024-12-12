import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { store } from './store/store';
import { GlobalStyles } from './styles/GlobalStyles';
import Home from './pages/Home';
import BlogPost from './pages/BlogPost';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyles />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:movieId" element={<BlogPost />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;