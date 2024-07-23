import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AllReviews from "../pages/AllReviews";
import NavBar from "./NavBar";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import NewReview from "../pages/NewReview";
import NewGame from "../pages/NewGame";
import AllGames from "../pages/AllGames"

function App() {
  const [user, setUser] = useState(null);
  const [newReviewPosted, setNewReviewPosted] = useState(false);

  useEffect(() => {
    fetch("/check_session")
      .then((response) => {
        if (response.ok) {
          response.json().then((user) => setUser(user));
        } else {
          setUser(null); 
        }
      })
      .catch((error) => {
        console.error("Error checking session:", error);
        setUser(null); 
      });
  }, []);

  useEffect(()=>{
    const handleBeforeUnload = (event) =>{
      setUser(null);

      fetch("/clear", {method:"delete"})
      .then((r)=>{
        console.log("Session cleared")
      }).catch((error)=>{
        console.log("Error clearing session: ", error)
      });
    };

    window.addEventListener("beforeunload", handleBeforeUnload)
  }, []);

    function handleLogin(user){
      setUser(user);
    }

    function handleLogout(){
      fetch("/logout", {
        method: "DELETE",
      }).then((setUser(null)))
    }

    function newReviewDone(){
      //console.log("Done handling new review")
      setNewReviewPosted(false);
    }

    function handleUpdateReview(){
      setNewReviewPosted(true);
    }


  return (
    <BrowserRouter>
      <h1>GameTalk</h1>
      <NavBar onLogout={handleLogout} className={"navBar"}/>
      <main>
        <Switch>
          <Route path="/allreviews">
            <AllReviews newReviewPosted={newReviewPosted} finishedUpdatingReviews={newReviewDone}/>
          </Route>
          <Route path="/login">
            <Login onLogin={handleLogin} userStatus={user}/>
          </Route>
          <Route path="/signup">
            <Signup onSignup={handleLogin} userStatus={user}/>
          </Route>
          <Route path="/newreview">
            <NewReview handleNewReview={handleUpdateReview} userStatus={user}/>
          </Route>
          <Route path="/newgame">
            <NewGame userStatus={user}/>
          </Route>
          <Route path="/allgames">
            <AllGames />
          </Route>
          <Route path="/">
            <Home handleLogout={handleLogout} userInfo={user} newReviewPosted={newReviewPosted} handleDeleteReview={handleUpdateReview} handleUpdateReview={handleUpdateReview}/>
          </Route>
        </Switch>
      </main>
    </BrowserRouter>
    
  );

}

export default App;
