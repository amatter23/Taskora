import '@theme-toggles/react/css/Classic.css';
import { Classic } from '@theme-toggles/react';
import { useTheme } from '../../../hooks/useTheme';
const ChangeThemeButton = ({ size }) => {
  const { toggleTheme, theme } = useTheme();

  return (
    <>
      <Classic
        toggled={theme === 'dark'}
        toggle={toggleTheme}
        style={{
          color: 'var(--text-color)',
          fontSize: size,
          display: 'flex',
        }}
        duration={500}
      />
    </>
  );
};

export default ChangeThemeButton;
