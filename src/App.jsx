import { Routes, Route } from 'react-router-dom';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import BlogPage from './pages/BlogPage';
import ArticlePage from './pages/ArticlePage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';

function HomePage() {
  return (
    <div className="shell ready">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <LeftPanel />
      <RightPanel />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:slug" element={<ArticlePage />} />
      <Route path="/case-studies" element={<CaseStudiesPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}
