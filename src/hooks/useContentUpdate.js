/**
 * A custom hook for updating task or project content.
 * @param {string} contentType - The type of content to update ('project' or 'task')
 * @returns {Object} An object containing the handleUpdate function
 * @property {Function} handleUpdate - Updates a field value for the specified content
 * @param {string} handleUpdate.uuid - The unique identifier of the content to update
 * @param {string} handleUpdate.field - The field name to update
 * @param {*} handleUpdate.value - The new value to set for the field
 * @returns {Promise<boolean>} Returns true if update was successful, false otherwise
 * @throws {Error} When the update operation fails
 */

import { useUpdateProjectMutation } from '../store/services/projectsApi';
import { useUpdateTaskMutation } from '../store/services/tasksApi';
const useContentUpdate = contentType => {
  const [updateTask] = useUpdateTaskMutation();
  const [updateProject] = useUpdateProjectMutation();

  const handleUpdate = async (uuid, field, value) => {
    try {
      const result = await (contentType === 'project'
        ? updateProject({
            uuid,
            [field]: value,
          })
        : updateTask({
            uuid,
            [field]: value,
          }));
      return result.data ? true : false;
    } catch (error) {
      console.error(`Failed to update ${contentType}:`, error);
      return false;
    }
  };

  return { handleUpdate };
};

export default useContentUpdate;
