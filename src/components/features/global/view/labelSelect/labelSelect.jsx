import style from './labelSelect.module.css';
const LabelSelect = ({ title, onClick, children }) => {
  return (
    <div className={style.label} onClick={onClick}>
      <h5>{title}</h5>
      {children}
    </div>
  );
};

export default LabelSelect;
