'use client';

import { motion } from 'framer-motion';
import { Clip } from '@/lib/types';
import { cardGradients } from '@/data/clips';

interface ClipCardProps {
  clip: Clip;
  onClick: () => void;
}

const deviceConfig: Record<string, { label: string; color: string; symbol: string }> = {
  compact:      { label: 'COMPACT CAMERA', color: '#c9a97a', symbol: '◻' },
  'phone-mia':  { label: "MIA'S PHONE",    color: '#d4c4b0', symbol: '▪' },
  'phone-theo': { label: "THEO'S PHONE",   color: '#8aacbf', symbol: '▪' },
  'phone-third':{ label: 'THIRD PARTY',    color: '#7a7060', symbol: '▪' },
};

const actBorderColor: Record<number, string> = {
  1: '#c9a97a',
  2: 'rgba(160,140,110,0.25)',
  3: '#6b8fa8',
};

export default function ClipCard({ clip, onClick }: ClipCardProps) {
  const gradient = cardGradients[clip.id] ?? '#0c0a08';
  const device = deviceConfig[clip.device];
  const borderColor = actBorderColor[clip.act];
  const hasWarningMarker = clip.markers?.some(m => m.label.startsWith('⚠'));

  return (
    <motion.button
      onClick={onClick}
      className="relative text-left overflow-hidden w-full group"
      style={{
        background: '#111009',
        border: `1px solid rgba(90,82,72,0.18)`,
        borderLeft: `3px solid ${borderColor}`,
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
      }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.18 }}
    >
      {/* Gradient visual strip — decorative only, no text here */}
      <div
        style={{
          height: '72px',
          background: gradient,
          position: 'relative',
          flexShrink: 0,
        }}
      >
        {/* Fade to dark at bottom of strip */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '40px',
          background: 'linear-gradient(to bottom, transparent, #111009)',
        }} />

        {/* Clip number — top left of gradient strip */}
        <div style={{ position: 'absolute', top: '8px', left: '10px' }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.6rem',
            color: 'rgba(232,224,213,0.5)',
            letterSpacing: '0.1em',
          }}>
            {clip.id}
          </span>
        </div>

        {/* Format badge — top right of gradient strip */}
        <div style={{ position: 'absolute', top: '8px', right: '8px' }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.5rem',
            color: 'rgba(232,224,213,0.4)',
            border: '1px solid rgba(232,224,213,0.15)',
            padding: '1px 5px',
            letterSpacing: '0.06em',
          }}>
            {clip.format}
          </span>
        </div>

        {/* Warning marker dot */}
        {hasWarningMarker && (
          <div style={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#c9a97a',
            opacity: 0.8,
          }} />
        )}
      </div>

      {/* Text section — always solid dark background */}
      <div style={{
        padding: '10px 12px 14px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        background: '#111009',
      }}>
        {/* Device label — prominent, colored */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.5rem',
            color: device.color,
            letterSpacing: '0.1em',
            fontWeight: 500,
          }}>
            {device.symbol} {device.label}
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 'clamp(0.95rem, 2.2vw, 1.2rem)',
          fontWeight: 400,
          color: '#e8e0d5',
          lineHeight: 1.2,
          margin: 0,
        }}>
          {clip.title}
        </h3>

        {/* Date + Location */}
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.5rem',
          color: '#5a5248',
          letterSpacing: '0.07em',
          lineHeight: 1.6,
        }}>
          <div>{clip.date}</div>
          <div style={{ color: '#6a6258' }}>{clip.location}</div>
        </div>

        {/* Markers — shown as small tags */}
        {clip.markers && clip.markers.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '2px' }}>
            {clip.markers.map((m, i) => (
              <span key={i} style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.42rem',
                letterSpacing: '0.06em',
                padding: '1px 5px',
                background: m.type === 'format'
                  ? 'rgba(201,169,122,0.08)'
                  : m.type === 'structural'
                  ? 'rgba(107,143,168,0.08)'
                  : m.type === 'sound'
                  ? 'rgba(160,130,100,0.08)'
                  : 'rgba(150,130,110,0.06)',
                color: m.type === 'format'
                  ? '#a08060'
                  : m.type === 'structural'
                  ? '#5a7a90'
                  : m.type === 'sound'
                  ? '#8a7050'
                  : '#6a6050',
                border: '1px solid rgba(90,82,72,0.15)',
              }}>
                {m.label}
              </span>
            ))}
          </div>
        )}

        {/* Bottom badges */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '2px' }}>
          {clip.listItem && (
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.42rem',
              color: clip.act === 3 ? '#6b8fa8' : '#b09060',
              letterSpacing: '0.06em',
            }}>
              ✓ LIST ITEM
            </span>
          )}
          {clip.special === 'argument' && (
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.42rem',
              color: '#5a5248',
              letterSpacing: '0.06em',
            }}>
              ▓ BLACKOUT
            </span>
          )}
          {clip.special === 'mirror' && (
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.42rem',
              color: '#c9a97a',
              letterSpacing: '0.06em',
            }}>
              ◈ MIRROR
            </span>
          )}
          {clip.special === 'screenshot' && (
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.42rem',
              color: '#5a5248',
              letterSpacing: '0.06em',
            }}>
              □ STILL
            </span>
          )}
        </div>
      </div>

      {/* Hover highlight */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200"
        style={{ background: 'rgba(255,255,255,0.015)' }}
      />
    </motion.button>
  );
}
