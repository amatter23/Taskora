import style from './board.module.css';
import BoardColumn from '../boardColumn/boardColumn';
import { useSelector } from 'react-redux';
import { selectAllStatuses } from '../../../../store/selectors/statuses/allStatusesSelector';
import useSearch from '../../../../hooks/useSearch';
import { useState, useEffect } from 'react';
const Board = ({ search, nameSearch }) => {
  const statuses = useSelector(selectAllStatuses);
  const type = useSelector(state => state.typeView.typeView);
  const [data, setData] = useState();
  const dataSearch = useSearch({
    list: statuses,
    from: 'name',
    to: search?.status?.name,
  });
  const checkIfDataExist = e => {
    setData(e);
  };

  useEffect(() => {
    setData();
  }, [search, nameSearch]);

  return (
    <main className={style.boardContainer}>
      {data?.length === 0 ? (
        <main className={style.emptyContent}>
          <h1>No Content Add your {type} now</h1>
        </main>
      ) : (
        dataSearch.map(status => (
          <BoardColumn
            checkIfDataExist={checkIfDataExist}
            search={search}
            nameSearch={nameSearch}
            statusUuid={status.uuid}
            key={status.uuid}
          />
        ))
      )}
    </main>
  );
};

export default Board;
