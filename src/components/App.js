import { useState } from "react";
import AppRouter from "components/AppRouter";
import { authService } from "fbBase";


function App() {

  const [ isLoggedIn, setIsLoggedIn ] = useState(authService.currentUser);
  return (
    <>
      <AppRouter isLoggedIn = { isLoggedIn } />
      <footer>&copy; {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
