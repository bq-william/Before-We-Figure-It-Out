'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Clip, Act } from '@/lib/types';
import { clips } from '@/data/clips';
import ClipCard from './ClipCard';

interface ClipGridProps {
  onClipClick: (clip: Clip) => void;
}

const actTitles: Record<Act, { roman: string; label: string; desc: string }> = {
  1: {
    roman: 'I',
    label: 'THE RECORD',
    desc: 'Sept 2023 — Nov 2023',
  },
  2: {
    roman: 'II',
    label: 'THE SHIFT',
    desc: 'Nov 2023 — Mar 2024',
  },
  3: {
    roman: 'III',
    label: 'THE ARCHIVE',
    desc: 'Mar 2024 — Apr 2024',
  },
};

const actAccent: Record<Act, string> = {
  1: '#c9a97a',
  2: '#a08c6e',
  3: '#6b8fa8',
};

const actFormatNote: Record<Act, string> = {
  1: 'COMPACT CAMERA PRIMARY',
  2: 'MIXED FORMAT',
  3: 'PHONE ONLY',
};

function ActSection({
  act,
  actClips,
  onClipClick,
}: {
  act: Act;
  actClips: Clip[];
  onClipClick: (clip: Clip) => void;
}) {
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, margin: '-80px' });
  const info = actTitles[act];
  const accent = actAccent[act];

  return (
    <div id={`act-${act}`} className="mb-20">
      {/* Act header */}
      <div
        ref={headerRef}
        className="mb-8 pb-4"
        style={{ borderBottom: `1px solid ${accent}22` }}
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-end gap-6 flex-wrap">
            <div>
              <p
                className="font-mono-jb"
                style={{
                  fontSize: '0.55rem',
                  color: accent,
                  letterSpacing: '0.18em',
                  marginBottom: '4px',
                }}
              >
                ACT
              </p>
              <h2
                className="font-cormorant"
                style={{
                  fontSize: 'clamp(3rem, 8vw, 6rem)',
                  fontWeight: 300,
                  lineHeight: 1,
                  color: accent,
                  opacity: 0.85,
                }}
              >
                {info.roman}
              </h2>
            </div>
            <div className="pb-2">
              <p
                className="font-mono-jb"
                style={{ fontSize: '0.6rem', color: '#5a5248', letterSpacing: '0.1em', marginBottom: '4px' }}
              >
                {info.label}
              </p>
              <p
                className="font-mono-jb"
                style={{ fontSize: '0.55rem', color: '#3a3530', letterSpacing: '0.08em', marginBottom: '8px' }}
              >
                {info.desc}
              </p>
              <p
                className="font-mono-jb"
                style={{
                  fontSize: '0.55rem',
                  color: accent,
                  letterSpacing: '0.1em',
                  opacity: 0.6,
                  border: `1px solid ${accent}33`,
                  padding: '2px 6px',
                  display: 'inline-block',
                }}
              >
                {actFormatNote[act]}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '12px',
        }}
      >
        {actClips.map((clip, i) => (
          <CardWrapper key={clip.id} clip={clip} index={i} onClipClick={onClipClick} />
        ))}
      </div>
    </div>
  );
}

function CardWrapper({
  clip,
  index,
  onClipClick,
}: {
  clip: Clip;
  index: number;
  onClipClick: (clip: Clip) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.4) }}
    >
      <ClipCard clip={clip} onClick={() => onClipClick(clip)} />
    </motion.div>
  );
}

export default function ClipGrid({ onClipClick }: ClipGridProps) {
  const actGroups: Record<Act, Clip[]> = { 1: [], 2: [], 3: [] };
  clips.forEach((clip) => {
    actGroups[clip.act].push(clip);
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12">
      {([1, 2, 3] as Act[]).map((act) => (
        <ActSection
          key={act}
          act={act}
          actClips={actGroups[act]}
          onClipClick={onClipClick}
        />
      ))}
    </div>
  );
}
