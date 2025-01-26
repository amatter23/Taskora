import style from './header.module.css';
import Button from '../../../common/button/button';
import { MdAddCircleOutline } from 'react-icons/md';
const Header = ({ type }) => {
  return (
    <div className={style.header}>
      <h4>Recent {type}</h4>
      <Button bgColor={true} color={'var(--light-text-color)'}>
        <MdAddCircleOutline />
      </Button>
    </div>
  );
};
export default Header;
