import { useSelector } from "react-redux";

const WithGuard = (Compnent) => {
  const Wrapper = () => {
    const { isLoggedIn } = useSelector((state) => state.Auth);
    // logic here

    return isLoggedIn ? <Compnent /> : <h1> hello User, please Login First</h1>;
  };
  return Wrapper;
};

export default WithGuard;
