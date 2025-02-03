/**
 * ProjectPicker Component
 * 
 * Renders a searchable list of projects that can be selected.
 * Each project is displayed with its icon and name, using the project's custom color.
 * 
 * @component
 * @param {Object} props
 * @param {Function} props.onChange - Handler function called when a project is selected
 * @returns {JSX.Element}
 * 
 * @example
 * <ProjectPicker 
 *   onChange={(project) => handleProjectSelection(project)} 
 * />
 */

import { useSelector } from 'react-redux';
import { useState } from 'react';
import { FaProjectDiagram } from 'react-icons/fa';
import { selectProjects } from '../../../../../../store/selectors/projects/projectsSelector';
import useSearch from '../../../../../../hooks/useSearch';
import style from './projectPicker.module.css';

const ProjectPicker = ({ onChange }) => {
  const projects = useSelector(selectProjects);
  const [search, setSearch] = useState();

  const projectFiltered = useSearch({
    list: projects,
    from: 'name',
    to: search,
  });

  const handleSearchChange = (event) => {
    setSearch({
      name: event.target.value,
    });
  };

  return (
    <div className={style.container}>
      <input
        className={style.input}
        placeholder="Search"
        onChange={handleSearchChange}
      />
      {projectFiltered.map((project) => (
        <div
          key={project.id}
          className={style.projectLable}
          onClick={() => onChange(project)}
        >
          <div className={style.title}>
            <div 
              className={style.icon}
              style={{ color: project.color }}
            >
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
