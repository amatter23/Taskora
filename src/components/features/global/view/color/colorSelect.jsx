import { useState } from 'react';
import { ColorPicker } from 'antd';
import useProjectUpdate from '../../../../../hooks/useContentUpdate';
import Loading from '../../../../common/loading /loading';
import style from './colorSelect.module.css';
const ColorSelect = ({ onColorSelect, data, uuid, type, width }) => {
  const { handleUpdate, isLoading } = useProjectUpdate(type);

  const [color, setColor] = useState(data);
  const handleColorSelect = async color => {
    if (uuid) {
      const updated = await handleUpdate(uuid, 'color', color);
      if (updated) {
        setColor(color);
        onColorSelect(color);
      }
    } else {
      setColor(color);
      onColorSelect(color);
    }
  };
  return (
    <div style={{ width: width }} className={style.color}>
      <ColorPicker
        disabled={isLoading}
        style={{
          backgroundColor: 'var(--background-color)',
          border: 'none',
        }}
        defaultValue={color}
        showText={color => (
          <span style={{ color: 'var(--text-color)' }}>
            ({color.toHexString()})
          </span>
        )}
        onChangeComplete={color => {
          handleColorSelect(color.toHexString());
        }}
      />
      {isLoading ? (
        <Loading
          color={'var(--text-color)'}
          size={'3px'}
          height={'0.5rem'}
          width={'0.5rem'}
          containerHeight={'100%'}
        />
      ) : null}
    </div>
  );
};

export default ColorSelect;
