/**
 * Options component displays a menu with Project and Task options
 * @param {function} onChange - Callback function that handles option selection
 * @returns {JSX.Element} A menu with clickable options
 */
import style from './options.module.css';
import { LuListTodo } from 'react-icons/lu';
import { GoProject } from 'react-icons/go';
const Options = ({ onChange }) => {
  return (
    <div className={style.moreOptions}>
      {/* Project option */}
      <div
        onClick={() => {
          onChange('project');
        }}
        className={style.option}
      >
        <GoProject />
        <h3>Project</h3>
      </div>
      {/* Task option */}
      <div
        onClick={() => {
          onChange('task');
        }}
        className={style.option}
      >
        <LuListTodo />
        <h3>Task</h3>
      </div>
    </div>
  );
};

export default Options;
