
import AuthForm from "./components/AuthForm";
import Carasol from "./components/Carasol";
import AuthContext from "./components/auth-context";
import { useContext, Fragment } from "react";
import Navbar from "./components/Navbar"
function App() {
  const authCtx = useContext(AuthContext)
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <Fragment>
    <Navbar />
      {isLoggedIn ? <Carasol /> : <AuthForm />}
    </Fragment>
  );
}

export default App;
