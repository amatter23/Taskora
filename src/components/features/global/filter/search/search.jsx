import { useState, useRef } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import style from './search.module.css';
const Search = ({ searchData }) => {
  const searchRef = useRef(null);

  useHotkeys('ctrl+a', () => {
    searchRef.current?.focus();
  });
  return (
    <>
      <input
        className={style.input}
        type='text'
        placeholder='Search projects and tasks...'
        onChange={e => {
          searchData(e.target.value);
        }}
        ref={searchRef}
      />
    </>
  );
};

export default Search;
