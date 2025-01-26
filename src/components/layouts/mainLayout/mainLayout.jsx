import Navbar from '../../features/navbar/navbar/navbar';
import Sidebar from '../../features/SidebarMenu/recent/recent';
import styles from './mainLayout.module.css';

const MainLayout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Navbar />
      <div className={styles.container}>
        <Sidebar />
        <main className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;