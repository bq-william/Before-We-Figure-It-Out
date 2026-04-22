'use client';

import { motion } from 'framer-motion';

export default function Landing() {
  return (
    <section
      id="landing"
      className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center overflow-hidden"
      style={{ background: '#0a0908' }}
    >
      {/* Subtle vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.6) 100%)',
        }}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center gap-6 max-w-2xl"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Archive label */}
        <motion.p
          className="font-mono-jb text-xs tracking-widest uppercase"
          style={{ color: '#8a8070', letterSpacing: '0.18em' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          ARCHIVE — RECOVERED FILES
        </motion.p>

        {/* Title */}
        <motion.h1
          className="font-cormorant"
          style={{
            fontSize: 'clamp(2.4rem, 6vw, 5rem)',
            fontWeight: 300,
            lineHeight: 1.1,
            color: '#e8e0d5',
            letterSpacing: '-0.01em',
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          Before We Figure It Out
        </motion.h1>

        {/* Divider */}
        <motion.div
          style={{ width: '2px', height: '32px', background: '#8a8070', margin: '4px 0' }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        />

        {/* Subtitle */}
        <motion.p
          className="font-cormorant"
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            fontStyle: 'italic',
            fontWeight: 300,
            color: '#8a7e72',
            maxWidth: '480px',
            lineHeight: 1.6,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.1 }}
        >
          The following videos were recovered from a phone left at 14 Ashford Place,
          Apartment 3B.
        </motion.p>

        {/* Sub-subtitle */}
        <motion.p
          className="font-mono-jb"
          style={{
            fontSize: '0.65rem',
            color: '#8a8070',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.5 }}
        >
          No further context. No names. No dates.
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <span
          className="font-mono-jb"
          style={{ fontSize: '0.6rem', color: '#8a8070', letterSpacing: '0.14em' }}
        >
          SCROLL
        </span>
        <motion.div
          style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, #5a5248, transparent)',
          }}
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
