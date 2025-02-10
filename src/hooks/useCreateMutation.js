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

      if (result.data === null) {
        onSuccess?.();
        toast.success(successMessage);
        return true;
      }

      if (result.error) {
        const errorMsg =
          result.error?.data?.errors?.[0]?.message || errorMessage;
        toast.error(errorMsg);
        return null;
      }

      if (result.data) {
        onSuccess?.(result.data);
        toast.success(successMessage);
        return result.data;
      }

      toast.error(errorMessage);
      return null;
    } catch (error) {
      toast.error(errorMessage);
      return null;
    }
  };

  return { handleMutation, isLoading };
};
