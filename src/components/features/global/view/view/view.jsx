/**
 * A responsive view component that displays either project or task details.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.uuid - Unique identifier for the project or task
 * @param {('project'|'task')} props.type - Determines whether to display project or task view
 *
 * @returns {JSX.Element} A responsive container with details, labels, and task view (for projects)
 *
 * @example
 * <View uuid="123" type="project" />
 *
 * @description
 * This component:
 * - Handles responsive layout for mobile/desktop views
 * - Fetches project or task data based on UUID and type
 * - Renders Details component with project/task information
 * - Shows Labels component in different positions based on viewport
 * - Conditionally renders TaskView for project type
 */
import { useState, useEffect } from 'react';
import style from './view.module.css';
import { selectProjectWithUuid } from '../../../../../store/selectors/projects/projectwithUuidSelector';
import { selectTaskWithUuid } from '../../../../../store/selectors/tasks/taskwithUuidSelector';
import { useSelector } from 'react-redux';
import Details from '../details/details';
import TaskView from './taskView/taskView';
import Labels from './labels/labels';
const MOBILE_BREAKPOINT = 1000;
const View = ({ uuid, type }) => {
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= MOBILE_BREAKPOINT
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const data = useSelector(state =>
    type === 'project'
      ? selectProjectWithUuid(state, uuid)
      : selectTaskWithUuid(state, uuid)
  );

  return (
    <>
      {isMobile ? (
        <div className={style.container}>
          <div className={style.content}>
            <div className={style.main}>
              <Details
                uuid={data?.uuid}
                name={data?.name}
                description={data?.description}
                color={data?.color}
                type={type}
              />
            </div>
            <Labels uuid={uuid} type={type} data={data} />
            {type === 'project' && <TaskView type={type} data={data} />}
          </div>
        </div>
      ) : (
        <div className={style.container}>
          <div className={style.content}>
            <div className={style.main}>
              <Details
                uuid={data?.uuid}
                name={data?.name}
                description={data?.description}
                color={data?.color}
                type={type}
              />
            </div>
            {type === 'project' && <TaskView type={type} data={data} />}
          </div>
          <Labels uuid={uuid} type={type} data={data} />
        </div>
      )}
    </>
  );
};

export default View;
