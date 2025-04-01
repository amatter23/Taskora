import style from './miniCard.module.css';
import { useSelector } from 'react-redux';
import { selectProjectWithUuid } from '../../../../store/selectors/projects/projectwithUuidSelector';
import { selectTaskWithUuid } from '../../../../store/selectors/tasks/taskwithUuidSelector';
import useModalComponent from '../../../../hooks/useModalComponent';
import useModalVisibility from '../../../../hooks/useModalVisibility';
import View from '../../global/view/view/view';
const MiniCard = ({ onClick, uuid, type }) => {
  const toggleVisibility = useModalVisibility();
  const setComponent = useModalComponent();
  const data =
    useSelector(state => {
      if (type === 'task') {
        return selectTaskWithUuid(state, uuid);
      }
      return selectProjectWithUuid(state, uuid);
    }) || {};
  const handleClick = () => {
    setComponent(<View uuid={uuid} type={type} />);
    toggleVisibility();
  };
  return (
    <div className={style.row} onClick={handleClick}>
      {type === 'project' ? (
        <div
          className={style.color}
          style={{ backgroundColor: data.color }}
        ></div>
      ) : (
        ''
      )}
      <h3>{data?.name}</h3>
    </div>
  );
};
export default MiniCard;
