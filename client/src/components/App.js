import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AllReviews from "../pages/AllReviews";
import NavBar from "./NavBar";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import NewReview from "../pages/NewReview";

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
      <h1>GameTalk</h1>
      <NavBar onLogout={handleLogout} className={"navBar"}/>
      <main>
        <Switch>
          <Route path="/allreviews">
            <AllReviews />
          </Route>
          <Route path="/login">
            <Login onLogin={handleLogin} userStatus={user}/>
          </Route>
          <Route path="/signup">
            <Signup onSignup={handleLogin} userStatus={user}/>
          </Route>
          <Route path="/newreview">
            <NewReview userStatus={user}/>
          </Route>
          <Route path="/">
            <Home userInfo={user}/>
          </Route>
        </Switch>
      </main>
    </BrowserRouter>
    
  );

}

export default App;
