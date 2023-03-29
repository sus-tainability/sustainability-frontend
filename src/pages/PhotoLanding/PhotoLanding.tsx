/* eslint-disable jsx-a11y/alt-text */
import { IonContent, IonPage, IonText } from "@ionic/react";

import InformationFooter from "@/components/InformationFooter";
import AppButton from "@/components/AppButton/AppButton";

import photoLandingImg from "@/assets/photoLandingImg.png";
import { ReactComponent as PhotoPlaceholder } from "@/assets/photoPlaceholder.svg";

export const PhotoLanding: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <div className="h-full bg-gradient-to-b from-[#070300] to-[#3A1D0B]">
          <img className="w-full" src={photoLandingImg} />
          <InformationFooter heightOffSet={300}>
            <div className="flex flex-col gap-5 p-8">
              <IonText className="text-[36px] text-lightShade font-bold">
                You are <br />
                almost there!
              </IonText>

              <div className="bg-white rounded-xl flex justify-between items-center px-5 py-4">
                <IonText className="font-bold font-body">
                  Your
                  <br /> submission
                </IonText>
                <PhotoPlaceholder />
              </div>

              <IonText className="font-body text-lightShade text-[16px]">
                Before submitting your challenge attempt, please help us verify
                your peers’ submissions! complete a simple community
                verification. This is ensures that your peers do the right
                thing!
              </IonText>

              <div className="grid grid-cols-2 grid-rows-1 gap-4">
                <AppButton bgColour="bg-[#F5F8F8]" className="py-5">
                  Back
                </AppButton>

                <AppButton className="py-5">Let's Go!</AppButton>
              </div>
            </div>
          </InformationFooter>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PhotoLanding;
