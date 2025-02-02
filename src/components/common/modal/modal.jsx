import { useState, useRef } from 'react';
import style from './modal.module.css';
import { useSelector } from 'react-redux';
import { RiArrowDownDoubleLine } from 'react-icons/ri';
import { MdOutlineZoomOutMap, MdZoomInMap } from 'react-icons/md';
import useModalVisibility from '../../../hooks/useModalVisibility';
import useModalComponent from '../../../hooks/useModalComponent';
import Button from '../button/button';

// Modal component for displaying content in a popup window
const Modal = () => {
  // Reference to the modal element for potential DOM operations
  const modalRef = useRef(null);
  // Get modal visibility state from Redux store
  const isVisible = useSelector(state => state.modalVisibility);
  // Get the component to be rendered inside modal from Redux store
  const Component = useSelector(state => state.modalComponent);
  // Custom hooks for controlling modal visibility and content
  const toggleVisibility = useModalVisibility();
  const setComponent = useModalComponent();
  // State to control modal size (fullscreen or normal)
  const [isFullScreen, setFullScreen] = useState(false);

  // Don't render anything if modal is not visible

  return (
    <div className={isVisible ? style.container : style.hidden}>
      {/* Overlay background that closes modal when clicked */}
      <div
        className={isVisible ? style.overlay : style.hidden}
        onClick={() => {
          toggleVisibility();
          setComponent(null);
        }}
      />
      {/* Main modal container */}
      <main
        ref={modalRef}
        className={isVisible ? style.modal : style.hidden}
        style={{ height: isFullScreen ? '80%' : '60%' }}
      >
        {/* Modal header with close and resize buttons */}
        <header className={style.header}>
          <Button
            onClick={() => {
              toggleVisibility();
              setComponent(null);
            }}
            bgColor={true}
          >
            <RiArrowDownDoubleLine />
          </Button>
          <Button onClick={() => setFullScreen(!isFullScreen)} bgColor={true}>
            {isFullScreen ? <MdOutlineZoomOutMap /> : <MdZoomInMap />}
          </Button>
        </header>
        {/* Render the component passed to modal */}
        {Component}
      </main>
    </div>
  );
};

export default Modal;
