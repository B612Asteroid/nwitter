import { useEffect, useState } from "react";
import AppRouter from "components/AppRouter";
import { authService } from "fbBase";


function App() {

  const [ init, setInit ] = useState(false);
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      setIsLoggedIn(user != null);
      setInit(true);
    });
  }, [])
  return (
    <>
      { init ? <AppRouter isLoggedIn = { isLoggedIn } /> : "initializing..."}
      <footer>&copy; {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
