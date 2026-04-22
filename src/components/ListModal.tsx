'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { listItems } from '@/data/listItems';

interface ListModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ListModal({ open, onClose }: ListModalProps) {
  const [tooltip, setTooltip] = useState<{ num: number; note: string } | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const checkedCount = listItems.filter((i) => i.checked).length;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="list-modal"
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ background: 'rgba(10,9,8,0.96)', backdropFilter: 'blur(10px)' }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-xl my-10 mx-4"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-12 right-8 font-mono-jb"
              style={{ fontSize: '0.7rem', color: '#5a5248', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.1em' }}
            >
              ✕ CLOSE
            </button>

            <div
              style={{
                background: '#0e0c0a',
                border: '1px solid rgba(90,82,72,0.2)',
                borderTop: '2px solid #c9a97a',
                padding: '40px 36px 48px',
              }}
            >
              {/* Header */}
              <div className="mb-8">
                <p
                  className="font-mono-jb mb-2"
                  style={{ fontSize: '0.55rem', color: '#5a5248', letterSpacing: '0.14em' }}
                >
                  DOCUMENT — HANDWRITTEN LIST — FOUND IN APARTMENT
                </p>
                <h2
                  className="font-cormorant"
                  style={{ fontSize: '2rem', fontWeight: 400, color: '#e8e0d5', lineHeight: 1.2 }}
                >
                  99 Things Before We Figure It Out
                </h2>
                <p
                  className="font-mono-jb mt-3"
                  style={{ fontSize: '0.6rem', color: '#5a5248', letterSpacing: '0.08em' }}
                >
                  {checkedCount} OF 99 COMPLETED
                </p>
              </div>

              {/* List */}
              <div className="flex flex-col gap-1">
                {listItems.map((item) => {
                  if (item.obscured) {
                    return (
                      <div
                        key={item.num}
                        className="flex gap-4 items-baseline py-2"
                        style={{ borderBottom: '1px solid rgba(90,82,72,0.08)' }}
                        onMouseEnter={() => setTooltip({ num: item.num, note: 'The paper is creased across this line.' })}
                        onMouseLeave={() => setTooltip(null)}
                      >
                        <span
                          className="font-mono-jb flex-shrink-0"
                          style={{ fontSize: '0.6rem', color: '#3a3530', letterSpacing: '0.06em', width: '28px' }}
                        >
                          {item.num}
                        </span>
                        <span
                          className="font-inter"
                          style={{ fontSize: '0.82rem', color: '#3a3530', lineHeight: 1.5, cursor: 'help' }}
                        >
                          {item.text}
                        </span>
                        {tooltip?.num === item.num && (
                          <span
                            className="font-mono-jb"
                            style={{ fontSize: '0.55rem', color: '#5a5248', letterSpacing: '0.06em', marginLeft: 'auto' }}
                          >
                            — {tooltip.note}
                          </span>
                        )}
                      </div>
                    );
                  }

                  if (item.checked) {
                    return (
                      <div
                        key={item.num}
                        className="flex gap-4 items-baseline py-2 relative group cursor-help"
                        style={{ borderBottom: '1px solid rgba(90,82,72,0.08)' }}
                        onMouseEnter={() => item.completedNote && setTooltip({ num: item.num, note: item.completedNote })}
                        onMouseLeave={() => setTooltip(null)}
                      >
                        <span
                          className="font-mono-jb flex-shrink-0"
                          style={{ fontSize: '0.6rem', color: '#5a3020', letterSpacing: '0.06em', width: '28px' }}
                        >
                          {item.num}
                        </span>
                        <span
                          className="font-inter relative"
                          style={{
                            fontSize: '0.82rem',
                            color: '#5a4838',
                            lineHeight: 1.5,
                            textDecoration: 'line-through',
                            textDecorationColor: '#c23b22',
                            textDecorationThickness: '1px',
                          }}
                        >
                          {item.text}
                        </span>
                        {tooltip?.num === item.num && (
                          <span
                            className="font-cormorant"
                            style={{
                              fontSize: '0.78rem',
                              fontStyle: 'italic',
                              color: '#8a7060',
                              letterSpacing: '0',
                              marginLeft: '8px',
                            }}
                          >
                            — {tooltip.note}
                          </span>
                        )}
                      </div>
                    );
                  }

                  return (
                    <div
                      key={item.num}
                      className="flex gap-4 items-baseline py-2"
                      style={{ borderBottom: '1px solid rgba(90,82,72,0.08)' }}
                    >
                      <span
                        className="font-mono-jb flex-shrink-0"
                        style={{ fontSize: '0.6rem', color: '#5a5248', letterSpacing: '0.06em', width: '28px' }}
                      >
                        {item.num}
                      </span>
                      <span
                        className="font-inter"
                        style={{ fontSize: '0.82rem', color: '#c8c0b5', lineHeight: 1.5 }}
                      >
                        {item.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
