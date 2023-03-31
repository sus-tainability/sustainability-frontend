/* eslint-disable jsx-a11y/alt-text */
import { IonPage } from "@ionic/react";
import { Typewriter } from "react-simple-typewriter";

import loading from "@/assets/loading.gif";

const LoadingPage = () => {
  return (
    <IonPage>
      <div className="flex flex-col justify-center items-center w-full h-full bg-[#FBFBFB] absolute z-30 font-body">
        <img className="w-20" src={loading} />
        <p>
          Cleaning up{" "}
          <Typewriter
            words={[
              "the sky...",
              "the forests...",
              "the rivers...",
              "the oceans...",
            ]}
            loop={true}
          />
        </p>
      </div>
    </IonPage>
  );
};

export default LoadingPage;
