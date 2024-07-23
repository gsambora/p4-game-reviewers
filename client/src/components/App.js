import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AllReviews from "../pages/AllReviews";
import NavBar from "./NavBar";
import Home from "../pages/Home";
import LogIn from "../pages/LogIn";

function App() {
  const [user, setUser] = useState(null);

  useEffect(()=>{
    fetch("/check_session")
    .then((response)=>{
      if (response.ok) {
        response.json().then((user)=> setUser(user));
        }
      });
    }, []);

    function handleLogin(user){
      setUser(user);
    }

    function handleLogout(){
      setUser(null);
    }

  return (
    <BrowserRouter>
      <h1>Project Client</h1>
      <NavBar className={"navBar"}/>
      <main>
        <Switch>
          <Route path="/allreviews">
            <AllReviews />
          </Route>
          <Route path="/login">
            <LogIn onLogin={handleLogin} userStatus={user}/>
          </Route> 
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </main>
    </BrowserRouter>
    
  );

}

export default App;
