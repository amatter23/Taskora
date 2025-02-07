import style from './labelSelect.module.css';
import Loading from '../../../../common/loading /loading';
const LabelSelect = ({ title, onClick, children, isLoading }) => {
  return (
    <div
      className={isLoading ? style.labelDisabled : style.label}
      onClick={onClick}
    >
      <div className={style.title}>
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

      {children}
    </div>
  );
};

export default LabelSelect;
