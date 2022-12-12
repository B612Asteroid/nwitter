import { useEffect, useState } from "react";
import AppRouter from "components/AppRouter";
import { authService } from "fbBase";


function App() {

  const [ init, setInit ] = useState(false);
  const [ userObj, setUserObj ] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      setInit(true);
      setUserObj(user);
      console.log(user);
    });
  }, [])
  return (
    <>
      { init ? <AppRouter isLoggedIn={ Boolean(userObj) } loginedUser={userObj}/> : "initializing..."}
    </>
  );
}

export default App;
