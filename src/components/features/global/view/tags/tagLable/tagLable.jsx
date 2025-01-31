/**
 * TagLable Component - Displays a label with an icon and title
 * @param {Object} props
 * @param {ReactNode} props.icon - Icon element to display
 * @param {string} props.title - Title text for the label
 * @param {string} props.iconColor - Color for the icon
 * @param {Function} props.onClick - Click handler for the label
 */
import style from './tagLable.module.css';
const TagLable = ({ icon, title, iconColor, onClick }) => {
  return (
    <div className={style.tagLable} onClick={onClick}>
      <div className={style.title}>
        {/* Icon container with dynamic color */}
        <div style={{ color: iconColor }} className={style.icon}>
          {icon}
        </div>
        {/* Title text */}
        <h6>{title}</h6>
      </div>
    </div>
  );
};

export default TagLable;
