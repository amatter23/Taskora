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

/**
 * Modal component that provides a customizable popup window with header and content area.
 * Supports fullscreen mode and manages its own visibility state through Redux.
 */
const Modal = () => {
  // DOM reference for the modal container
  const modalRef = useRef(null);

  // Redux state selectors
  const isVisible = useSelector(state => state.modal.visibility);
  const title = useSelector(state => state.modal.title);
  const Component = useSelector(state => state.modalComponent);
  const disable = useSelector(state => state.modal.fullScreen);

  // Custom hooks for modal state management
  const toggleVisibility = useModalVisibility();
  const setComponent = useModalComponent();
  const setTitle = useModalTitle();
  const setDisable = useModalFullScreen();

  // Local state for fullscreen mode
  const [isFullScreen, setFullScreen] = useState(false);

  /**
   * Handles modal closure by resetting all modal states
   */
  const handelClose = () => {
    toggleVisibility();
    setComponent(null);
    setFullScreen(false);
    setTitle('');
    setDisable(false);
  };

  return (
    <div className={isVisible ? style.container : style.hidden}>
      {/* Backdrop overlay that closes the modal when clicked */}
      <div
        className={isVisible ? style.overlay : style.hidden}
        onClick={handelClose}
      />
      {/* Modal content wrapper */}
      <main
        ref={modalRef}
        className={isVisible ? style.modal : style.hidden}
        style={{
          height: isFullScreen ? '80%' : 'fit-content',
          maxHeight: isFullScreen ? '80%' : '60%',
        }}
      >
        {/* Modal header with title and control buttons */}
        <header className={style.header}>
          <h5>{title}</h5>
          <div className={style.actions}>
            <Button onClick={handelClose} bgColor={true}>
              <RiArrowDownDoubleLine />
            </Button>
            <Button
              disable={disable}
              onClick={() => setFullScreen(!isFullScreen)}
              bgColor={disable ? false : true}
            >
              {isFullScreen ? <MdOutlineZoomOutMap /> : <MdZoomInMap />}
            </Button>
          </div>
        </header>
        {/* Dynamic content area */}
        {Component}
      </main>
    </div>
  );
};

export default Modal;
