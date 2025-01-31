/**
 * Main component that serves as a container for the Details component
 * @param {function} onNameChange - Handler function for name changes
 * @param {function} onDescriptionChange - Handler function for description changes
 */
import style from './main.module.css';
import Details from '../../details/details';

const Main = ({ onNameChange, onDescriptionChange }) => {
  return (
    <div className={style.main}>
      <Details
        onNameChange={e => {
          onNameChange(e);
        }}
        onDescriptionChange={e => {
          onDescriptionChange(e);
        }}
      ></Details>
    </div>
  );
};

export default Main;
