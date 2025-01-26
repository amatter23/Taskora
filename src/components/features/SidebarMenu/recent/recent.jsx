import style from './recent.module.css';
import LastFour from '../lastFour/lastFour';

const Recent = ({ type }) => {
  return (
    <div className={style.recentContainer}>
      <LastFour type='project'></LastFour>
      <LastFour type='task'></LastFour>
    </div>
  );
};

export default Recent;
