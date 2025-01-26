import style from './lastFour.module.css';
import MiniCard from '../miniCard/miniCard';
import Header from '../header/header';
import useLastFour from '../../../../hooks/useLastFour';
import EmptyState from '../../../common/emptyState/emptyState';
const LastFour = ({ type }) => {
  const data = useLastFour(type);
  if (data.length === 0) return <EmptyState></EmptyState>;
  return (
    <>
      <Header type={type}></Header>
      <div className={style.miniCard}>
        {data.map(item => (
          <MiniCard key={item.name} type={type} uuid={item.uuid}></MiniCard>
        ))}
      </div>
    </>
  );
};

export default LastFour;
