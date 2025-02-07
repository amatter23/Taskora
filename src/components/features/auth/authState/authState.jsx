import { Link } from 'react-router-dom';
const AuthState = ({ title, link, type }) => {
  return (
    <div>
      <h5>
        {title}
        <Link to={link}>{type}</Link>
      </h5>
    </div>
  );
};

export default AuthState;
