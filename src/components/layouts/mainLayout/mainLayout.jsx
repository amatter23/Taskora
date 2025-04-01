import Navbar from '../../features/navbar/navbar/navbar';
import Sidebar from '../../features/SidebarMenu/recent/recent';
import styles from './mainLayout.module.css';
import { useState, useEffect } from 'react';

const MainLayout = ({ children }) => {
  const [showEidCelebration, setShowEidCelebration] = useState(true);

  useEffect(() => {
    if (!sessionStorage.getItem('eidCelebrationShown')) {
      setShowEidCelebration(true);
      sessionStorage.setItem('eidCelebrationShown', 'true');
    }
  }, []);

  return (
    <div className={styles.layout}>
      <Navbar />
      <div className={styles.container}>
        <Sidebar />
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
