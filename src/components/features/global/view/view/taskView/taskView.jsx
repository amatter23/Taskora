// Import necessary styles, components and icons
import style from './taskView.module.css';
import Button from '../../../../../common/button/button';
import { IoIosArrowDown } from 'react-icons/io';
import { IoMdAdd } from 'react-icons/io';
import NewContent from '../../newContent/newContent/newContent';
import ButtonSelect from '../../buttonSelect/buttonSelect';
import DateSelect from '../../date/dateSelect/dateSelect';
import StatusSelect from '../../status/statusSelect/statusSelect';
import TagSelect from '../../tags/tagSelect/tagSelect';
import Details from '../../details/details';
import useHandleDates from '../../../../../../hooks/useHandleDates';
import EmptyState from '../../../../../common/emptyState/emptyState';
import { IoIosArrowForward } from 'react-icons/io';
import { useState } from 'react';
/** 
  TaskView component displays a list of tasks with their details and actions
// @param {string} type - The type of view
// @param {object} data - Contains tasks data and project information
*/
const TaskView = ({ type, data }) => {
  // Initialize date handling utility
  const handelDate = useHandleDates;
  // State to control new task form visibility
  const [newTask, setNewTask] = useState(false);

  return (
    <div className={style.tasks}>
      {/* Header section with title and new task button */}
      <div className={style.header}>
        <div className={style.title}>
          {/* Show different arrow icons based on tasks availability */}
          {data?.tasks?.length === 0 ? (
            <IoIosArrowForward />
          ) : (
            <IoIosArrowDown />
          )}

          <h4>
            Tasks <span>{data?.tasks?.length}</span>
          </h4>
        </div>
        {/* New Task button */}
        <div>
          <Button
            bgColor={true}
            onClick={() => {
              setNewTask(!newTask);
            }}
          >
            <IoMdAdd />
            <h5>New Task</h5>
          </Button>
        </div>
      </div>

      {/* New task form - shown when newTask state is true */}
      {newTask === true ? (
        <div className={style.sub}>
          <NewContent
            onCancel={() => {
              setNewTask(false);
            }}
            onCreate={() => {
              setNewTask(false);
            }}
            type={'task'}
            projectData={data}
          ></NewContent>
        </div>
      ) : (
        ''
      )}

      {/* Task list section */}
      {data?.tasks?.length === 0 ? (
        // Show empty state when no tasks exist
        <EmptyState type={'Task'}></EmptyState>
      ) : (
        // Map through tasks and display them
        data?.tasks?.map(task => (
          <div className={style.task} key={task.uuid}>
            {/* Task details section */}
            <div className={style.titles}>
              <Details
                uuid={task?.uuid}
                name={task?.name}
                description={task?.description}
                type={type}
              ></Details>
            </div>
            {/* Task actions section (date, status, tags) */}
            <div className={style.actions}>
              <DateSelect
                data={handelDate(task?.dueDate)}
                Type={ButtonSelect}
                type={'task'}
                uuid={task?.uuid}
              ></DateSelect>
              <StatusSelect
                data={task?.status}
                Type={ButtonSelect}
                uuid={task?.uuid}
                type={'task'}
              ></StatusSelect>
              <TagSelect
                data={task?.tag}
                Type={ButtonSelect}
                type={'task'}
                uuid={task?.uuid}
              ></TagSelect>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskView;
