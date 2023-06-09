import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import './index.css'
import LandingPage from "./components/LandingPage";
import SpotDetails from "./components/SpotDetails";
import SpotManagement from "./components/SpotManagement";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded &&
      <Switch>
        <Route exact path={'/'}>
          <LandingPage />
        </Route>
        <Route exact path={'/spots/current'}>
          <SpotManagement />
        </Route>
        <Route exact path={'/spots/:id'}>
          <SpotDetails />
        </Route>
      </Switch>}
    </>
  );
}

export default App;
