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
  isLoading,
}) => {
  const disable =
    isLoading ||
    (type === 'project'
      ? !(newContent?.name && newContent?.statusUuid && newContent?.color)
      : !(
          newContent?.name &&
          newContent?.statusUuid &&
          newContent?.projectUuid
        ));
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
        <Button width={'100%'} onClick={onCancel} bgColor={true}>
          <h5>Cancel</h5>
        </Button>
        <Button
          disable={disable}
          onClick={OnCreate}
          bgColor={disable ? false : true}
        >
          <MdLibraryAdd />
          <h5>{isLoading ? 'Creating...' : 'Create'}</h5>
        </Button>
      </div>
    </div>
  );
};

export default Footer;
