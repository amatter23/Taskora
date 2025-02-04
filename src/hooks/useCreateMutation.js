/**
 * A custom hook for handling API mutations with integrated error handling and success notifications.
 * Wraps RTK Query mutation hooks to provide a standardized way of handling API operations.
 *
 * Features:
 * - Automatic toast notifications
 * - Error handling with custom messages
 * - Success callback support
 * - Loading state tracking
 * - Support for different response types (204 No Content, errors, success with data)
 *
 * @param {Function} mutationHook - RTK Query mutation hook to wrap
 * @param {Object} options - Configuration options
 * @param {string} [options.successMessage='Created successfully'] - Success notification message
 * @param {string} [options.errorMessage='Something went wrong'] - Error notification message
 * @param {Function} [options.onSuccess] - Callback to execute after successful mutation
 *
 * @returns {{
*   handleMutation: Function,
*   isLoading: boolean
* }} Object with mutation handler and loading state
*
* @example
* const mutation = useCreateMutation(useCreateTodoMutation, {
*   successMessage: 'Todo created!',
*   onSuccess: (data) => refetchTodos()
* });
*
* await mutation.handleMutation(formData);
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

      // Handle DELETE request with 204 response first
      if (result.data === null) {
        onSuccess?.();
        toast.success(successMessage);
        return true;
      }

      // Then check for errors
      if (result.error) {
        const errorMsg =
          result.error?.data?.errors?.[0]?.message || errorMessage;
        toast.error(errorMsg);
        return null;
      }

      // Handle other successful responses
      if (result.data) {
        onSuccess?.(result.data);
        toast.success(successMessage);
        return result.data;
      }

      // Fallback error case
      toast.error(errorMessage);
      return null;
    } catch (error) {
      toast.error(errorMessage);
      return null;
    }
  };

  return { handleMutation, isLoading };
};
