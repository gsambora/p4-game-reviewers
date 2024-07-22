import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AllReviews from "../pages/AllReviews";

function App() {
  return (
    <BrowserRouter>
      <h1>Project Client</h1>
      <main>
        <Switch>
          <Route path="/allreviews">
            <AllReviews />
          </Route>
        </Switch>
      </main>
    </BrowserRouter>
    
  );

}

export default App;
