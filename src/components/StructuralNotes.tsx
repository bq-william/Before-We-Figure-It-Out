'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const notes = [
  {
    id: 'item99',
    label: '01 — ITEM 99',
    title: 'The List — Item 99',
    body: 'Item 99 is never revealed. In Clip 006, a thumb covers it when Mia holds the list up to the compact camera — that looks accidental. By Clips 018 and 022, a horizontal crease runs across that exact line, as if the paper was folded and unfolded many times at that spot. The film never addresses it. There is no answer given.',
  },
  {
    id: 'compact',
    label: '02 — THE CAMERA',
    title: 'The Compact Camera Disappears',
    body: 'The compact camera\'s last appearance is either Clip 009 (Dinner for Someone) or Clip 012 (One Chord) depending on how you read it — the script intentionally doesn\'t specify. After that, Mia films entirely on her phone. The film doesn\'t mark the transition. No scene where she puts the camera away. Clips after it just look different.',
  },
  {
    id: 'argument',
    label: '03 — CLIP 016',
    title: 'The Argument Clip',
    body: 'Clip 016 is visually black the entire way through — the phone was face-down on the kitchen counter. The audio is muffled because the mic is pressed against a hard surface. The argument is audible but not fully intelligible: you can follow the emotional shape of it, not the content. The phone keeps recording after the door closes, into the empty apartment. There is no more information in this clip than appears to be there.',
  },
  {
    id: 'mirror',
    label: '04 — CLIPS 001 AND 027',
    title: 'Same Afternoon, Different Camera',
    body: 'Clip 027 has the same date as Clip 001: September 14, 2023. It\'s filed at the end of the archive despite being the oldest footage. Both clips are at the same park entrance, the same busker, the same afternoon. Clip 001 is Mia filming — Theo never appears in frame. Clip 027 is Theo filming from across the park — Mia is visible in the background, watching the busker, not knowing she\'s being filmed. The coffee cup that blocks Mia\'s lens in Clip 001 is the same one Theo is holding in Clip 027 when he raises it toward her camera. He kept this footage. It was in the archive.',
  },
  {
    id: 'theo',
    label: '05 — THEO\'S FACE',
    title: 'Theo Is Kept Off Camera in Act One',
    body: 'Theo\'s face is never shown clearly in Act One. Hands, voice, partial shots — but not a direct look at him. The first clear view of him from outside is Clip 020, filmed by a third party at a party. The script\'s intention is that the audience learns him the way Mia did — gradually, through accumulation — before getting a full look. In the final clip (027), his phone falls and the last frame is Mia\'s face, not his.',
  },
];

function NoteCard({ note, index, isInView }: { note: (typeof notes)[0]; index: number; isInView: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ borderBottom: '1px solid rgba(90,82,72,0.12)' }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: '100%', textAlign: 'left', padding: '20px 0',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'none', border: 'none', cursor: 'pointer',
        }}
      >
        <div>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.52rem', color: '#6a6258',
            letterSpacing: '0.12em', display: 'block', marginBottom: '5px',
          }}>
            {note.label}
          </span>
          <span style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: '1.15rem', fontWeight: 400,
            color: open ? '#e8e0d5' : '#a09888',
          }}>
            {note.title}
          </span>
        </div>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.8rem', color: '#6a6258',
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s',
          flexShrink: 0, marginLeft: '16px',
        }}>
          +
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '0.88rem', color: '#b0a898',
              lineHeight: 1.82, paddingBottom: '20px', margin: 0,
            }}>
              {note.body}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function StructuralNotes() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      ref={ref}
      className="w-full max-w-7xl mx-auto px-6 py-16"
      style={{ borderTop: '1px solid rgba(90,82,72,0.12)' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.55rem', color: '#6a6258',
          letterSpacing: '0.18em', marginBottom: '8px',
        }}>
          SCRIPT NOTES
        </p>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
          fontWeight: 400, color: '#e8e0d5',
        }}>
          Structural Annotations
        </h2>
        <p style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: '0.85rem', color: '#9a9080',
          lineHeight: 1.75, maxWidth: '520px', marginTop: '10px',
        }}>
          Notes from the script document on specific choices — things the film does without explaining why it does them.
        </p>
      </motion.div>

      <div style={{ maxWidth: '580px' }}>
        {notes.map((note, i) => (
          <NoteCard key={note.id} note={note} index={i} isInView={isInView} />
        ))}
      </div>
    </section>
  );
}
