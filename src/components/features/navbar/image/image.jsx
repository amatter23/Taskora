import style from "./image.module.css";
import { useSelector } from "react-redux";
import useOpenUserPage from "../../../../hooks/auth/useOpenUserPage";
import { useState, useEffect } from "react";
import { useGetWinnerQuery } from "../../../../store/services/eidApi";

const Image = () => {
  const [runQuery, setRunQuery] = useState(false);
  const { data: winnersData, isLoading } = useGetWinnerQuery(undefined, {
    skip: !runQuery,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setRunQuery(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);
  const { handleClick } = useOpenUserPage();
  const userData = useSelector((state) => state.auth.user);
  const [isWinner, setIsWinner] = useState(false);
  console.log("winnersData", winnersData);
  useEffect(() => {
    const winners = winnersData?.winners || [];
    if (!isLoading && winners.length > 0 && userData?.uuid) {
      const winner = winners.find((winner) => winner === userData.uuid);
      setIsWinner(!!winner);
    }
  }, [isLoading, winnersData?.winners, userData?.uuid]);

  return (
    <div onClick={handleClick} className={style.profile}>
      <div className={`${isWinner ? style.winnerFrame : ""}`}>
        {userData.picture ? (
          <img src={userData.picture} />
        ) : (
          <div className={style.pic}>
            <h1>
              {userData.name ? userData.name.charAt(0).toUpperCase() : ""}
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};
export default Image;
