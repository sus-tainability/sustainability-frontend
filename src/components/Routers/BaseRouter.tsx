import React, { useEffect, useState } from "react";
import { routes } from "@/constants/routes";
import { Redirect, Route, Switch } from "react-router-dom";
import ApiService from "@/api/ApiService";
import { getLocalStorageValue } from "@/utils/miscellaneous";
import { useRecoilState } from "recoil";
import { userAtom } from "@/utils/atoms/user";
import useAsync from "@/hooks/useAsync";
import { useApi } from "@/api/ApiHandler";
import UserService from "@/api/User/UserService";

import Home from "@pages/Landing/Home";
import Login from "@pages/Landing/Login";
import Vote from "@pages/Story/Vote";
import { IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

function isTokenExpired(token: string) {
  const expiry = JSON.parse(atob(token.split(".")[1])).exp;
  return Math.floor(new Date().getTime() / 1000) >= expiry;
}

const BaseRouter = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setUser] = useRecoilState(userAtom);
  const token = getLocalStorageValue(ApiService.authTokenKey);

  const [isLoggedIn] = useState<boolean>(
    (token && !isTokenExpired(token)) || false
  );

  const [getSelf] = useApi(() => UserService.getSelf(), false, false, false);
  const { execute, status, value } = useAsync(getSelf, false);

  useEffect(() => {
    execute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (status === "success" && value && value.data) {
      setUser((prev) => ({ ...prev, ...value.data }));
    }
  }, [setUser, status, value]);

  const defaultRoute = () => {
    if (!isLoggedIn) {
      return routes.authentication.login;
    }
    return routes.home;
  };

  return (
    <IonReactRouter>
      <IonRouterOutlet animated={true} mode="ios">
        <Switch>
          {isLoggedIn && (
            <>
              <Route exact path={routes.home} component={Home} />
              <Route exact path={routes.story.vote} component={Vote} />
            </>
          )}

          {/* You should only see login signup pages if you are not logged in */}
          {!isLoggedIn && (
            <Route exact path={routes.authentication.login} component={Login} />
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
