import style from './boardColumn.module.css';
import Card from '../card/card';
import { useSelector } from 'react-redux';
import { selectStatusWithUuid } from '../../../../store/selectors/statuses/statusWithUuidSelector';
import { selectProjectsWithStatues } from '../../../../store/selectors/projects/projectsWithStatuesSelector';
import { selectTasksWithStatues } from '../../../../store/selectors/tasks/tasksWithStatuesSelector';
import useHandleNames from '../../../../hooks/useHandleNames';
import useSearch from '../../../../hooks/useSearch';
import { useEffect } from 'react';
const BoardColumn = ({ statusUuid, nameSearch, search, checkIfDataExist }) => {
  const status = useSelector(state => selectStatusWithUuid(state, statusUuid));
  const type = useSelector(state => state.typeView.typeView);
  const data = useSelector(state =>
    type === 'project'
      ? selectProjectsWithStatues(state, statusUuid)
      : selectTasksWithStatues(state, statusUuid)
  );
  const handleNames = useHandleNames();
  const nameFiltered = useSearch({ list: data, from: 'name', to: nameSearch });
  const dataFilter = useSearch({
    list: nameFiltered,
    from: 'dueDate',
    to: { date: search?.date },
  });
  useEffect(() => {
    checkIfDataExist(dataFilter);
  }, [search]);
  return (
    <>
      {dataFilter.length === 0 ? (
        ''
      ) : (
        <main className={style.column}>
          <header className={style.header}>
            <div className={style.title}>
              <h2>{handleNames(status.name)}</h2>
              <div className={style.count}>
                <div>{dataFilter.length}</div>
                <div>{type}s</div>
              </div>
            </div>
            <div
              style={{ backgroundColor: status.color }}
              className={style.color}
            ></div>
          </header>
          <div className={style.cardsContainer}>
            {dataFilter.map(project => {
              return (
                <Card key={project.uuid} type={type} uuid={project.uuid}></Card>
              );
            })}
          </div>
        </main>
      )}
    </>
  );
};

export default BoardColumn;
