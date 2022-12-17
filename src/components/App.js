import { useEffect, useState } from "react";
import AppRouter from "components/AppRouter";
import { authService } from "fbBase";


function App() {

  const [ init, setInit ] = useState(false);
  const [ userObj, setUserObj ] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      setInit(true);
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
        //setUserObj(user);
      }      
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    if (user) {
      setUserObj({
        displayName: user.displayName,
        uid: user.uid,
        updateProfile: (args) => user.updateProfile(args),
        
      });
      //setUserObj(Object.assign({}, user));
    } else {
      setUserObj(null);
    }
  }

  return (
    <>
      { init ? <AppRouter refreshUser={refreshUser} isLoggedIn={ Boolean(userObj) } loginedUser={userObj}/> : "initializing..."}
    </>
  );
}

export default App;
