import style from './navbar.module.css';
import Logo from '../logo/logo';
import Image from '../image/image';
import ChangeThemeButton from '../../../common/changeThemeButton/changeThemeButton';
import MoreOptions from '../moreOptions/moreOptions/moreOptions';
import Logout from '../../../common/logout/logout';
const Navbar = () => {
  return (
    <nav>
      <div className={style.logo}>
        <Logo></Logo>
      </div>
      <div className={style.actions}>
        <MoreOptions></MoreOptions>
        <Logout></Logout>
        <div className={style.changeTheme}>
          <ChangeThemeButton
            size={'calc(var(--current-font-size-sm)*2.2)'}
          ></ChangeThemeButton>
        </div>
        <Image></Image>
      </div>
    </nav>
  );
};

export default Navbar;
