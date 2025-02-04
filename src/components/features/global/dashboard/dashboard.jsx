import style from './dashboard.module.css';
import Board from '../board/board';
import ChangeType from '../../../common/changeType/changeType';
import { useState, useRef } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import Search from '../filter/search/search';
import Filter from '../filter/filter/filter';
const Dashboard = () => {
  const [nameSearch, setNameSearch] = useState();
  const [search, setSearch] = useState();
  const searchRef = useRef(null);
  useHotkeys('ctrl+a', () => {
    searchRef.current?.focus();
  });
  const handelSearchData = e => {
    setSearch(e);
  };
  return (
    <main className={style.dashboardContainer}>
      <header className={style.header}>
        <h1>
          Welcome back <span className={style.name}>John Doe</span>
        </h1>
        <div className={style.filters}>
          <Search
            searchData={e => {
              setNameSearch(e);
            }}
          />
          <div className={style.filter}>
            <Filter searchData={handelSearchData} />
            <ChangeType />
          </div>
        </div>
      </header>
      <Board nameSearch={nameSearch} search={search} />
    </main>
  );
};

export default Dashboard;
