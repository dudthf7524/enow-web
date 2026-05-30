import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TodayPage from './pages/TodayPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/today" element={<TodayPage />} />
      </Routes>
    </BrowserRouter>
  );
}
