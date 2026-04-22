'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const stages = [
  {
    label: 'COMPACT CAMERA',
    act: 'ACT I',
    period: 'Sept — Nov 2023',
    accent: '#c9a97a',
    traits: [
      'Mia\'s dedicated compact camera — she chooses to bring it',
      '16:9 landscape format',
      'Optical zoom (smooth, deliberate)',
      'Natural grain in low light',
      'Warm color rendering, soft vignetting',
    ],
    note: 'She chose this camera. That means she chose when to take it out, when to leave it home, and when to pick it up mid-moment.',
  },
  {
    label: 'MIXED FORMAT',
    act: 'ACT II',
    period: 'Nov 2023 — Mar 2024',
    accent: '#a08c6e',
    traits: [
      'Both devices present, no explanation given',
      'Phone clips begin appearing (9:16 portrait)',
      'Compact camera disappears quietly mid-act',
      'HDR auto-exposure on phone clips',
    ],
    note: 'She starts reaching for her phone instead. The compact camera goes away without announcement — the film never names the moment it stops appearing.',
  },
  {
    label: 'PHONE ONLY',
    act: 'ACT III',
    period: 'Mar — Apr 2024',
    accent: '#6b8fa8',
    traits: [
      'All footage from phones',
      '9:16 portrait only',
      'Digital zoom (degrades the image)',
      'Flat shadows, over-sharpened midtones',
      'Same apartment, same light — different result',
    ],
    note: 'The compact camera doesn\'t appear. The same locations look different: flatter, more compressed, less considered.',
  },
];

export default function FormatArc() {
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
      >
        <div className="mb-8">
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.65rem', color: '#8a8070',
            letterSpacing: '0.18em', marginBottom: '8px',
          }}>
            FORMAT ANALYSIS — DEVICE ARC
          </p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
            fontWeight: 400, color: '#e8e0d5',
          }}>
            How the Format Changes Across the Film
          </h2>
          <p style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '0.85rem', color: '#9a9080',
            lineHeight: 1.75, maxWidth: '520px', marginTop: '12px',
          }}>
            The shift from compact camera to phone is never announced in the film.
            There is no scene where Mia puts the camera away for the last time.
            The audience is meant to notice something has changed before they can say what it is.
          </p>
        </div>

        {/* Timeline stages */}
        <div className="flex flex-col md:flex-row gap-0 w-full">
          {stages.map((stage, i) => (
            <motion.div
              key={stage.act}
              className="flex-1 relative"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              {i < stages.length - 1 && (
                <div
                  className="hidden md:block absolute right-0 top-1/3 z-10"
                  style={{
                    width: '1px', height: '40px',
                    background: 'rgba(90,82,72,0.25)',
                    transform: 'translateY(-50%)',
                  }}
                />
              )}

              <div style={{
                padding: '24px',
                borderTop: `2px solid ${stage.accent}`,
                borderRight: i < stages.length - 1 ? '1px solid rgba(90,82,72,0.1)' : 'none',
              }}>
                <p style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.72rem', fontWeight: 500, color: '#b0a898',
                  letterSpacing: '0.1em', marginBottom: '6px',
                }}>
                  {stage.act} — {stage.period}
                </p>
                <h3 style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.85rem', fontWeight: 700, color: stage.accent,
                  letterSpacing: '0.1em', marginBottom: '14px',
                }}>
                  {stage.label}
                </h3>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '16px', padding: 0, listStyle: 'none' }}>
                  {stage.traits.map((trait) => (
                    <li key={trait} style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.6rem', color: '#8a8070',
                      letterSpacing: '0.03em', lineHeight: 1.5,
                    }}>
                      — {trait}
                    </li>
                  ))}
                </ul>
                <p style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '0.82rem', color: '#9a9080',
                  lineHeight: 1.65, margin: 0,
                }}>
                  {stage.note}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Theo note */}
        <div style={{
          marginTop: '24px',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.62rem', color: '#8a8070',
          letterSpacing: '0.06em',
          borderLeft: '2px solid rgba(107,143,168,0.3)',
          paddingLeft: '14px',
          lineHeight: 1.8,
        }}>
          NOTE — Theo filmed on his phone throughout the entire film. His footage never looks
          worse than it does in Clip 004. By Act Three, the quality gap between his footage
          and Mia&apos;s has closed — because her footage dropped to meet his, not the other way around.
        </div>
      </motion.div>
    </section>
  );
}
