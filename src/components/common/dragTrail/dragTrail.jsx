import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import style from './dragTrail.module.css';

const DragTrail = () => {
  const [particles, setParticles] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [currentColor, setCurrentColor] = useState('#306bff');

  const createParticle = useCallback((x, y) => {
    const newParticle = {
      id: Date.now() + Math.random(),
      x: x + (Math.random() - 0.5) * 15,
      y: y + (Math.random() - 0.5) * 15,
      size: Math.random() * 3 + 1.5,
      opacity: 0.6,
    };

    setParticles((prev) => {
      const limited = prev.slice(-7);
      return [...limited, newParticle];
    });
  }, []);

  const throttledDragMove = useCallback(
    (e) => {
      if (!isActive) return;

      if (Math.random() > 0.7) {
        createParticle(e.detail.x, e.detail.y);
      }
    },
    [isActive, createParticle]
  );

  useEffect(() => {
    const handleDragStart = (e) => {
      setIsActive(true);
      setCurrentColor(e.detail?.status || '#306bff');
    };

    const handleDragEnd = () => {
      setIsActive(false);
      setTimeout(() => {
        setParticles([]);
      }, 500);
    };

    const handleColumnEnter = (e) => {
      if (isActive && e.detail?.color) {
        setCurrentColor(e.detail.color);
      }
    };

    window.addEventListener('taskora-drag-start', handleDragStart);
    window.addEventListener('taskora-drag-end', handleDragEnd);
    window.addEventListener('taskora-drag-move', throttledDragMove);
    window.addEventListener('taskora-column-enter', handleColumnEnter);

    return () => {
      window.removeEventListener('taskora-drag-start', handleDragStart);
      window.removeEventListener('taskora-drag-end', handleDragEnd);
      window.removeEventListener('taskora-drag-move', throttledDragMove);
      window.removeEventListener('taskora-column-enter', handleColumnEnter);
    };
  }, [isActive, throttledDragMove]);

  useEffect(() => {
    if (!isActive && particles.length === 0) return;

    const cleanupInterval = setInterval(() => {
      setParticles((prev) => prev.filter((p) => Date.now() - p.id < 600));
    }, 150);

    return () => clearInterval(cleanupInterval);
  }, [isActive, particles.length]);

  if (!isActive && particles.length === 0) return null;

  return createPortal(
    <div className={style.trailContainer}>
      <AnimatePresence mode='popLayout'>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className={style.particle}
            initial={{
              x: particle.x,
              y: particle.y,
              scale: 1,
              opacity: particle.opacity,
            }}
            animate={{
              scale: 0,
              opacity: 0,
            }}
            exit={{
              scale: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.6,
              ease: 'easeOut',
            }}
            style={{
              width: particle.size,
              height: particle.size,
              backgroundColor: currentColor,
              boxShadow: `0 0 ${particle.size * 1.5}px ${currentColor}44`,
            }}
          />
        ))}
      </AnimatePresence>
    </div>,
    document.body
  );
};

export default DragTrail;
