/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { IonPage, IonContent } from "@ionic/react";

import InformationFooter from "@/components/InformationFooter";
import AppButton from "@/components/AppButton";

import voteImg from "@/assets/voteImg.png";
import boxImg from "@/assets/boxImg.png";
import paperImg from "@/assets/paperImg.png";

const Vote = () => {
  return (
    <IonPage>
      <IonContent fullscreen={true}>
        <div className="relative h-screen bg-gradient-to-b from-[#070300] to-[#3A1D0B]">
          <img src={voteImg} />
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
                <AppButton className="p-5">
                  <>
                    <img src={boxImg} />
                    Box
                  </>
                </AppButton>
                <p className="font-body text-lightShade">or</p>
                <AppButton className="p-5">
                  <>
                    <img src={paperImg} />
                    Paper
                  </>
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
