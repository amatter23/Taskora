import style from './ramadanButton.module.css';
import Button from '../../common/button/button';
import Lottie from 'lottie-react';
import ramadanDecorations from './ramadanDecorations.json';
import useModalVisibility from '../../../hooks/useModalVisibility';
import useModalComponent from '../../../hooks/useModalComponent';
import RamadanView from '../ramadanView/ramadanView';
import useModalTitle from '../../../hooks/useModalTitle';
import useAdhkar from '../../../hooks/ramadan/useAdhkar';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectProjects } from '../../../store/selectors/projects/projectsSelector';
import { useRamadanChallengeMutation } from '../../../store/services/projectsApi';
import { useCreateMutation } from '../../../hooks/useCreateMutation';
import { useLazyGetTasksQuery } from '../../../store/services/tasksApi';

const RamadanButton = () => {
  const toggleVisibility = useModalVisibility();
  const setComponent = useModalComponent();
  const setTitle = useModalTitle();
  const { currentZikr, getRandomZikr } = useAdhkar();
  const projects = useSelector(selectProjects);

  // Change to lazy query so we can trigger it manually
  const [getTasks, { isLoading: isLoadingTasks }] = useLazyGetTasksQuery();

  const { handleMutation, isLoading: isLoadingMutation } = useCreateMutation(
    useRamadanChallengeMutation,
    {
      successMessage: `Ramadan challenge created successfully`,
      onSuccess: data => {
        getTasks().then(() => {
          if (data && data.uuid) {
            for (let project of projects) {
              if (project.theme === 'Ramadan'.toUpperCase()) {
                setComponent(<RamadanView uuid={project.uuid} />);
                toggleVisibility();
                setTitle(currentZikr);
                return;
              }
            }
          }
        });
      },
    }
  );

  useEffect(() => {
    getRandomZikr();
  }, []);

  const handleClick = async e => {
    for (let project of projects) {
      if (project.theme === 'Ramadan'.toUpperCase()) {
        setComponent(<RamadanView uuid={project.uuid} />);
        toggleVisibility();
        setTitle(currentZikr);
        return;
      }
    }
    try {
      await handleMutation();
    } catch (err) {
      console.error('Error creating Ramadan challenge:', err);
    }
  };

  const isLoading = isLoadingMutation || isLoadingTasks;

  return (
    <div className={style.ramadanButton}>
      <Button
        ramadan={true}
        onClick={handleClick}
        disable={isLoading}
      >
        <h4>{isLoading ? 'Creating...' : 'Ramadan'}</h4>
      </Button>
      <Lottie
        className={style.lanternAnimation}
        animationData={ramadanDecorations}
        loop={true}
        size={0.1}
      />
    </div>
  );
};

export default RamadanButton;
