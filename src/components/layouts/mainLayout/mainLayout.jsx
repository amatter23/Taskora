import Navbar from '../../features/navbar/navbar/navbar';
import Sidebar from '../../features/SidebarMenu/recent/recent';
import styles from './mainLayout.module.css';
import EidCelebration from '../../features/eidCelebration/EidCelebration';
const MainLayout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <EidCelebration />
      <Navbar />
      <div className={styles.container}>
        <Sidebar />
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
