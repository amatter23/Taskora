import { useState, useCallback } from 'react';
import { ColorPicker } from 'antd';
import useProjectUpdate from '../../../../../hooks/useContentUpdate';
import Loading from '../../../../common/loading /loading';
import style from './colorSelect.module.css';

const ColorSelect = ({ onColorSelect, data, uuid, type, width }) => {
  const { handleUpdate, isLoading } = useProjectUpdate(type);
  const [color, setColor] = useState(data);
  const [newColor, setNewColor] = useState(data);
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);
  const handleColorSelect = async () => {
    if (color === newColor) {
      handleClose();
      return;
    }
    try {
      if (uuid) {
        const updated = await handleUpdate(uuid, 'color', newColor);
        if (updated) {
          setColor(newColor);
          onColorSelect?.(newColor);
          handleClose();
        }
      } else {
        setColor(newColor);
        onColorSelect?.(newColor);
      }
    } catch (error) {
      console.error('Color update failed:', error);
    }
  };

  const renderColorText = color => (
    <span
      style={{
        color: 'var(--text-color)',
      }}
    >
      (
      {color && typeof color.toHexString === 'function'
        ? color.toHexString()
        : 'Invalid color'}
      )
    </span>
  );

  return (
    <div className={style.color}>
      <ColorPicker
        className={style.colorPicker}
        disabled={isLoading}
        open={isOpen}
        onOpenChange={open => {
          if (!isLoading) {
            setIsOpen(open);
          }
          if (!open) {
            handleColorSelect();
          }
        }}
        value={newColor}
        onChange={color => {
          setNewColor(color.toHexString());
        }}
        showText={renderColorText}
      />
      {isLoading && (
        <Loading
          color={'var(--text-color)'}
          size={'3px'}
          height={'0.5rem'}
          width={'0.5rem'}
          containerHeight={'100%'}
        />
      )}
    </div>
  );
};

export default ColorSelect;
