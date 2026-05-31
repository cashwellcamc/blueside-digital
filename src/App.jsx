import { useState } from 'react';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import IntroOverlay from './components/IntroOverlay';

export default function App() {
  const [introActive, setIntroActive] = useState(true);

  return (
    <div className="shell">
      {introActive && <IntroOverlay onDone={() => setIntroActive(false)} />}
      <LeftPanel />
      <RightPanel />
    </div>
  );
}
