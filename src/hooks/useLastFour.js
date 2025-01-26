import { useSelector } from 'react-redux';
import { selectProjects } from '../store/selectors/projects/projectsSelector';
import { selectTasks } from '../store/selectors/tasks/tasksSelector';
const useLastFour = type => {
  const data = useSelector(type === 'project' ? selectProjects : selectTasks);
  const lastFour = [...data]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 4);

   return lastFour.length === 0 ? [] : lastFour;
};

export default useLastFour;
