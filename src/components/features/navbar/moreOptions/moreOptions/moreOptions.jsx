/**
 * A component that renders a dropdown menu with additional add content options.
 *
 * @component
 * @returns {JSX.Element} A dropdown menu with an add icon trigger
 *
 * @example
 * // Basic usage
 * <MoreOptions  />
 */
import { IoMdAddCircle } from 'react-icons/io';
import DropDown from '../../../global/view/dropDown/dropDown';
import useAddNewContent from '../../../../../hooks/useAddNewContent';
import style from './moreOptions.module.css';
import Options from '../options/options';
const MoreOptions = () => {
  const newContent = useAddNewContent();
  const handelNewContent = type => {
    newContent(type);
  };
  return (
    <div className={style.moreOptions}>
      <DropDown
        onChange={data => {
          handelNewContent(data);
        }}
        placement={'bottomRight'}
        content={Options}
      >
        <IoMdAddCircle className={style.moreOptionsIcon} />
      </DropDown>
    </div>
  );
};

export default MoreOptions;
