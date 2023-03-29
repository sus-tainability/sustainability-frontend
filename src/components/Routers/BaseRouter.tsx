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

import Home from "@pages/Landing/Home";
import Login from "@pages/Landing/Login";
import Profile from "@pages/Profile/Profile";
import Game from "@/pages/Story";
import PhotoLanding from "@/pages/PhotoLanding/PhotoLanding";

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
    return routes.story.base;
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
              <Route exact path={routes.story.base} component={Home} />
              <Route exact path={routes.profile.base} component={Profile} />
              <Route exact path={routes.story.game} component={Game} />
              <Route exact path={routes.story.photoLanding} component={PhotoLanding} />
              <Redirect to={defaultRoute()} />
            </IonRouterOutlet>
            <IonTabBar
              selectedTab="profile"
              mode="ios"
              className="pt-2 pb-5"
              slot="bottom"
            >
              <IonTabButton tab="story" href={routes.story.base}>
                <IonIcon aria-hidden="true" icon={gameControllerOutline} />
                <IonLabel>Challenges</IonLabel>
              </IonTabButton>
              <IonTabButton tab="profile" href={routes.profile.base}>
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
