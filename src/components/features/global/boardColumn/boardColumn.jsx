import style from './boardColumn.module.css';
import Card from '../card/card';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { selectStatusWithUuid } from '../../../../store/selectors/statuses/statusWithUuidSelector';
import { selectProjectsWithStatues } from '../../../../store/selectors/projects/projectsWithStatuesSelector';
import { selectTasksWithStatues } from '../../../../store/selectors/tasks/tasksWithStatuesSelector';
import useHandleNames from '../../../../hooks/useHandleNames';
import useContentUpdate from '../../../../hooks/useContentUpdate';
import { tasksApi } from '../../../../store/services/tasksApi';
import { projectsApi } from '../../../../store/services/projectsApi';
import useSearch from '../../../../hooks/useSearch';
import { useEffect, useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';

const BoardColumn = ({ statusUuid, nameSearch, search, checkIfDataExist }) => {
  const status = useSelector((state) =>
    selectStatusWithUuid(state, statusUuid)
  );
  const type = useSelector((state) => state.typeView.typeView);
  const data = useSelector((state) =>
    type === 'project'
      ? selectProjectsWithStatues(state, statusUuid)
      : selectTasksWithStatues(state, statusUuid)
  );
  const handleNames = useHandleNames();
  const { handleUpdate } = useContentUpdate(type);

  const [isDragOver, setIsDragOver] = useState(false);
  const [dropAnim, setDropAnim] = useState(null);
  const [dragEnterCount, setDragEnterCount] = useState(0);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragEnterCount((prev) => prev + 1);
    if (!isDragOver) {
      setIsDragOver(true);
      try {
        window.dispatchEvent(
          new CustomEvent('taskora-column-enter', {
            detail: { statusUuid, color: status?.color },
          })
        );
      } catch (err) {
        console.debug('column-enter dispatch failed', err);
      }
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragEnterCount((prev) => {
      const newCount = prev - 1;
      if (newCount <= 0) {
        setIsDragOver(false);
        try {
          window.dispatchEvent(
            new CustomEvent('taskora-column-leave', { detail: { statusUuid } })
          );
        } catch (err) {
          console.debug('column-leave dispatch failed', err);
        }
        return 0;
      }
      return newCount;
    });
  };

  const handleDrop = useCallback(
    async (e) => {
      e.preventDefault();
      setIsDragOver(false);
      setDragEnterCount(0);
      let patchUndo;
      try {
        const raw = e.dataTransfer.getData('application/json');
        if (!raw) return;
        const {
          uuid: draggedUuid,
          type: draggedType,
          sourceStatusColor,
        } = JSON.parse(raw);
        if (draggedType !== type) return;

        if (type === 'task') {
          patchUndo = tasksApi.util.updateQueryData(
            'getTasks',
            undefined,
            (draft) => {
              const index = draft.data.findIndex((t) => t.uuid === draggedUuid);
              if (index !== -1) draft.data[index].statusUuid = statusUuid;
            }
          );
        } else {
          patchUndo = projectsApi.util.updateQueryData(
            'getProjects',
            undefined,
            (draft) => {
              const index = draft.data.findIndex((p) => p.uuid === draggedUuid);
              if (index !== -1) draft.data[index].statusUuid = statusUuid;
            }
          );
        }

        setDropAnim({
          from: sourceStatusColor || '#888',
          to: status?.color || '#000',
        });
        await handleUpdate(draggedUuid, 'statusUuid', statusUuid);
        setTimeout(() => setDropAnim(null), 350);

        try {
          const rect = e.currentTarget.getBoundingClientRect();
          const targetX = rect.left + rect.width / 2;
          const targetY = rect.top + 24;
          window.dispatchEvent(
            new CustomEvent('taskora-drop', {
              detail: {
                x: targetX,
                y: targetY,
                from: sourceStatusColor || '#888',
                to: status?.color || '#000',
              },
            })
          );
        } catch (err) {
          console.debug('taskora-drop dispatch failed', err);
        }
      } catch (err) {
        console.error('Drop handler error:', err);
        if (patchUndo) patchUndo();
      }
    },
    [handleUpdate, statusUuid, type, status?.color]
  );

  const hexToRgb = (hex) => {
    if (!hex) return '48, 107, 255';
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
          result[3],
          16
        )}`
      : '48, 107, 255';
  };

  const nameFiltered = useSearch({ list: data, from: 'name', to: nameSearch });
  const dataFilter = useSearch({
    list: nameFiltered,
    from: 'dueDate',
    to: { date: search?.date },
  });
  useEffect(() => {
    if (typeof checkIfDataExist === 'function') {
      checkIfDataExist(dataFilter);
    }
  }, [search, dataFilter, checkIfDataExist]);

  useEffect(() => {
    const handleGlobalDragEnd = () => {
      setIsDragOver(false);
      setDragEnterCount(0);
    };

    window.addEventListener('taskora-drag-end', handleGlobalDragEnd);
    return () => {
      window.removeEventListener('taskora-drag-end', handleGlobalDragEnd);
    };
  }, []);

  return (
    <motion.main
      className={`${style.column} ${isDragOver ? style.dragOver : ''}`}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        '--status-glow-color': status?.color || 'var(--primary-color)',
        '--status-glow-rgb': hexToRgb(status?.color),
      }}
      animate={{
        borderColor: isDragOver
          ? status?.color || 'var(--primary-color)'
          : 'transparent',
      }}
      transition={{
        duration: 0.2,
        ease: 'easeOut',
      }}
    >
      <header className={style.header}>
        <div className={style.title}>
          <h2>{handleNames(status?.name)}</h2>
          <div className={style.count}>
            <div>{dataFilter.length}</div>
            <div>
              {type}
              {dataFilter.length === 1 ? '' : 's'}
            </div>
          </div>
        </div>
        <div
          style={{ backgroundColor: status?.color }}
          className={style.color}
        ></div>
      </header>
      <div className={style.cardsContainer}>
        <AnimatePresence>
          {dropAnim ? (
            <motion.div
              key='dropAnim'
              className={style.dropBar}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              exit={{ opacity: 0, scaleX: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              style={{
                background: `linear-gradient(90deg, ${dropAnim.from}, ${dropAnim.to})`,
              }}
            />
          ) : null}
        </AnimatePresence>
        {dataFilter.length === 0 ? (
          <div className={style.emptyColumn}>
            <h4>No {type}s</h4>
          </div>
        ) : (
          dataFilter.map((project) => (
            <Card key={project.uuid} type={type} uuid={project.uuid}></Card>
          ))
        )}
      </div>
    </motion.main>
  );
};

export default BoardColumn;

import PropTypes from 'prop-types';

BoardColumn.propTypes = {
  statusUuid: PropTypes.string.isRequired,
  nameSearch: PropTypes.string,
  search: PropTypes.object,
  checkIfDataExist: PropTypes.func,
};
