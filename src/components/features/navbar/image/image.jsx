import style from "./image.module.css";
import { useSelector } from "react-redux";
import useOpenUserPage from "../../../../hooks/auth/useOpenUserPage";

const Image = () => {
  const { handleClick } = useOpenUserPage();
  const userData = useSelector((state) => state.auth.user);

  return (
    <div onClick={handleClick} className={style.profile}>
      {userData.picture ? (
        <img src={userData.picture} />
      ) : (
        <div className={style.pic}>
          <h1>{userData.name ? userData.name.charAt(0).toUpperCase() : ""}</h1>
        </div>
      )}
    </div>
  );
};
export default Image;
