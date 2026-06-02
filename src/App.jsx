import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import IntroOverlay from './components/IntroOverlay';
import BlogPage from './pages/BlogPage';
import CaseStudiesPage from './pages/CaseStudiesPage';

function HomePage({ introActive, setIntroActive }) {
  return (
    <div className={`shell${introActive ? '' : ' ready'}`}>
      {introActive && <IntroOverlay onDone={() => setIntroActive(false)} />}
      <LeftPanel />
      <RightPanel />
    </div>
  );
}

export default function App() {
  const [introActive, setIntroActive] = useState(true);

  return (
    <Routes>
      <Route path="/" element={<HomePage introActive={introActive} setIntroActive={setIntroActive} />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/case-studies" element={<CaseStudiesPage />} />
    </Routes>
  );
}
