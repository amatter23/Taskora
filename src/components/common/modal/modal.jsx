import { useState, useRef } from 'react';
import style from './modal.module.css';
import { useSelector } from 'react-redux';
import { RiArrowDownDoubleLine } from 'react-icons/ri';
import { MdOutlineZoomOutMap, MdZoomInMap } from 'react-icons/md';
import useModalVisibility from '../../../hooks/useModalVisibility';
import useModalComponent from '../../../hooks/useModalComponent';
import useModalTitle from '../../../hooks/useModalTitle';
import useModalFullScreen from '../../../hooks/useModalFullScreen';
import Button from '../button/button';
import { AnimatePresence, motion } from 'framer-motion';
const Modal = () => {
  const modalRef = useRef(null);
  const isVisible = useSelector(state => state.modal.visibility);
  const title = useSelector(state => state.modal.title);
  const Component = useSelector(state => state.modalComponent);
  const disable = useSelector(state => state.modal.fullScreen);
  const toggleVisibility = useModalVisibility();
  const setComponent = useModalComponent();
  const setTitle = useModalTitle();
  const setDisable = useModalFullScreen();
  const [isFullScreen, setFullScreen] = useState(false);
  const handelClose = () => {
    toggleVisibility();
    setComponent(null);
    setFullScreen(false);
    setTitle('');
    setDisable(false);
  };

  const modalVariants = {
    initial: {
      y: '100%',
      height: 'auto',
      maxHeight: '80%',
    },
    animate: {
      y: 0,
      height: isFullScreen ? '80%' : 'auto',
      maxHeight: isFullScreen ? '80%' : 'auto',
      transition: {
        y: {
          type: 'spring',
          bounce: 0.4,
          duration: 0.8,
        },
        height: {
          type: 'spring',
          bounce: 0.2,
          duration: 0.5,
        },
        maxHeight: {
          type: 'spring',
          bounce: 0.2,
          duration: 0.5,
        },
      },
    },
    exit: {
      y: '100%',
      transition: {
        type: 'spring',
        bounce: 0,
        duration: 0.3,
      },
    },
  };

  return (
    <AnimatePresence mode='wait'>
      {isVisible && (
        <motion.div className={style.container}>
          <motion.div
            className={style.overlay}
            initial='initial'
            animate='animate'
            exit='exit'
            onClick={handelClose}
          />

          <motion.main
            ref={modalRef}
            className={style.modal}
            variants={modalVariants}
            initial='initial'
            animate='animate'
            exit='exit'
          >
            <motion.header
              className={style.header}
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h5>{title}</h5>
              <div className={style.actions}>
                <Button onClick={handelClose} bgColor={true}>
                  <RiArrowDownDoubleLine />
                </Button>
                <Button
                  disable={disable}
                  onClick={() => setFullScreen(!isFullScreen)}
                  bgColor={!disable}
                >
                  {isFullScreen ? <MdOutlineZoomOutMap /> : <MdZoomInMap />}
                </Button>
              </div>
            </motion.header>
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {Component}
            </motion.div>
          </motion.main>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
