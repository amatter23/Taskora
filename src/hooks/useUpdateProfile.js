import { useToast } from './useToast';
import { useSelector, useDispatch } from 'react-redux';
import { useUpdateUserMutation } from '../store/services/authApi';
import { useGetUserMutation } from '../store/services/authApi';
import { login } from '../store/slice/authSlice';
export const useUpdateProfile = () => {
  const toast = useToast();
  const authData = useSelector(state => state.auth);
  const { uuid } = authData.user;
  const dispatch = useDispatch();
  const [updateUser, { isLoading: isUpdateLoading }] = useUpdateUserMutation();
  const [getUserData, { isLoading: isUserLoading }] = useGetUserMutation();
  const updateProfile = async ({ update, isPhoto }) => {
    try {
      const photoData = new FormData();
      photoData.append('image', update);
      const updateResponse = await updateUser({
        data: isPhoto ? photoData : update,
        uuid,
      }).unwrap();
      if (updateResponse.error) {
        throw new Error(updateResponse.error.message);
      }
      const userResponse = await getUserData().unwrap();
      dispatch(
        login({
          ...authData,
          user: userResponse.data,
        })
      );
      toast.success(`profile updated successfully `);
      return true;
    } catch (error) {
      toast.error(error.message || 'Failed to update profile');
      return null;
    }
  };

  return { updateProfile, isLoading: isUpdateLoading || isUserLoading };
};
