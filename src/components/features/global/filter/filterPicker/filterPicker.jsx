import { useSelector } from 'react-redux';
import { useState, useRef } from 'react';
import style from './filterPicker.module.css';
import { selectAllStatuses } from '../../../../../store/selectors/statuses/allStatusesSelector';
import useHandleNames from '../../../../../hooks/useHandleNames';

const FilterPicker = ({ onChange, defaultValue }) => {
  const [search, setSearch] = useState({
    date: '',
    status: '',
  });
  const statuses = useSelector(selectAllStatuses);
  const handelName = useHandleNames();
  return (
    <div className={style.filterContainer}>
      <div className={style.filterFields}>
        {defaultValue === 'status' || defaultValue === undefined ? (
          <div className={style.filterSection}>
            <h4>status</h4>
            <div className={style.statusGrid}>
              {statuses.map(status => (
                <div
                  onClick={() => {
                    onChange({
                      ...search,
                      status: status,
                    });
                    setSearch({
                      ...search,
                      status: status,
                    });
                  }}
                  key={status.name}
                  className={
                    search?.status?.name === status.name
                      ? style.active
                      : style.statusOption
                  }
                >
                  <p>{handelName(status.name)}</p>
                  <div
                    style={{ backgroundColor: status.color }}
                    className={style.statusIndicator}
                  ></div>
                </div>
              ))}
              <div
                onClick={() => {
                  onChange({
                    ...search,
                    status: '',
                  });
                  setSearch({
                    ...search,
                    status: '',
                  });
                }}
                key={''}
                className={
                  search.status === '' ? style.active : style.statusOption
                }
              >
                <p>All</p>
                <div className={style.statusIndicator}></div>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
        {defaultValue === 'date' || defaultValue === undefined ? (
          <div className={style.filterSection}>
            <h4>Date</h4>
            <div className={style.dateGrid}>
              <p
                onClick={() => {
                  onChange({
                    ...search,
                    date: 'today',
                  });
                  setSearch({
                    ...search,
                    date: 'today',
                  });
                }}
                className={
                  search.date === 'today' ? style.active : style.dateOption
                }
              >
                Today
              </p>
              <p
                onClick={() => {
                  onChange({
                    ...search,
                    date: 'week',
                  });
                  setSearch({
                    ...search,
                    date: 'week',
                  });
                }}
                className={
                  search.date === 'week' ? style.active : style.dateOption
                }
              >
                This Week
              </p>
              <p
                onClick={() => {
                  onChange({
                    ...search,
                    date: 'month',
                  });
                  setSearch({
                    ...search,
                    date: 'month',
                  });
                }}
                className={
                  search.date === 'month' ? style.active : style.dateOption
                }
              >
                This Month
              </p>
              <p
                onClick={() => {
                  onChange({
                    ...search,
                    date: '',
                  });
                  setSearch({
                    ...search,
                    date: '',
                  });
                }}
                className={search.date === '' ? style.active : style.dateOption}
              >
                All
              </p>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default FilterPicker;
