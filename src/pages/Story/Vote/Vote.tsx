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
import { routes } from "@/constants/routes";
import { useHistory } from "react-router";

const Vote = () => {
  const [isOptionOne, setIsOptionOne] = useState(false);
  const [isOptionTwo, setIsOptionTwo] = useState(false);
  const hasVoted = isOptionOne || isOptionTwo;

  const history = useHistory();

  const redirectToGame = () => {
    history.push(routes.story.game);
  };

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
          <InformationFooter heightOffSet={300}>
            <div className="p-8">
              <p className="text-lightShade text-4xl font-header font-bold">
                Less Paper, <br /> More Trees
              </p>
              <div className="mt-3 flex gap-3 items-center text-lightShade font-body">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-20"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                </span>
                <p className="font-bold">Time Until Challenge:</p>
                <p className="mt-0.5">00:00:00</p>
              </div>
              <p className="mt-3 text-lightShade font-body">
                Deforestation is the major threat to the red pandas’ population.
                Even when forests are only partially cut down, deforestation can
                still lead to massive population losses for red pandas
              </p>
              <div className="flex w-full mt-8 justify-center items-center gap-10">
                <AppButton
                  onClick={() => {
                    setIsOptionOne(true);
                    setIsOptionTwo(false);
                  }}
                  className="h-28 w-28"
                >
                  <div className="relative flex flex-col justify-center items-center h-full">
                    <div>
                      <img src={boxImg} />
                      <p className="mt-2">Box</p>
                    </div>
                    {hasVoted && (
                      <>
                        <div className="absolute bottom-0 w-full h-full bg-[#00000093] rounded">
                          {isOptionOne && (
                            <span className="absolute -top-1 -right-1 flex">
                              <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-0.5 text-sm font-medium text-indigo-800">
                                Voted!
                              </span>
                            </span>
                          )}
                        </div>

                        <div
                          style={{ height: `${isOptionOne ? 60 : 56}%` }}
                          className={`absolute py-2 bottom-0 flex items-center justify-center
                              w-full greenGradient rounded origin-bottom animate-grow`}
                        >
                          <p className="font-bold font-header text-4xl animate-fadeIn">
                            {isOptionOne ? "60%" : "56%"}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </AppButton>
                <p className="font-body text-lightShade">or</p>
                <AppButton
                  onClick={() => {
                    setIsOptionOne(false);
                    setIsOptionTwo(true);
                  }}
                  className="h-28 w-28"
                >
                  <div className="relative flex flex-col justify-center items-center h-full">
                    <div>
                      <img src={paperImg} />
                      <p className="mt-2">Paper</p>
                    </div>
                    {hasVoted && (
                      <>
                        <div className="absolute bottom-0 w-full h-full bg-[#00000093] rounded">
                          {isOptionTwo && (
                            <span className="absolute -top-1 -right-1 flex">
                              <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-0.5 text-sm font-medium text-indigo-800">
                                Voted!
                              </span>
                            </span>
                          )}
                        </div>

                        <div
                          style={{ height: `${isOptionOne ? 40 : 44}%` }}
                          className={`absolute py-2 bottom-0 flex items-center justify-center
                              w-full greenGradient rounded origin-bottom animate-grow`}
                        >
                          <p className="font-bold font-header text-4xl animate-fadeIn">
                            {isOptionOne ? "40%" : "44%"}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </AppButton>
              </div>
              <div>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    redirectToGame();
                  }}
                  className="flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-lg font-semibold text-black shadow-sm bg-white bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 mt-5"
                >
                  Try out the Game Page! (Demo)
                </button>
              </div>
            </div>
          </InformationFooter>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Vote;
