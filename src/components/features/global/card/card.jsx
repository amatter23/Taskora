/**
 * A versatile card component that displays either project or task information
 * @component
 * @param {Object} props - Component props
 * @param {'project'|'task'} props.type - Determines whether the card displays project or task information
 * @param {string} props.uuid - Unique identifier for the project or task
 * - Title section with name and description
 * - Footer section with:
 *   - For projects: task count
 *   - For tasks: tag (if exists) and project name
 *   - Due date for both types
 *
 * @example
 * // Project card
 * <Card type="project" uuid="project-123" />
 *
 * // Task card
 * <Card type="task" uuid="task-456" />
 *
 * @description
 * The card is clickable and will open a modal with detailed view of the project/task.
 * It uses Redux store to fetch data based on the UUID and type.
 * Styling is handled through CSS modules (style object).
 */
import style from './card.module.css';
import { motion } from 'framer-motion';
import { MdOutlineTaskAlt, MdDateRange } from 'react-icons/md';
import { FaProjectDiagram } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { selectProjectWithUuid } from '../../../../store/selectors/projects/projectwithUuidSelector';
import { selectTaskWithUuid } from '../../../../store/selectors/tasks/taskwithUuidSelector';
import useDeadlineRemaining from '../../../../hooks/useDeadlineRemaining';
import View from '../view/view/view';
import useModalVisibility from '../../../../hooks/useModalVisibility';
import useModalComponent from '../../../../hooks/useModalComponent';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const Card = ({ type, uuid }) => {
  const toggleVisibility = useModalVisibility();
  const setComponent = useModalComponent();

  const [isDraggingLocal, setIsDraggingLocal] = useState(false);
  const [sourceColor, setSourceColor] = useState(null);
  const [targetColor, setTargetColor] = useState(null);
  const [isNearDropZone, setIsNearDropZone] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const data =
    useSelector((state) => {
      if (type === 'task') {
        return selectTaskWithUuid(state, uuid);
      }
      return selectProjectWithUuid(state, uuid);
    }) || {};
  const handleClick = () => {
    setComponent(<View uuid={uuid} type={type} />);
    toggleVisibility();
  };

  const handleDragStart = (e) => {
    const sourceStatusColor =
      data?.status?.color || data?.color || data?.project?.color || '#888';
    e.dataTransfer.setData(
      'application/json',
      JSON.stringify({ uuid, type, sourceStatusColor })
    );
    e.dataTransfer.effectAllowed = 'move';
    try {
      window.dispatchEvent(
        new CustomEvent('taskora-drag-start', {
          detail: {
            uuid,
            type,
            sourceStatusColor,
            title: data.name,
          },
        })
      );
    } catch (err) {
      console.debug('drag-start event dispatch failed', err);
    }
    setIsDraggingLocal(true);
    setSourceColor(sourceStatusColor);
  };

  const handleDrag = (e) => {
    try {
      window.dispatchEvent(
        new CustomEvent('taskora-drag-move', {
          detail: { x: e.clientX, y: e.clientY },
        })
      );
    } catch (err) {
      console.debug('drag-move event dispatch failed', err);
    }
  };

  const handleDragEnd = () => {
    try {
      window.dispatchEvent(new CustomEvent('taskora-drag-end'));
    } catch (err) {
      console.debug('drag-end event dispatch failed', err);
    }
    setIsDraggingLocal(false);
    setTargetColor(null);
    setIsNearDropZone(false);
    setShowCelebration(false);
  };

  useEffect(() => {
    const onColumnEnter = (e) => {
      if (!isDraggingLocal) return;
      const color = e.detail?.color || null;
      setTargetColor(color);
      setIsNearDropZone(true);
    };
    const onColumnLeave = () => {
      if (!isDraggingLocal) return;
      setTargetColor(null);
      setIsNearDropZone(false);
    };
    const onDrop = (e) => {
      if (!isDraggingLocal) return;
      const d = e.detail || {};
      const to = d?.to || null;
      setShowCelebration(true);
      setTargetColor(to);
      setTimeout(() => {
        setIsDraggingLocal(false);
        setTargetColor(null);
        setIsNearDropZone(false);
        setShowCelebration(false);
      }, 300);
    };

    window.addEventListener('taskora-column-enter', onColumnEnter);
    window.addEventListener('taskora-column-leave', onColumnLeave);
    window.addEventListener('taskora-drop', onDrop);
    return () => {
      window.removeEventListener('taskora-column-enter', onColumnEnter);
      window.removeEventListener('taskora-column-leave', onColumnLeave);
      window.removeEventListener('taskora-drop', onDrop);
    };
  }, [isDraggingLocal]);

  return (
    <motion.section
      onClick={handleClick}
      className={style.card}
      draggable={true}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      initial={{ opacity: 0, y: 8 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: isDraggingLocal ? (isNearDropZone ? 1.02 : 1.01) : 1,
        rotate: isDraggingLocal ? (isNearDropZone ? [0, 1, -1, 0] : 0) : 0,
        boxShadow: isDraggingLocal
          ? isNearDropZone
            ? `0 8px 32px rgba(0, 0, 0, 0.12), 0 0 0 2px ${
                targetColor || sourceColor || 'var(--primary-color)'
              }66, 0 0 20px ${
                targetColor || sourceColor || 'var(--primary-color)'
              }33`
            : `0 4px 20px rgba(0, 0, 0, 0.08), 0 0 0 1px ${
                sourceColor || 'var(--primary-color)'
              }44`
          : 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.123) 0px 0px 0px 1px',
        borderColor: showCelebration
          ? [sourceColor, targetColor, targetColor, sourceColor]
          : isDraggingLocal
          ? targetColor || sourceColor || 'var(--primary-color)'
          : 'var(--border-color)',
        backgroundColor:
          isDraggingLocal && targetColor
            ? `linear-gradient(135deg, ${
                sourceColor || 'var(--primary-color)'
              }, ${targetColor})`
            : 'var(--background-color)',
        filter: isDraggingLocal
          ? isNearDropZone
            ? 'brightness(1.05) saturate(1.1)'
            : 'brightness(1.02)'
          : 'brightness(1)',
      }}
      exit={{ opacity: 0, y: 4 }}
      whileHover={{
        scale: isDraggingLocal ? (isNearDropZone ? 1.02 : 1.01) : 1.005,
        y: isDraggingLocal ? 0 : -1,
        rotate: isDraggingLocal ? 0 : [0, 0.5, -0.5, 0],
        boxShadow: isDraggingLocal
          ? isNearDropZone
            ? `0 8px 32px rgba(0, 0, 0, 0.12), 0 0 0 2px ${
                targetColor || sourceColor || 'var(--primary-color)'
              }66, 0 0 20px ${
                targetColor || sourceColor || 'var(--primary-color)'
              }33`
            : `0 4px 20px rgba(0, 0, 0, 0.08), 0 0 0 1px ${
                sourceColor || 'var(--primary-color)'
              }44`
          : 'rgba(0, 0, 0, 0.04) 0px 2px 6px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
      }}
      whileTap={{ scale: 0.995 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 30,
        backgroundColor: { duration: 0.2, ease: 'easeInOut' },
        borderColor: showCelebration
          ? {
              duration: 0.6,
              ease: 'easeInOut',
              repeat: 1,
              repeatType: 'reverse',
            }
          : { duration: 0.15, ease: 'easeOut' },
        rotate: { duration: 0.3, ease: 'easeOut' },
        filter: { duration: 0.2, ease: 'easeInOut' },
        boxShadow: { duration: 0.25, ease: 'easeOut' },
      }}
      layout
    >
      <main className={style.title}>
        <div className={style.name}>
          <h2>{data.name}</h2>
          {type === 'project' ? (
            <div
              className={style.color}
              style={{ backgroundColor: data.color }}
            ></div>
          ) : null}
        </div>
        <h5>
          {data.description
            ? data.description
            : `There is no description for this ${type}`}
        </h5>
      </main>
      <footer className={style.footer}>
        {type === 'project' ? (
          <div className={style.tasksCount}>
            <MdOutlineTaskAlt />
            <h6>
              {data?.tasks?.length} task{data?.tasks?.length === 1 ? '' : 's'}
            </h6>
          </div>
        ) : (
          <>
            {data.tag === undefined ? null : (
              <div
                style={{ backgroundColor: '#007bff' + '50' }}
                className={style.tag}
              >
                <h5>{data?.tag.name}</h5>
              </div>
            )}
            <div
              style={{ color: data.project?.color }}
              className={style.projectName}
            >
              <FaProjectDiagram />
              <h4>{data?.project?.name}</h4>
            </div>
          </>
        )}

        <div className={style.dueDate}>
          <MdDateRange />
          <h4>{useDeadlineRemaining(data.dueDate)}</h4>
        </div>
      </footer>
    </motion.section>
  );
};

export default Card;

Card.propTypes = {
  type: PropTypes.oneOf(['project', 'task']).isRequired,
  uuid: PropTypes.string.isRequired,
};
