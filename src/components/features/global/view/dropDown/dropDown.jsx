import { Dropdown as AntDropdown } from 'antd';
import { useState } from 'react';
const DropDown = ({
  trigger,
  content: Content,
  onChange,
  children,
  maxHeight,
  placement,
  defaultValue,
  isLoading,
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
      disabled={isLoading}
      placement={dropdownPlacement}
      open={open}
      onOpenChange={setOpen}
      dropdownRender={() => (
        <Content defaultValue={defaultValue} onChange={handleChange} />
      )}
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
