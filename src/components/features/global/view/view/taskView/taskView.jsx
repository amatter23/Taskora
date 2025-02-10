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
import Delete from '../../delete/delete';
import { IoIosArrowForward } from 'react-icons/io';
import { useState } from 'react';
import Filter from '../../../filter/filter/filter';
import { useEffect } from 'react';
const TaskView = ({ type, data }) => {
  const handleDate = useHandleDates;
  const [newTask, setNewTask] = useState(false);
  const [dataSearch, setDataSearch] = useState(data?.tasks);
  const getData = e => {
    if (!data?.tasks) return;
    if (!e?.status?.name) {
      setDataSearch(data.tasks);
      return;
    }
    setDataSearch(() => {
      return data.tasks.filter(task => {
        return task.status.name === e.status.name;
      });
    });
  };
  useEffect(() => {
    setDataSearch(data?.tasks);
  }, [data?.tasks]);
  return (
    <div className={style.tasks}>
      <div className={style.header}>
        <div className={style.title}>
          {dataSearch?.length === 0 ? (
            <IoIosArrowForward />
          ) : (
            <IoIosArrowDown />
          )}

          <h4>
            Tasks <span>{dataSearch?.length}</span>
          </h4>
        </div>
        <div className={style.actions}>
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
          <div>
            <Filter defaultValue={'status'} searchData={getData} />
          </div>
        </div>
      </div>

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
      ) : null}

      {dataSearch?.length === 0 ? (
        <EmptyState type={'Task'}></EmptyState>
      ) : (
        dataSearch?.map(task => (
          <div className={style.task} key={task.uuid}>
            <div className={style.titles}>
              <Details
                uuid={task?.uuid}
                name={task?.name}
                description={task?.description}
                type={'task'}
              ></Details>
            </div>
            <div className={style.actions}>
              <DateSelect
                data={handleDate(task?.dueDate)}
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
              <div>
                <Delete type={'task'} uuid={task?.uuid}></Delete>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskView;
