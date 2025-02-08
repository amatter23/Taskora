import { useSelector, useDispatch } from 'react-redux';
import useChangeType from '../../../hooks/useChangeType';
import Button from '../button/button';
import { FaTasks, FaProjectDiagram } from 'react-icons/fa';
import style from './changeType.module.css';
const ChangeType = () => {
  const type = useSelector(state => state.typeView.typeView);
  const changeType = useChangeType();
  return (
    <main className={style.changeType}>
      <Button
        onClick={() => {
          changeType('project');
        }}
        isActive={type === 'project'}
        bgColor={type != 'project'}
        title={'Project view'}
      >
        <FaProjectDiagram />
      </Button>
      <Button
        onClick={() => {
          changeType('task');
        }}
        isActive={type === 'task'}
        bgColor={type != 'task'}
        title={'Task view'}
      >
        <FaTasks />
      </Button>
    </main>
  );
};

export default ChangeType;
