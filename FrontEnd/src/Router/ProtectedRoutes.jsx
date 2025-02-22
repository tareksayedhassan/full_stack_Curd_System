import { useSelector } from "react-redux";

const ProtectedRoutes = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.Auth);

  return isLoggedIn ? children : <h1>hello user , please Login first</h1>;
};

export default ProtectedRoutes;
