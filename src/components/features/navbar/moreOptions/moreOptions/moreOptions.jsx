import { IoMdAddCircle } from 'react-icons/io';
import DropDown from '../../../global/view/dropDown/dropDown';
import useAddNewContent from '../../../../../hooks/useAddNewContent';
import style from './moreOptions.module.css';
import Options from '../options/options';
const MoreOptions = () => {
  const newContent = useAddNewContent();
  const handleNewContent = type => {
    newContent(type);
  };
  return (
    <div className={style.moreOptions} title='Add new Task/Project'>
      <DropDown
        onChange={data => {
          handleNewContent(data);
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
