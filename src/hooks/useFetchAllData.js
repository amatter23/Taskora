import { useGetProjectsQuery } from '../store/services/projectsApi';
import { useGetTasksQuery } from '../store/services/tasksApi';
import { useGetTagsQuery } from '../store/services/tagsApi';
import { useGetStatusesQuery } from '../store/services/statusesApi';
/**
 * Custom hook to fetch all data required for the application.
 * It checks the loading status of projects, tasks, tags, and statuses.
 * 
 * @returns {boolean} - Returns true if any of the data is still loading, otherwise false.
 */
const useFetchAllData = () => {
  const { isLoading: isLoadingProjects } = useGetProjectsQuery();
  const { isLoading: isLoadingTasks } = useGetTasksQuery();
  const { isLoading: isLoadingTags } = useGetTagsQuery();
  const { isLoading: isLoadingStatuses } = useGetStatusesQuery();

  return (
    isLoadingProjects || isLoadingTasks || isLoadingTags || isLoadingStatuses
  );
};

export default useFetchAllData;
