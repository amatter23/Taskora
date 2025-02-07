import style from './buttonSelect.module.css';
import Loading from '../../../../common/loading /loading';
const ButtonSelect = ({ title, onClick, children, isLoading }) => {
  return (
    <div
      className={isLoading ? style.buttonDisabled : style.button}
      onClick={onClick}
    >
      {children}
      <h5>{title}</h5>
      {isLoading ? (
        <Loading
          color={'var(--text-color)'}
          size={'3px'}
          height={'0.5rem'}
          width={'0.5rem'}
          containerHeight={'100%'}
        />
      ) : null}
    </div>
  );
};

export default ButtonSelect;
