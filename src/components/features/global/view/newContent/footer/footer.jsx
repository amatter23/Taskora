/**
 * Footer component for new content creation forms
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.onProjectSelect - Callback function when a project is selected, receives project uuid
 * @param {Array} props.projectData - Array of project data to populate the project selector
 * @param {Function} props.OnCreate - Callback function when create button is clicked
 * @param {string} props.type - Type of content being created ('task' or other)
 * @param {Function} props.onCancle - Callback function when cancel button is clicked
 * @returns {JSX.Element} Footer component with project selection (if type is 'task') and action buttons
 */
import ProjectSelect from '../../project/projectSelect/projectSelect';
import ButtonSelect from '../../buttonSelect/buttonSelect';
import Button from '../../../../../common/button/button';
import { MdLibraryAdd } from 'react-icons/md';
import style from './footer.module.css';
const Footer = ({
  onProjectSelect,
  projectData,
  OnCreate,
  type,
  onCancel,
  newContent,
}) => {
  const displayed =
    type === 'project'
      ? newContent?.name && newContent?.statusUuid && newContent?.color
        ? false
        : true
      : newContent?.name && newContent?.statusUuid
      ? false
      : true;
  return (
    <div className={style.footer}>
      {type === 'task' ? (
        <ProjectSelect
          Type={ButtonSelect}
          onProjectSelect={data => {
            onProjectSelect(data.uuid);
          }}
          data={projectData}
        />
      ) : (
        ''
      )}
      <div className={style.actions}>
        <Button width={"100%"} onClick={onCancel} bgColor={true}>
          <h5>Cancel</h5>
        </Button>
        <Button
          displayed={displayed}
          onClick={OnCreate}
          bgColor={displayed ? false : true}
        >
          <MdLibraryAdd />
          <h5>Create</h5>
        </Button>
      </div>
    </div>
  );
};

export default Footer;
