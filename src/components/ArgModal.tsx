'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clip } from '@/lib/types';

interface ArgModalProps {
  clip: Clip | null;
  onClose: () => void;
}

const fragments = [
  { text: '"I already told you—"',                        delay: 0.6 },
  { text: '"—you were the one who—"',                     delay: 2.1 },
  { text: '"I don\'t know how to do this and also—"',     delay: 3.6 },
  { text: '[door. not slammed. closed.]',                  delay: 5.2, dim: true },
];

export default function ArgModal({ clip, onClose }: ArgModalProps) {
  useEffect(() => {
    if (!clip) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [clip, onClose]);

  if (!clip) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="arg-modal"
        className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        style={{ background: '#000' }}
        onClick={onClose}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '24px', right: '24px',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.65rem', color: '#7a7060',
            background: 'none', border: 'none', cursor: 'pointer',
            letterSpacing: '0.1em', zIndex: 10,
          }}
        >
          ✕ CLOSE
        </button>

        <motion.div
          className="w-full max-w-lg px-8 py-16 flex flex-col gap-10"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '8px' }}>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.58rem', color: '#6a6258',
              letterSpacing: '0.14em', marginBottom: '10px',
            }}>
              CLIP 016 — {clip.date}
            </p>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '2rem', fontWeight: 400,
              color: '#7a7268', letterSpacing: '0.05em',
            }}>
              [THE ARGUMENT]
            </h2>
          </div>

          {/* Fragments */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', textAlign: 'center' }}>
            {fragments.map((frag, i) => (
              <motion.p
                key={i}
                style={{
                  fontFamily: frag.dim
                    ? "'JetBrains Mono', monospace"
                    : "'Cormorant Garamond', Georgia, serif",
                  fontSize: frag.dim ? '0.78rem' : '1.25rem',
                  fontStyle: frag.dim ? 'normal' : 'italic',
                  color: frag.dim ? '#6a6258' : '#c8c0b0',
                  letterSpacing: frag.dim ? '0.12em' : '0',
                  lineHeight: 1.5,
                  margin: 0,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.4, delay: frag.delay }}
              >
                {frag.text}
              </motion.p>
            ))}
          </div>

          {/* Notes — appear after fragments */}
          <motion.div
            style={{ marginTop: '16px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 7 }}
          >
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.5rem', color: '#4a4238',
              letterSpacing: '0.14em', marginBottom: '8px',
            }}>
              TECHNICAL NOTE
            </div>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.68rem', color: '#8a8070',
              lineHeight: 1.78, letterSpacing: '0.03em', margin: '0 0 20px 0',
            }}>
              {clip.technicalNote}
            </p>
            {clip.directorNote && (
              <>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.5rem', color: '#4a4238',
                  letterSpacing: '0.14em', marginBottom: '8px',
                }}>
                  DIRECTOR'S NOTE
                </div>
                <p style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: '1rem', fontStyle: 'italic',
                  color: '#9a9080', lineHeight: 1.72, margin: 0,
                }}>
                  {clip.directorNote}
                </p>
              </>
            )}
          </motion.div>

          {/* Bottom metadata */}
          <motion.div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              textAlign: 'center', fontSize: '0.55rem',
              color: '#5a5248', letterSpacing: '0.1em', lineHeight: 2,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 7.5 }}
          >
            <div>{clip.location}</div>
            <div>▪ MIA'S PHONE — 9:16 — CAMERA FACE-DOWN</div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
