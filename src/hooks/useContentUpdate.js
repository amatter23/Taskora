import { useUpdateProjectMutation } from '../store/services/projectsApi';
import { useUpdateTaskMutation } from '../store/services/tasksApi';
import { useCreateMutation } from './useCreateMutation';
/**
 * A custom hook for handling content updates for projects and tasks
 * @param {string} contentType - The type of content to update ('project' or 'task')
 * @returns {Object} An object containing the handleUpdate function
 * @property {Function} handleUpdate - Async function to update content
 * @param {string} handleUpdate.uuid - The unique identifier of the content to update
 * @param {string} handleUpdate.field - The field name to update
 * @param {*} handleUpdate.value - The new value to set
 * @returns {Promise<boolean>} Returns true if update was successful, false otherwise
 *
 * @example
 * const { handleUpdate } = useContentUpdate('project');
 * await handleUpdate('123-456', 'title', 'New Title');
 *
 * @description
 * This hook utilizes useCreateMutation which provides error handling and success/error notifications.
 * The useCreateMutation hook handles the mutation state and displays appropriate toast messages
 * based on the mutation result.
 */
const useContentUpdate = contentType => {
  const { handleMutation } = useCreateMutation(
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

  return { handleUpdate };
};

export default useContentUpdate;
