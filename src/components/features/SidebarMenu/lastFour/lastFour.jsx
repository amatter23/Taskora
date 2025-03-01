/**
 * LastFour component displays the last four items of a specific type
 * @param {string} type - The type of items to display
 */
import style from './lastFour.module.css';
import MiniCard from '../miniCard/miniCard';
import Header from '../header/header';
import useLastFour from '../../../../hooks/useLastFour';
import EmptyState from '../../../common/emptyState/emptyState';
import useAddNewContent from '../../../../hooks/useAddNewContent';
const LastFour = ({ type }) => {
  // Fetch the last four items of the specified type
  const data = useLastFour(type);
  // Hooks for managing modal visibility and content

  const NewContent = useAddNewContent();
  /**
   * Handler for opening new content modal
   */
  const handleClick = () => {
    NewContent(type);
  };

  return (
    <>
      {/* Header with button to add new content */}
      <Header onClick={handleClick} type={type}></Header>
      {/* Container for mini cards */}
      {data.length === 0 ? (
        <EmptyState type= {type}></EmptyState>
      ) : (
        <div className={style.miniCard}>
          {data.map(item => (
            <MiniCard key={item?.name} type={type} uuid={item?.uuid}></MiniCard>
          ))}
        </div>
      )}
    </>
  );
};

export default LastFour;
