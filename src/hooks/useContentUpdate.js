import { useUpdateProjectMutation } from '../store/services/projectsApi';
import { useUpdateTaskMutation } from '../store/services/tasksApi';
import { useCreateMutation } from './useCreateMutation';
/**
 * @description
 * This hook utilizes useCreateMutation which provides error handling and success/error notifications.
 * The useCreateMutation hook handles the mutation state and displays appropriate toast messages
 * based on the mutation result.
 */
const useContentUpdate = contentType => {
  const { handleMutation, isLoading } = useCreateMutation(
    contentType === 'project'
      ? useUpdateProjectMutation
      : useUpdateTaskMutation,
    {
      successMessage: `${contentType} updated successfully`,
      errorMessage: `Failed to update ${contentType}`,
    }
  );

  const handleUpdate = async (uuid, field, value) => {
    try {
      const result = await handleMutation({
        uuid,
        [field]: value,
      });
      return !!result;
    } catch (error) {
      return false;
    }
  };

  return { handleUpdate, isLoading };
};

export default useContentUpdate;
