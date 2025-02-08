import { MdDelete } from 'react-icons/md';
import { useDeleteProjectMutation } from '../../../../../store/services/projectsApi';
import { useDeleteTaskMutation } from '../../../../../store/services/tasksApi';
import { useCreateMutation } from '../../../../../hooks/useCreateMutation';
import useModalComponent from '../../../../../hooks/useModalComponent';
import useModalVisibility from '../../../../../hooks/useModalVisibility';
import style from './delete.module.css';
import Loading from '../../../../common/loading /loading';
const Delete = ({ uuid, type }) => {
  const setComponent = useModalComponent();
  const toggleVisibility = useModalVisibility();

  const handelDelete = () => {
    toggleVisibility();
    setComponent(null);
  };
  const { handleMutation, isLoading } = useCreateMutation(
    type === 'project' ? useDeleteProjectMutation : useDeleteTaskMutation,
    {
      successMessage: `${type} Deleted successfully`,
      onSuccess: handelDelete,
    }
  );
  return (
    <div
      onClick={() => {
        handleMutation(uuid);
      }}
      className={style.delete}
    >
      <div className={style.title}>
        <h5>Delete</h5>
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

      <MdDelete />
    </div>
  );
};

export default Delete;
