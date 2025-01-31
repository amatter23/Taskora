/**
 * A component that displays a status label with an icon and title
 * 
 * @component
 * @param {Object} props - The component props
 * @param {ReactNode} props.icon - The icon element to be displayed
 * @param {string} props.title - The title text to be displayed
 * @param {string} props.iconColor - The color of the icon
 * @param {Function} props.onClick - Click event handler for the status label
 * @returns {JSX.Element} A status label component with an icon and title
 *
 * @example
 * <StatusLable 
 *   icon={<Icon />}
 *   title="Status Title"
 *   iconColor="#000000"
 *   onClick={() => handleClick()}
 * />
 */
import style from './statusLable.module.css';
import useHandleNames from '../../../../../../hooks/useHandleNames';
const StatusLable = ({ icon, title, iconColor, onClick }) => {
  const handleNames = useHandleNames();

  return (
    <div className={style.statusLable} onClick={onClick}>
      <div className={style.title}>
        <div style={{ color: iconColor }} className={style.icon}>
          {icon}
        </div>
        <h5>{handleNames(title)}</h5>
      </div>
    </div>
  );
};

export default StatusLable;
