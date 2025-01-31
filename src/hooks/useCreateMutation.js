/**
 * A custom hook that provides error handling and success management for mutations.
 * This hook wraps around mutation hooks (like those from RTK Query) and adds toast notifications
 * and standardized error handling. It simplifies the process of executing mutations by providing
 * a consistent interface for handling success and error states.
 *
 * Key features:
 * - Automated toast notifications for success and error states
 * - Standardized error handling
 * - Support for custom success callbacks
 * - Loading state management
 * - Type-safe return values
 *
 * @param {Function} mutationHook - The mutation hook to be wrapped (e.g., from RTK Query).
 * @param {Object} [options] - Configuration options for the mutation.
 * @param {string} [options.successMessage='Created successfully'] - Message to display on successful mutation.
 * @param {string} [options.errorMessage='Something went wrong'] - Message to display on mutation failure.
 * @param {Function} [options.onSuccess] - Callback function to be executed after successful mutation.
 *
 * @returns {Object} An object containing:
 *   - handleMutation: {Function} Async function that executes the mutation with error handling
 *   - isLoading: {boolean} Loading state of the mutation
 *
 * @example
 * const { handleMutation, isLoading } = useCreateMutation(useCreateTodoMutation, {
 *   successMessage: 'Todo created successfully!',
 *   errorMessage: 'Failed to create todo',
 *   onSuccess: (data) => {
 *     console.log('Todo created:', data);
 *     refetchTodos();
 *   }
 * });
 *
 * // Usage in component
 * const handleSubmit = async (formData) => {
 *   const result = await handleMutation(formData);
 *   if (result) {
 *     // Handle successful creation
 *   }
 * };
 */
import { useToast } from './useToast';
export const useCreateMutation = (mutationHook, options = {}) => {
  const {
    successMessage = 'Created successfully',
    errorMessage = 'Something went wrong',
    onSuccess,
  } = options;

  const toast = useToast();
  const [mutation, { isLoading }] = mutationHook();

  const handleMutation = async data => {
    try {
      const result = await mutation(data);
      if (result.data) {
        onSuccess?.(result.data);
        toast.success(successMessage);
        return result.data;
      } else {
        const error = result.error?.data?.errors?.[0]?.message || errorMessage;
        toast.error(error);
        return null;
      }
    } catch (error) {
      toast.error(errorMessage);
      return null;
    }
  };

  return { handleMutation, isLoading };
};
