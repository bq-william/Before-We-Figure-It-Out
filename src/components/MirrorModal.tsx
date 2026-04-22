'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clip } from '@/lib/types';

interface MirrorModalProps {
  clip027: Clip;
  clip001: Clip;
  onClose: () => void;
}

export default function MirrorModal({ clip027, clip001, onClose }: MirrorModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        key="mirror-modal"
        className="fixed inset-0 z-50 flex flex-col overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        style={{ background: 'rgba(8,7,6,0.97)', backdropFilter: 'blur(12px)' }}
        onClick={onClose}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 font-mono-jb z-10"
          style={{ fontSize: '0.7rem', color: '#8a8070', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.1em' }}
        >
          ✕ CLOSE
        </button>

        <motion.div
          className="flex flex-col items-center justify-start py-10 px-4 w-full"
          onClick={(e) => e.stopPropagation()}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Caption */}
          <div className="text-center mb-8">
            <p
              className="font-mono-jb mb-2"
              style={{ fontSize: '0.55rem', color: '#8a8070', letterSpacing: '0.12em' }}
            >
              CLIP 027 — MIRROR SEQUENCE
            </p>
            <p
              className="font-cormorant"
              style={{ fontSize: '1.1rem', fontStyle: 'italic', color: '#8a7e72' }}
            >
              Same afternoon. Different camera. Different person watching.
            </p>
          </div>

          {/* Split view */}
          <div className="flex flex-col md:flex-row gap-0 w-full max-w-5xl">
            {/* Left: Clip 001 */}
            <div
              className="flex-1 p-6 md:p-8"
              style={{
                background: 'radial-gradient(ellipse at 38% 55%, #3d1c08, #0c0604 70%)',
                borderTop: '2px solid #c9a97a',
              }}
            >
              <div
                className="font-mono-jb mb-3"
                style={{ fontSize: '0.55rem', color: '#c9a97a', letterSpacing: '0.12em' }}
              >
                CLIP 001 — MIA'S CAMERA — [16:9] — COMPACT CAMERA
              </div>
              <h3
                className="font-cormorant mb-4"
                style={{ fontSize: '1.5rem', fontWeight: 400, color: '#e8e0d5' }}
              >
                The Busker
              </h3>
              <p
                className="font-inter mb-4"
                style={{ fontSize: '0.8rem', color: '#a89880', lineHeight: 1.7 }}
              >
                <em>
                  &quot;A pair of hands enter the foreground holding a paper coffee cup directly
                  in front of the lens...&quot;
                </em>
              </p>
              <p
                className="font-inter"
                style={{ fontSize: '0.8rem', color: '#8a7e72', lineHeight: 1.7 }}
              >
                {clip001.description}
              </p>
              <div
                className="mt-6 font-mono-jb"
                style={{ fontSize: '0.6rem', color: '#8a8070', lineHeight: 1.7 }}
              >
                {clip001.technicalNote}
              </div>
            </div>

            {/* Divider */}
            <div
              style={{
                width: '1px',
                background: 'linear-gradient(to bottom, transparent, #5a5248 30%, #5a5248 70%, transparent)',
                flexShrink: 0,
              }}
            />

            {/* Right: Clip 027 */}
            <div
              className="flex-1 p-6 md:p-8"
              style={{
                background: 'radial-gradient(ellipse at 68% 52%, #3e2012, #100a06 70%)',
                borderTop: '2px solid #a08c6e',
              }}
            >
              <div
                className="font-mono-jb mb-3"
                style={{ fontSize: '0.55rem', color: '#a08c6e', letterSpacing: '0.12em' }}
              >
                CLIP 027 — THEO'S PHONE — [9:16] — FILED OUT OF ORDER
              </div>
              <h3
                className="font-cormorant mb-4"
                style={{ fontSize: '1.5rem', fontWeight: 400, color: '#e8e0d5' }}
              >
                ★ The Reveal
              </h3>
              <p
                className="font-inter mb-4"
                style={{ fontSize: '0.8rem', color: '#a89880', lineHeight: 1.7 }}
              >
                <em>
                  &quot;In this version, Mia is visible — full profile, mid-left of frame. She is
                  watching the musician. She has no idea the camera is on her...&quot;
                </em>
              </p>
              <p
                className="font-inter"
                style={{ fontSize: '0.8rem', color: '#8a7e72', lineHeight: 1.7 }}
              >
                {clip027.description}
              </p>
              <div
                className="mt-6 font-mono-jb"
                style={{ fontSize: '0.6rem', color: '#8a8070', lineHeight: 1.7 }}
              >
                {clip027.technicalNote}
              </div>
              {clip027.directorNote && (
                <div
                  className="mt-4 font-cormorant"
                  style={{
                    fontSize: '0.85rem',
                    fontStyle: 'italic',
                    color: '#8a8070',
                    lineHeight: 1.7,
                    borderLeft: '1px solid rgba(90,82,72,0.3)',
                    paddingLeft: '12px',
                  }}
                >
                  {clip027.directorNote}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
