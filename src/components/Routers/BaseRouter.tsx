import React, { useEffect, useState } from "react";
import { routes } from "@/constants/routes";
import { Redirect, Route, Switch } from "react-router-dom";
import ApiService from "@/api/ApiService";
import { getLocalStorageValue } from "@/utils/miscellaneous";
import { useRecoilState } from "recoil";
import { userAtom } from "@/utils/atoms/user";
import { useApi } from "@/api/ApiHandler";
import UserService from "@/api/User/UserService";

import Home from "@pages/Landing/Home";
import Login from "@pages/Landing/Login";
import Register from "@pages/Landing/SignUp";
import { IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

function isTokenExpired(token: string) {
  const expiry = JSON.parse(atob(token.split(".")[1])).exp;
  return Math.floor(new Date().getTime() / 1000) >= expiry;
}

const BaseRouter = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const token = getLocalStorageValue(ApiService.authTokenKey);

  const [isLoggedIn] = useState<boolean>(
    (token && !isTokenExpired(token)) || false
  );
  const [isOnboarded, setIsOnboarded] = useState<boolean>(false);
  //   const [getSelf] = useApi(() => UserService.getSelf(), false, false, false);

  const getUser = async () => {
    // const res = await getSelf();
    // if (res && res.data) {
    //   setUser((prev) => ({ ...prev, ...res.data }));
    // }
  };

  useEffect(() => {
    getUser();
  }, []);

  const defaultRoute = () => {
    if (!isLoggedIn) {
      return routes.authentication.login;
    }
    return routes.home;
  };

  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Switch>
          <Route exact path={routes.home} component={Home} />

          {/* You should only see login signup pages if you are not logged in */}
          {!isLoggedIn && (
            <Route exact path={routes.authentication.login} component={Login} />
          )}
          {!isLoggedIn && (
            <Route
              exact
              path={routes.authentication.signup}
              component={Register}
            />
          )}

          <Route path="*">
            <Redirect to={defaultRoute()} />
          </Route>
        </Switch>
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default BaseRouter;
