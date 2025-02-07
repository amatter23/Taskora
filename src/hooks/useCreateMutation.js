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
