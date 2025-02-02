/**
 * A component for creating new content (either a project or task)
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.projectData - Data about the current project
 * @param {string} props.projectData.uuid - Unique identifier of the project
 * @param {('project'|'task')} props.type - Type of content being created
 * @param {Function} props.onCancle - Callback function when creation is cancelled
 * @param {Function} props.onCreate - Callback function when creation is successful
 * @returns {JSX.Element} A form interface for creating new content
 *
 * @example
 * <NewContent
 *   projectData={projectData}
 *   type="task"
 *   onCancle={() => {}}
 *   onCreate={() => {}}
 * />
 */
import { useState } from 'react';
import style from './newContent.module.css';
import { useCreateTaskMutation } from '../../../../../../store/services/tasksApi';
import { useCreateProjectMutation } from '../../../../../../store/services/projectsApi';
import Main from '../main/main';
import Fields from '../fields/fields';
import Footer from '../footer/footer';
import { useCreateMutation } from '../../../../../../hooks/useCreateMutation';
const NewContent = ({ projectData, type, onCancel, onCreate }) => {
  const [newContent, setNewContent] = useState({
    projectUuid: projectData?.uuid,
  });

  const { handleMutation } = useCreateMutation(
    type === 'project' ? useCreateProjectMutation : useCreateTaskMutation,
    {
      successMessage: `${type} added successfully`,
      onSuccess: onCreate,
    }
  );

  const handleCreate = () => handleMutation(newContent);

  return (
    <div className={style.new}>
      <Main
        onNameChange={name => {
          setNewContent({
            ...newContent,
            name: name,
          });
        }}
        onDescriptionChange={description => {
          setNewContent({
            ...newContent,
            description: description,
          });
        }}
      ></Main>
      <div className={style.actions}>
        <Fields
          onDateSelect={dueDate => {
            setNewContent({
              ...newContent,
              dueDate: dueDate,
            });
          }}
          onStatusSelect={status => {
            setNewContent({
              ...newContent,
              statusUuid: status,
            });
          }}
          onTagSelect={tag => {
            setNewContent({
              ...newContent,
              tagUuid: tag,
            });
          }}
          onColorSelect={color => {
            console.log('test');
            setNewContent({
              ...newContent,
              color: color,
            });
          }}
          type={type}
        ></Fields>
        <Footer
          projectData={projectData}
          onProjectSelect={project => {
            setNewContent({
              ...newContent,
              projectUuid: project,
            });
          }}
          OnCreate={handleCreate}
          type={type}
          onCancel={onCancel}
          newContent={newContent}
        ></Footer>
      </div>
    </div>
  );
};
export default NewContent;
