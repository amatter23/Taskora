import { MdDelete } from 'react-icons/md';
import { useDeleteProjectMutation } from '../../../../../store/services/projectsApi';
import { useDeleteTaskMutation } from '../../../../../store/services/tasksApi';
import { useCreateMutation } from '../../../../../hooks/useCreateMutation';
import useModalComponent from '../../../../../hooks/useModalComponent';
import useModalVisibility from '../../../../../hooks/useModalVisibility';
import style from './delete.module.css';
const Delete = ({ uuid, type }) => {
  const setComponent = useModalComponent();
  const toggleVisibility = useModalVisibility();

  const handelDelete = () => {
    toggleVisibility();
    setComponent(null);
  };
  const { handleMutation } = useCreateMutation(
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
      <h5>Delete</h5>
      <MdDelete color={'var(--error-color)'} />
    </div>
  );
};

export default Delete;
