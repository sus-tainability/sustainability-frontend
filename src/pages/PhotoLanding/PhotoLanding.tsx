import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { IonButton, IonButtons, IonContent, IonModal, IonPage, IonText, IonTitle, IonToolbar } from "@ionic/react";

import InformationFooter from "@/components/InformationFooter";
import AppButton from "@/components/AppButton/AppButton";
import { useRecoilState } from "recoil";
import { photoAtom } from "@/utils/atoms/photo/atom";

import photoLandingImg from "@/assets/photoLandingImg.png";
import { ReactComponent as PhotoPlaceholder } from "@/assets/photoPlaceholder.svg"
import { routes } from "@/constants/routes";

export const PhotoLanding: React.FC = () => {
  const history = useHistory();
  const [photo] = useRecoilState(photoAtom);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <IonPage>
      <IonContent>
        <div className="h-full bg-gradient-to-b from-[#070300] to-[#3A1D0B]">
          <img className="w-full" src={photoLandingImg} alt="background" />
          <InformationFooter heightOffSet={300}>
            <div className="flex flex-col gap-5 p-8">
              <IonText className="text-[36px] text-lightShade font-bold">
                You are <br />
                almost there!
              </IonText>

              <div 
                className="bg-white rounded-xl flex justify-between items-center px-5 py-4"
                onClick={() => setIsOpen(true)}
              >
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
                <AppButton bgColour="bg-[#F5F8F8]" className="py-5" onClick={() => history.push(routes.story.game)}>
                  Back
                </AppButton>

                <AppButton className="py-5">Let's Go!</AppButton>
              </div>
            </div>
          </InformationFooter>
        </div>

        <IonModal id="image-preview-modal" isOpen={isOpen}>
          <IonContent>
            <IonToolbar>
              <IonTitle>Preview</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsOpen(false)}>
                  Close
                </IonButton>
              </IonButtons>
            </IonToolbar>
            {!photo.takenPhoto && <IonText className="text-bold">
              No Photo Taken!
            </IonText>}
            {photo.takenPhoto && <img
              src={photo.takenPhoto.preview}
              alt='Preview'
            />}
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default PhotoLanding;
