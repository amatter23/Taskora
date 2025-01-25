import style from './dashboard.module.css';
import Board from '../board/board';
import ChangeType from '../../../common/changeType/changeType';
const Dashboard = () => {
  return (
    <main className={style.dashboardContainer}>
      <header className={style.header}>
        <h1>
          Welcome back <span className={style.name}>John Doe</span>
        </h1>
        <ChangeType />
      </header>
      <Board />
    </main>
  );
};

export default Dashboard;
