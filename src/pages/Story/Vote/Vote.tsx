/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
} from "@ionic/react";

import InformationFooter from "@/components/InformationFooter";
import AppButton from "@/components/AppButton";

import voteImg from "@/assets/voteImg.png";
import boxImg from "@/assets/boxImg.png";
import paperImg from "@/assets/paperImg.png";

const Vote = () => {
  const [hasVoted, setHasVoted] = useState(false);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar mode="ios">
          <IonTitle className="font-body">Pick Your Path</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="h-full bg-gradient-to-b from-[#070300] to-[#3A1D0B]">
          <img className="w-full" src={voteImg} />
          <InformationFooter heightOffSet={400}>
            <div className="p-8">
              <p className="text-lightShade text-4xl font-header font-bold">
                Less Paper, <br /> More Trees
              </p>
              <p className="mt-8 text-lightShade font-body">
                Deforestation is the major threat to the red pandas’ population.
                Even when forests are only partially cut down, deforestation can
                still lead to massive population losses for red pandas
              </p>
              <div className="flex w-full mt-8 justify-center items-center gap-10">
                <AppButton
                  onClick={() => setHasVoted(true)}
                  className="h-28 w-28"
                >
                  <div className="relative flex flex-col justify-center items-center h-full">
                    <div>
                      <img src={boxImg} />
                      <p className="mt-2">Box</p>
                    </div>
                    {hasVoted && (
                      <>
                        <div className="absolute bottom-0 w-full h-full bg-[#00000093] rounded" />
                        <div
                          style={{ height: `${100 - 40}%` }}
                          className={`absolute py-2 bottom-0 flex items-center justify-center
                              w-full greenGradient rounded origin-bottom animate-grow`}
                        >
                          <p className="font-bold font-header text-4xl animate-fadeIn">
                            60%
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </AppButton>
                <p className="font-body text-lightShade">or</p>
                <AppButton
                  onClick={() => setHasVoted(true)}
                  className="h-28 w-28"
                >
                  <div className="relative flex flex-col justify-center items-center h-full">
                    <div>
                      <img src={paperImg} />
                      <p className="mt-2">Paper</p>
                    </div>
                    {hasVoted && (
                      <>
                        <div className="absolute bottom-0 w-full h-full bg-[#00000093] rounded" />
                        <div
                          style={{ height: `${100 - 60}%` }}
                          className={`absolute py-2 bottom-0 flex items-center justify-center
                              w-full greenGradient rounded origin-bottom animate-grow`}
                        >
                          <p className="font-bold font-header text-4xl animate-fadeIn">
                            40%
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </AppButton>
              </div>
            </div>
          </InformationFooter>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Vote;
