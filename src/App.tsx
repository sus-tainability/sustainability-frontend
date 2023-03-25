import { setupIonicReact } from "@ionic/react";
import { RecoilRoot } from "recoil";
import BaseRouter from "./components/Routers/BaseRouter";
import { GoogleOAuthProvider } from "@react-oauth/google";

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

setupIonicReact();

const App: React.FC = () => {
  const client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";

  return (
    <GoogleOAuthProvider clientId={client_id}>
      <RecoilRoot>
        <BaseRouter />
        <Toaster />
      </RecoilRoot>
    </GoogleOAuthProvider>
  );
};

export default App;
