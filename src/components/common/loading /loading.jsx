import classes from './loading.module.css';
const Loading = ({ color, text }) => {
  return (
    <div className={classes.container}>
      <div
        className={classes.spinner}
        style={{
          borderColor: `${color} transparent transparent transparent`,
        }}
      />
      <h1>{text}</h1>
    </div>
  );
};
Loading.defaultProps = {
  text: 'One moment! Your productivity is loading.',
};

export default Loading;
