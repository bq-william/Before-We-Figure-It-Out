'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Act } from '@/lib/types';

interface ActNavProps {
  activeAct: Act;
  onActChange: (act: Act) => void;
  onListOpen: () => void;
}

const accentColor: Record<Act, string> = {
  1: '#c9a97a',
  2: '#a08c6e',
  3: '#6b8fa8',
};

export default function ActNav({ activeAct, onActChange, onListOpen }: ActNavProps) {
  const [visible, setVisible] = useState(false);
  const landingRef = useRef<Element | null>(null);

  useEffect(() => {
    const landing = document.getElementById('landing');
    if (!landing) return;
    landingRef.current = landing;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(landing);
    return () => observer.disconnect();
  }, []);

  const scrollToAct = (act: Act) => {
    onActChange(act);
    const el = document.getElementById(`act-${act}`);
    if (el) {
      const offset = 72;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const accent = accentColor[activeAct];

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          key="actnav"
          initial={{ y: -56, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -56, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6"
          style={{
            height: '52px',
            background: 'rgba(10,9,8,0.94)',
            borderBottom: '1px solid rgba(90,82,72,0.2)',
            backdropFilter: 'blur(12px)',
          }}
        >
          {/* Left: wordmark */}
          <span
            className="font-mono-jb hidden sm:block"
            style={{ fontSize: '0.6rem', color: '#8a8070', letterSpacing: '0.1em' }}
          >
            BEFORE WE FIGURE IT OUT
          </span>

          {/* Center: act buttons */}
          <div className="flex items-center gap-1 mx-auto sm:mx-0">
            {([1, 2, 3] as Act[]).map((act) => (
              <button
                key={act}
                onClick={() => scrollToAct(act)}
                className="font-mono-jb px-3 py-1 rounded transition-all duration-200"
                style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.12em',
                  color: activeAct === act ? accent : '#8a8070',
                  borderBottom: activeAct === act ? `1px solid ${accent}` : '1px solid transparent',
                  background: 'none',
                  cursor: 'pointer',
                }}
              >
                ACT {['I', 'II', 'III'][act - 1]}
              </button>
            ))}
          </div>

          {/* Right: list button + format arc */}
          <div className="flex items-center gap-4">
            <span
              className="font-mono-jb hidden md:block"
              style={{ fontSize: '0.65rem', color: '#8a8070', letterSpacing: '0.06em' }}
            >
              COMPACT → MIXED → PHONE
            </span>
            <button
              onClick={onListOpen}
              className="font-mono-jb px-2 py-1 rounded transition-all duration-150"
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                color: '#8a7e72',
                border: '1px solid rgba(90,82,72,0.3)',
                background: 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.color = accent;
                (e.target as HTMLButtonElement).style.borderColor = accent;
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.color = '#8a7e72';
                (e.target as HTMLButtonElement).style.borderColor = 'rgba(90,82,72,0.3)';
              }}
            >
              LIST.txt
            </button>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
