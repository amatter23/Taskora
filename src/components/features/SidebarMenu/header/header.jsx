/**
 * Header component for displaying a section title with an add button
 * @component
 * @param {Object} props - Component props
 * @param {string} props.type - The type of content being displayed (e.g., "tasks", "projects")
 * @param {Function} props.onClick - Callback function triggered when the add button is clicked
 * @returns {JSX.Element} Header component with title and add button
 */
import style from './header.module.css';
import Button from '../../../common/button/button';
import { MdAddCircleOutline } from 'react-icons/md';
const Header = ({ type, onClick }) => {
  return (
    <div className={style.header}>
      <h4>Recent {type}</h4>
      <Button
        onClick={onClick}
        bgColor={true}
        color={'var(--light-text-color)'}
      >
        <MdAddCircleOutline />
      </Button>
    </div>
  );
};
export default Header;
