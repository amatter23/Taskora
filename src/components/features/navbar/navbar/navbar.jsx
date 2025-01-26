import style from './navbar.module.css';
import Logo from '../logo/logo';
import Image from '../image/image';
const Navbar = () => {
  return (
    <nav>
      <div className={style.logo}>
        <Logo></Logo>
      </div>
      <div className={style.acions}>
        <Image></Image>
      </div>
    </nav>
  );
};

export default Navbar;
