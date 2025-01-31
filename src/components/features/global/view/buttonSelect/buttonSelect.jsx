import style from './buttonSelect.module.css';
const ButtonSelect = ({ title, onClick, children }) => {
  return (
    <div className={style.button} onClick={onClick}>
      {children}
      <h5>{title}</h5>
    </div>
  );
};

export default ButtonSelect;
