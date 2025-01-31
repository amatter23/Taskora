/**
 * A component that renders a project selection dropdown.
 *
 * @component
 * @param {Object} props - The component props
 * @param {Function} props.onProjectSelect - Callback function triggered when a project is selected
 * @param {React.ComponentType} props.Type - Component type to be rendered as the dropdown trigger
 * @param {Object} props.data - Initial project data
 * @param {string} [props.uuid] - UUID of the item being updated. If provided, will trigger an update
 *
 * @returns {JSX.Element} A dropdown component for project selection
 *
 * @example
 * <ProjectSelect
 *   onProjectSelect={(project) => handleProject(project)}
 *   Type={ButtonSelect}
 *   data={initialProject}
 *   uuid="123e4567-e89b-12d3-a456-426614174000"
 * />
 */
import { useState } from 'react';
import DropDown from '../../dropDown/dropDown';
import projectPicker from '../projectPicker/projectPicker';
import useProjectUpdate from '../../../../../../hooks/useContentUpdate';
import { FaProjectDiagram } from 'react-icons/fa';
const ProjectSelect = ({ onProjectSelect, Type, data, uuid }) => {
  const [project, setProject] = useState(data);
  const { handleUpdate } = useProjectUpdate();

  const handleStatusSelect = async project => {
    if (uuid) {
      const updated = await handleUpdate(uuid, 'statusUuid', project.uuid);
      if (updated) {
        setProject(project);
        onProjectSelect?.(project);
      }
    } else {
      setProject(project);
      onProjectSelect?.(project);
    }
  };

  return (
    <DropDown content={projectPicker} onChange={handleStatusSelect}>
      <Type title={project?.name || 'Project'}>
        <FaProjectDiagram style={{ color: project?.color }} />
      </Type>
    </DropDown>
  );
};

export default ProjectSelect;
