import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Auth/Context";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return <span className="loading loading-spinner text-warning"></span>;
  }
  if (user) {
    return children;
  } else {
    return <Navigate to={`/signin`}></Navigate>;
  }
};

export default PrivateRoute;
