import useGetRandomEmptyState from '../../../hooks/useGetRandomEmptyState';
import styles from './emptyState.module.css';

const EmptyState = ({ type }) => {
  const message = useGetRandomEmptyState(type);

  return (
    <div className={styles.emptyState}>
      <h2>{message.title}</h2>
      <p>{message.subtitle}</p>
    </div>
  );
};

export default EmptyState;
