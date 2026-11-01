import { useState, useEffect } from 'react';
import BrandLogo from './BrandLogo';

export default function IntroOverlay({ onDone }) {
  const [phase, setPhase] = useState('enter');

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('push'),   550), // logo shown → blue starts sliding in
      setTimeout(() => setPhase('exit'),  1150), // blue landed → both fade out
      setTimeout(onDone,                  1450), // fully gone → remove from DOM
    ];
    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  return (
    <>
      {/* Full-screen white with centered Blueside Digital logo */}
      <div className={`intro-white intro-${phase}`}>
        <div className="intro-logo">
          <BrandLogo asDiv />
          <div className="wordmark-sub">Independent Consulting</div>
        </div>
      </div>

      {/* Solid blue panel — slides in from the right, pushing white left */}
      <div className={`intro-blue intro-${phase}`} aria-hidden="true" />
    </>
  );
}
