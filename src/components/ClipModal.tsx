'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clip, Marker } from '@/lib/types';

interface ClipModalProps {
  clip: Clip | null;
  onClose: () => void;
}

const deviceConfig: Record<string, { label: string; color: string }> = {
  compact:       { label: 'Mia\'s Compact Camera', color: '#c9a97a' },
  'phone-mia':   { label: "Mia's Phone",           color: '#d4c4b0' },
  'phone-theo':  { label: "Theo's Phone",           color: '#8aacbf' },
  'phone-third': { label: 'Third-Party Phone',      color: '#7a7060' },
};

const markerTypeColor: Record<string, string> = {
  format:     '#c9a97a',
  structural: '#6b8fa8',
  sound:      '#a09060',
  character:  '#b0a890',
};

const markerTypeBg: Record<string, string> = {
  format:     'rgba(201,169,122,0.07)',
  structural: 'rgba(107,143,168,0.07)',
  sound:      'rgba(160,144,96,0.07)',
  character:  'rgba(176,168,144,0.06)',
};

const actAccent: Record<number, string> = {
  1: '#c9a97a',
  2: '#a08c6e',
  3: '#6b8fa8',
};

function MarkerBlock({ marker }: { marker: Marker }) {
  return (
    <div style={{
      padding: '10px 14px',
      background: markerTypeBg[marker.type],
      borderLeft: `2px solid ${markerTypeColor[marker.type]}`,
      marginBottom: '8px',
    }}>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.58rem',
        color: markerTypeColor[marker.type],
        letterSpacing: '0.1em',
        marginBottom: '5px',
        fontWeight: 500,
      }}>
        {marker.label}
      </div>
      <p style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        fontSize: '0.78rem',
        color: '#b0a898',
        lineHeight: 1.65,
        margin: 0,
      }}>
        {marker.detail}
      </p>
    </div>
  );
}

export default function ClipModal({ clip, onClose }: ClipModalProps) {
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
  const accent = actAccent[clip.act];
  const device = deviceConfig[clip.device];

  return (
    <AnimatePresence>
      <motion.div
        key={clip.id + '-modal'}
        className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto"
        style={{ background: 'rgba(8,7,6,0.97)', backdropFilter: 'blur(12px)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-2xl mx-4 my-8"
          style={{
            background: '#0e0c0a',
            border: `1px solid rgba(90,82,72,0.2)`,
            borderTop: `2px solid ${accent}`,
          }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 12, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: '16px', right: '16px',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.6rem', color: '#7a7060',
              background: 'none', border: 'none', cursor: 'pointer',
              letterSpacing: '0.1em', zIndex: 10,
            }}
          >
            ✕ CLOSE
          </button>

          <div style={{ padding: '36px 40px 48px' }}>

            {/* ── HEADER ── */}
            <div style={{ marginBottom: '28px' }}>
              {/* Clip ID row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.6rem', color: accent,
                  letterSpacing: '0.14em',
                }}>
                  CLIP {clip.id}
                </span>
                {/* Aspect ratio box */}
                {clip.format === '16:9'
                  ? <div style={{ width: '28px', height: '16px', border: `1px solid ${accent}55` }} />
                  : <div style={{ width: '16px', height: '28px', border: `1px solid ${accent}55` }} />
                }
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.52rem', color: '#7a7060',
                  letterSpacing: '0.08em',
                }}>
                  [{clip.format}]
                </span>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.52rem',
                  letterSpacing: '0.08em',
                  color: ['I','II','III'][clip.act - 1] === 'I' ? '#c9a97a55' : clip.act === 2 ? '#a08c6e55' : '#6b8fa855',
                }}>
                  ACT {['I','II','III'][clip.act - 1]}
                </span>
              </div>

              {/* Title */}
              <h2 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(1.9rem, 4vw, 2.8rem)',
                fontWeight: 400,
                color: '#e8e0d5',
                lineHeight: 1.1,
                margin: '0 0 20px 0',
              }}>
                {clip.title}
              </h2>

              {/* Device + metadata block */}
              <div style={{
                borderLeft: `2px solid ${device.color}33`,
                paddingLeft: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '3px',
              }}>
                {/* Device — large and colored */}
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.72rem',
                  color: device.color,
                  letterSpacing: '0.08em',
                  fontWeight: 500,
                  marginBottom: '4px',
                }}>
                  {clip.device === 'compact' ? '◻' : '▪'} {device.label}
                </div>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.58rem',
                  color: '#8a8070',
                  letterSpacing: '0.07em',
                  lineHeight: 1.8,
                }}>
                  <div>{clip.date}</div>
                  <div>{clip.location}</div>
                </div>
              </div>
            </div>

            {/* ── LIST ITEM ── */}
            {clip.listItem && (
              <div style={{
                marginBottom: '20px',
                padding: '10px 14px',
                background: `${accent}0a`,
                border: `1px solid ${accent}22`,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.62rem',
                color: accent,
                letterSpacing: '0.06em',
                lineHeight: 1.5,
              }}>
                ✓ {clip.listItem}
              </div>
            )}

            {/* ── DESCRIPTION ── */}
            <div style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '0.92rem',
              color: '#ccc4b8',
              lineHeight: 1.82,
              marginBottom: '28px',
            }}>
              {clip.description}
            </div>

            {/* ── MARKERS ── */}
            {clip.markers && clip.markers.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.52rem',
                  color: '#7a7060',
                  letterSpacing: '0.14em',
                  marginBottom: '10px',
                }}>
                  ANNOTATIONS
                </div>
                {clip.markers.map((m, i) => (
                  <MarkerBlock key={i} marker={m} />
                ))}
              </div>
            )}

            {/* ── TECHNICAL NOTE ── */}
            <div style={{
              borderTop: '1px solid rgba(90,82,72,0.12)',
              paddingTop: '20px',
              marginBottom: '18px',
            }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.5rem',
                color: '#8a8070',
                letterSpacing: '0.14em',
                marginBottom: '8px',
              }}>
                TECHNICAL NOTE
              </div>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.68rem',
                color: '#9a9080',
                lineHeight: 1.72,
                margin: 0,
              }}>
                {clip.technicalNote}
              </p>
            </div>

            {/* ── DIRECTOR'S NOTE ── */}
            {clip.directorNote && (
              <div style={{
                borderLeft: '2px solid rgba(90,82,72,0.2)',
                paddingLeft: '16px',
                marginLeft: '6px',
              }}>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.5rem',
                  color: '#8a8070',
                  letterSpacing: '0.14em',
                  marginBottom: '8px',
                }}>
                  DIRECTOR'S NOTE
                </div>
                <p style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: '0.98rem',
                  fontStyle: 'italic',
                  color: '#8a8070',
                  lineHeight: 1.72,
                  margin: 0,
                }}>
                  {clip.directorNote}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
