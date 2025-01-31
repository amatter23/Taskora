/**
 * A color selection component that allows users to pick and update colors.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.onColorSelect - Callback function triggered when a color is selected
 * @param {string} props.data - Initial color value
 * @param {string} [props.uuid] - Optional unique identifier for updating color in external storage
 * 
 * @returns {JSX.Element} A ColorPicker component with custom styling and color update handling
 * 
 * @example
 * ```jsx
 * <ColorSelect 
 *   onColorSelect={(color) => handleColor(color)}
 *   data="#ff0000"
 *   uuid="project-123"
 * />
 * ```
 */
import { useState } from 'react';
import { ColorPicker } from 'antd';
import useProjectUpdate from '../../../../../hooks/useContentUpdate';
const ColorSelect = ({ onColorSelect, data, uuid, type }) => {
  const { handleUpdate } = useProjectUpdate(type);

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
    <ColorPicker
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
  );
};

export default ColorSelect;
