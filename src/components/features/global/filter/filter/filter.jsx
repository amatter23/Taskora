import DropDown from '../../view/dropDown/dropDown';
import style from './filter.module.css';
import { useState } from 'react';
import { FaFilter } from 'react-icons/fa6';
import FilterPicker from '../filterPicker/filterPicker';
import useHandleNames from '../../../../../hooks/useHandleNames';
const Filter = ({ searchData, defaultValue }) => {
  const handelNames = useHandleNames();
  const [search, setSearch] = useState();
  const handelSearchData = e => {
    searchData(e);
    setSearch(e);
  };

  return (
    <>
      <DropDown
        onChange={handelSearchData}
        content={FilterPicker}
        defaultValue={defaultValue}
        placement={'bottom'}
      >
        <div className={style.filter}>
          <div>
            {search?.status?.name
              ? handelNames(search?.status?.name)
              : 'Filter'}
          </div>
          <FaFilter color={search?.status?.color} />
        </div>
      </DropDown>
    </>
  );
};
export default Filter;
