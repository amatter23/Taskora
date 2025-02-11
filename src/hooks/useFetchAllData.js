import { useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLazyGetProjectsQuery } from '../store/services/projectsApi';
import { useLazyGetTasksQuery } from '../store/services/tasksApi';
import { useLazyGetTagsQuery } from '../store/services/tagsApi';
import { useLazyGetStatusesQuery } from '../store/services/statusesApi';
import { setInitialFetchDone } from '../store/slice/dataSlice';

const useFetchAllData = () => {
  const dispatch = useDispatch();
  const isInitialFetchDone = useSelector(
    state => state.data.isInitialFetchDone
  );

  const [getProjects, { isLoading: isLoadingProjects }] =
    useLazyGetProjectsQuery();
  const [getTasks, { isLoading: isLoadingTasks }] = useLazyGetTasksQuery();
  const [getTags, { isLoading: isLoadingTags }] = useLazyGetTagsQuery();
  const [getStatuses, { isLoading: isLoadingStatuses }] =
    useLazyGetStatusesQuery();

  useLayoutEffect(() => {
    if (!isInitialFetchDone) {
      (async () => {
        try {
          await getProjects().unwrap();
          await getTasks().unwrap();
          await getTags().unwrap();
          await getStatuses().unwrap();
          dispatch(setInitialFetchDone());
        } catch (error) {
          console.error('Data fetching failed:', error);
        }
      })();
    }
  }, [
    isInitialFetchDone,
    getProjects,
    getTasks,
    getTags,
    getStatuses,
    dispatch,
  ]);

  return (
    isLoadingProjects || isLoadingTasks || isLoadingTags || isLoadingStatuses
  );
};

export default useFetchAllData;
