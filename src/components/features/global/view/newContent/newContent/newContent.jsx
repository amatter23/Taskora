import { useState } from 'react';
import style from './newContent.module.css';
import { useCreateTaskMutation } from '../../../../../../store/services/tasksApi';
import { useCreateProjectMutation } from '../../../../../../store/services/projectsApi';
import Main from '../main/main';
import Fields from '../fields/fields';
import Footer from '../footer/footer';
import { useCreateMutation } from '../../../../../../hooks/useCreateMutation';
import { useSelector } from 'react-redux';
import { selectAllStatuses } from '../../../../../../store/selectors/statuses/allStatusesSelector';
const NewContent = ({ projectData, type, onCancel, onCreate }) => {
  const statuses = useSelector(selectAllStatuses);
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  const [newContent, setNewContent] = useState({
    projectUuid: projectData?.uuid,
    color: '#306bff',
    statusUuid: randomStatus?.uuid,
  });

  const { handleMutation, isLoading } = useCreateMutation(
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
            setNewContent({
              ...newContent,
              color: color,
            });
          }}
          type={type}
          defaultStatus={randomStatus}
          defaultColor={'#306bff'}
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
          isLoading={isLoading}
        ></Footer>
      </div>
    </div>
  );
};
export default NewContent;
