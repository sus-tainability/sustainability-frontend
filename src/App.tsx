/* eslint-disable jsx-a11y/alt-text */
import { setupIonicReact } from "@ionic/react";
import { RecoilRoot } from "recoil";
import BaseRouter from "./components/Routers/BaseRouter";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CacheBuster from "./components/CacheBuster";

import phoneImg from "./assets/phone.png";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

/* Tailwind styles */
import "./theme/tailwind.css";
import Toaster from "./components/Toaster";
import DialogCard from "./components/DialogCard";

setupIonicReact();

const App: React.FC = () => {
  const client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";
  const isPortrait = window.matchMedia("(orientation: portrait)").matches;
  const [showSwapOrientation, setShowSwapOrientation] = useState(!isPortrait);
  const queryClient = new QueryClient();

  window
    .matchMedia("(orientation: portrait)")
    .addEventListener("change", (e) => {
      const isPortrait = e.matches;
      if (isPortrait) {
        setShowSwapOrientation(false);
      } else {
        setShowSwapOrientation(true);
      }
    });

  return (
    <CacheBuster>
      {(isLoading, isLatestVersion, refreshCacheAndReload) => {
        if (isLoading) return null;
        if (!isLoading && !isLatestVersion) {
          refreshCacheAndReload();
        }

        return (
          <GoogleOAuthProvider clientId={client_id}>
            <QueryClientProvider client={queryClient}>
              <RecoilRoot>
                {showSwapOrientation && (
                  <div
                    style={{
                      backdropFilter: "blur(8px)",
                      WebkitBackdropFilter: "blur(8px)",
                    }}
                    className="z-30 w-full h-full absolute flex justify-center items-center"
                  >
                    <div className="w-80 h-56 rounded-lg bg-white flex flex-col justify-center items-center font-body">
                      <img className="w-28" src={phoneImg} />
                      <p className="mt-3">Rotate Your Phone to Portrait Mode</p>
                    </div>
                  </div>
                )}
                <BaseRouter />
                <Toaster />
                <DialogCard />
              </RecoilRoot>
            </QueryClientProvider>
          </GoogleOAuthProvider>
        );
      }}
    </CacheBuster>
  );
};

export default App;
