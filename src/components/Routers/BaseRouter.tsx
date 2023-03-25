import React, { useEffect, useState } from "react";
import { routes } from "@/constants/routes";
import { Redirect, Route } from "react-router-dom";
import ApiService from "@/api/ApiService";
import { getLocalStorageValue } from "@/utils/miscellaneous";
import { useRecoilState } from "recoil";
import { userAtom } from "@/utils/atoms/user";
import useAsync from "@/hooks/useAsync";
import { useApi } from "@/api/ApiHandler";
import UserService from "@/api/User/UserService";
import { personCircleOutline, gameControllerOutline } from "ionicons/icons";

import Home from "@pages/Landing/Home";
import Login from "@pages/Landing/Login";
import Vote from "@pages/Story/Vote";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
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
    <IonApp>
      <IonReactRouter>
        {!isLoggedIn && (
          <IonRouterOutlet>
            <Route exact path={routes.authentication.login} component={Login} />
            <Redirect to={defaultRoute()} />
          </IonRouterOutlet>
        )}

        {isLoggedIn && (
          <IonTabs>
            <IonRouterOutlet animated={true} mode="ios">
              <Route exact path={routes.home} component={Home} />
              <Route exact path={routes.story.vote} component={Vote} />
              <Redirect to={defaultRoute()} />
            </IonRouterOutlet>
            <IonTabBar mode="ios" className="py-2" slot="bottom">
              <IonTabButton tab="tab1" href={routes.home}>
                <IonIcon aria-hidden="true" icon={gameControllerOutline} />
                <IonLabel>Challenges</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab2" href="/tab2">
                <IonIcon aria-hidden="true" icon={personCircleOutline} />
                <IonLabel>Profile</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        )}
      </IonReactRouter>
    </IonApp>
  );
};

export default BaseRouter;
