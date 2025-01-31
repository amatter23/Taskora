/**
 * A component that renders a list of selectable projects
 * @component
 * @param {Object} props - The component props
 * @param {Function} props.onChange - Callback function triggered when a project is selected
 * @returns {JSX.Element} A list of clickable project items with icons and names
 * 
 * @example
 * // Usage:
 * <ProjectPicker onChange={(selectedProject) => handleProjectChange(selectedProject)} />
 */
import { useSelector } from 'react-redux';
import { selectProjects } from '../../../../../../store/selectors/projects/projectsSelector';
import { FaProjectDiagram } from 'react-icons/fa';
import style from './projectPicker.module.css';
const ProjectPicker = ({ onChange }) => {
  const projects = useSelector(selectProjects);
  return (
    <div className={style.container}>
      {projects.map(project => (
        <div
          key={project.id}
          className={style.projectLable}
          onClick={() => onChange(project)}
        >
          <div className={style.title}>
            <div style={{ color: project.color }} className={style.icon}>
              <FaProjectDiagram />
            </div>
            <h5>{project.name}</h5>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ProjectPicker;
