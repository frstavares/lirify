import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import Login from "./views/Login";
import Home from "./views/Home";
import { useQuery } from "./tools/useQuery";

export default function App() {
  const query = useQuery();
  const isLoggedIn = query.get("accessToken") ? true : false;

  return (
    <Switch>
      <Route exact path="/">
        {isLoggedIn ? <Home /> : <Login />}
      </Route>
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
}

function NoMatch() {
  let location = useLocation();

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}
