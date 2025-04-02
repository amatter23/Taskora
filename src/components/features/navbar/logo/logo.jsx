import style from "./logo.module.css";

const Logo = () => {
  return (
    <div className={style.logo}>
      <img
        src="/logo.png"
        style={{
          width: "1.5rem",
          height: "1.5rem",
        }}
        alt="Logo"
      />
      <div className={style.title}>
        <h1>Taskora</h1>
      </div>
    </div>
  );
};

export default Logo;
