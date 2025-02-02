/**
 * A customizable dropdown component built on top of Ant Design's Dropdown
 *
 * @component
 * @param {Object} props - The component props
 * @param {Array|string} [props.trigger=['click']] - The trigger mode for showing the dropdown
 * @param {React.Component} props.content - The component to render in the dropdown menu
 * @param {Function} props.onChange - Callback function that is called when a selection is made
 * @param {React.ReactNode} props.children - The trigger element that the dropdown will be attached to
 * @param {number|string} [props.maxHeight] - Maximum height of the dropdown menu before scrolling
 * @param {string} [props.placement='topRight'] - Placement of the dropdown menu ('topLeft', 'topRight', 'bottomLeft', 'bottomRight')
 *
 * @returns {React.ReactElement} A dropdown component that renders content in a popup menu
 *
 * @example
 * <DropDown
 *   trigger={['click']}
 *   content={MenuContent}
 *   onChange={(value) => handleChange(value)}
 *   maxHeight={300}
 *   placement="bottomLeft"
 * >
 *   <Button>Click me</Button>
 * </DropDown>
 */

import { Dropdown as AntDropdown } from 'antd';
import { useState } from 'react';
const DropDown = ({
  trigger,
  content: Content,
  onChange,
  children,
  maxHeight,
  placement,
}) => {
  const [open, setOpen] = useState(false);
  const [dropdownPlacement, setDropdownPlacement] = useState(
    placement || 'topRight'
  );
  const handleChange = data => {
    onChange(data);
    setOpen(false);
  };
  return (
    <AntDropdown
      placement={dropdownPlacement}
      open={open}
      onOpenChange={setOpen}
      dropdownRender={() => <Content onChange={handleChange} />}
      trigger={trigger || ['click']}
      overlayStyle={{
        zIndex: 99,
        maxHeight: maxHeight,
        overflowY: 'scroll',
        overflowX: 'hidden',
        scrollbarWidth: 'none',
      }}
    >
      {children}
    </AntDropdown>
  );
};

export default DropDown;
