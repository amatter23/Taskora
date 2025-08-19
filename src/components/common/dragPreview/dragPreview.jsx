import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import style from './dragPreview.module.css';

const DragPreview = () => {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [meta, setMeta] = useState({ title: '', sourceStatusColor: '#888' });
  const [targetColor, setTargetColor] = useState(null);

  useEffect(() => {
    const onStart = e => {
      const d = e.detail || {};
      setMeta({ title: d.title || '', sourceStatusColor: d.sourceStatusColor || '#888' });
      setVisible(true);
    };
    const onMove = e => {
      const d = e.detail || {};
      setPos({ x: d.x || 0, y: d.y || 0 });
    };
    const onEnd = () => {
      setVisible(false);
      setTargetColor(null);
    };
    const onColumnEnter = e => {
      setTargetColor(e.detail?.color || null);
    };
    const onColumnLeave = () => setTargetColor(null);
    const onDrop = e => {
      const d = e.detail || {};
      setPos({ x: d.x || 0, y: d.y || 0 });
      setTargetColor(d?.to || null);
      setTimeout(() => {
        setVisible(false);
        setTargetColor(null);
      }, 300);
    };

    window.addEventListener('taskora-drag-start', onStart);
    window.addEventListener('taskora-drag-move', onMove);
    window.addEventListener('taskora-drag-end', onEnd);
    window.addEventListener('taskora-column-enter', onColumnEnter);
    window.addEventListener('taskora-column-leave', onColumnLeave);
  window.addEventListener('taskora-drop', onDrop);

    return () => {
      window.removeEventListener('taskora-drag-start', onStart);
      window.removeEventListener('taskora-drag-move', onMove);
      window.removeEventListener('taskora-drag-end', onEnd);
      window.removeEventListener('taskora-column-enter', onColumnEnter);
      window.removeEventListener('taskora-column-leave', onColumnLeave);
    window.removeEventListener('taskora-drop', onDrop);
    };
  }, []);

  const previewStyle = {
    borderColor: targetColor || meta.sourceStatusColor || 'var(--border-color)',
    boxShadow: `rgba(0, 0, 0, 0.1) 0px 4px 16px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, 0 0 0 1px ${(targetColor || meta.sourceStatusColor || 'var(--primary-color)')}44`,
  };

  return createPortal(
    <AnimatePresence>
      {visible ? (
        <motion.div
          className={style.preview}
          initial={{ opacity: 0, scale: 0.95, x: pos.x + 12, y: pos.y + 12 }}
          animate={{
            opacity: 1,
            scale: 1,
            x: pos.x + 12,
            y: pos.y + 12,
            borderColor: targetColor || meta.sourceStatusColor || 'var(--border-color)',
          }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ 
            type: 'spring', 
            stiffness: 400, 
            damping: 32,
            borderColor: { duration: 0.15, ease: "easeOut" }
          }}
          style={previewStyle}
        >
          <div className={style.title}>{meta.title}</div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
};

export default DragPreview;
