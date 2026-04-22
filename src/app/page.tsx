'use client';

import { useState, useEffect, useCallback } from 'react';
import { Clip, Act } from '@/lib/types';
import { clips } from '@/data/clips';
import Landing from '@/components/Landing';
import ActNav from '@/components/ActNav';
import ClipGrid from '@/components/ClipGrid';
import ClipModal from '@/components/ClipModal';
import ArgModal from '@/components/ArgModal';
import MirrorModal from '@/components/MirrorModal';
import ListModal from '@/components/ListModal';
import FormatArc from '@/components/FormatArc';
import StructuralNotes from '@/components/StructuralNotes';

type ActiveModal =
  | { type: 'clip'; clip: Clip }
  | { type: 'arg'; clip: Clip }
  | { type: 'mirror'; clip: Clip }
  | { type: 'list' }
  | null;

export default function HomePage() {
  const [activeAct, setActiveAct] = useState<Act>(1);
  const [modal, setModal] = useState<ActiveModal>(null);

  // Sync act accent to html data-act attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-act', String(activeAct));
  }, [activeAct]);

  // Track active act based on scroll position
  useEffect(() => {
    const acts: Act[] = [1, 2, 3];
    const observers: IntersectionObserver[] = [];

    acts.forEach((act) => {
      const el = document.getElementById(`act-${act}`);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveAct(act);
          }
        },
        { rootMargin: '-30% 0px -60% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const handleClipClick = useCallback((clip: Clip) => {
    if (clip.special === 'argument') {
      setModal({ type: 'arg', clip });
    } else if (clip.special === 'mirror') {
      setModal({ type: 'mirror', clip });
    } else {
      setModal({ type: 'clip', clip });
    }
  }, []);

  const closeModal = useCallback(() => setModal(null), []);

  const clip001 = clips.find((c) => c.id === '001')!;
  const clip027 = clips.find((c) => c.id === '027')!;

  return (
    <main style={{ background: '#0a0908', minHeight: '100vh' }}>
      <Landing />
      <ActNav
        activeAct={activeAct}
        onActChange={setActiveAct}
        onListOpen={() => setModal({ type: 'list' })}
      />
      <FormatArc />
      <ClipGrid onClipClick={handleClipClick} />
      <StructuralNotes />

      {/* Footer */}
      <footer
        className="w-full py-12 px-6 text-center"
        style={{ borderTop: '1px solid rgba(90,82,72,0.1)' }}
      >
        <p
          className="font-mono-jb"
          style={{ fontSize: '0.55rem', color: '#3a3530', letterSpacing: '0.14em' }}
        >
          BEFORE WE FIGURE IT OUT — RECOVERED FILES — 14 ASHFORD PLACE, APT 3B
        </p>
        <p
          className="font-cormorant mt-2"
          style={{ fontSize: '0.85rem', fontStyle: 'italic', color: '#5a5248' }}
        >
          No further context. No names. No dates.
        </p>
      </footer>

      {/* Modals */}
      {modal?.type === 'clip' && (
        <ClipModal clip={modal.clip} onClose={closeModal} />
      )}
      {modal?.type === 'arg' && (
        <ArgModal clip={modal.clip} onClose={closeModal} />
      )}
      {modal?.type === 'mirror' && (
        <MirrorModal clip027={clip027} clip001={clip001} onClose={closeModal} />
      )}
      {modal?.type === 'list' && (
        <ListModal open={true} onClose={closeModal} />
      )}
    </main>
  );
}
