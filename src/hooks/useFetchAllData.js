import { useEffect } from 'react';
import { useLazyGetProjectsQuery } from '../store/services/projectsApi';
import { useLazyGetTasksQuery } from '../store/services/tasksApi';
import { useLazyGetTagsQuery } from '../store/services/tagsApi';
import { useLazyGetStatusesQuery } from '../store/services/statusesApi';
const useFetchAllData = () => {
  const [getProjects, { isLoading: isLoadingProjects }] =
    useLazyGetProjectsQuery();
  const [getTasks, { isLoading: isLoadingTasks }] = useLazyGetTasksQuery();
  const [getTags, { isLoading: isLoadingTags }] = useLazyGetTagsQuery();
  const [getStatuses, { isLoading: isLoadingStatuses }] =
    useLazyGetStatusesQuery();
  useEffect(() => {
    (async () => {
      try {
        await getProjects().unwrap();
        await getTasks().unwrap();
        await getTags().unwrap();
        await getStatuses().unwrap();
      } catch (error) {
        console.error('Data fetching failed:', error);
      }
    })();
  }, [getProjects, getTasks, getTags, getStatuses]);

  return (
    isLoadingProjects || isLoadingTasks || isLoadingTags || isLoadingStatuses
  );
};
export default useFetchAllData;
