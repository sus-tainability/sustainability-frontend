import React, { useEffect } from "react";
import { IonContent, IonPage, IonText } from "@ionic/react";

import AppButton from "@/components/AppButton";
import AssetService, { AssetData } from "@/api/Asset/AssetService";

import { useRecoilState } from "recoil";
import { verificationAtom } from "@/utils/atoms/verification/atom";

import profileBgImg from "@/assets/profile_bg.png";
import { ReactComponent as CrossIcon } from "@/assets/verification/cross.svg";
import { ReactComponent as TickIcon } from "@/assets/verification/tick.svg";

const Verification: React.FC = () => {
  const [verificationAsset, setVerificationAsset] = useRecoilState(verificationAtom);
  const verifyObjectName = "e-statement switch";

  useEffect(() => {
    const getData = async () => {
      const res = await AssetService.getPendingAssets();
      if (res && res.data) {

        if (res.data.length > 0) {
          // todo: choose image asset
          const chosenAsset = (res.data[0] as AssetData);

          setVerificationAsset({
            imageId: chosenAsset.id,
            imageUrl: chosenAsset.imgUrl,
            itemName: verifyObjectName // todo,
          });
        }
        else {
          console.log("No image to verify!");
        }
      }
    };
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userValidateOnClick = () => {
    AssetService.validateImageAsset(verificationAsset.imageId);
    // todo: exit?
  };

  const userRejectOnClick = () => {
    AssetService.rejectImageAsset(verificationAsset.imageId);
    // todo: exit?
  };

  return (
    <IonPage>
      <IonContent>
        <div className="h-full">
          <img className="fixed w-full h-full" src={profileBgImg} alt="background"/>
          <div className="fixed w-full h-full bg-black opacity-60" />

          <div className="relative h-full p-8 flex flex-col gap-5">
            <IonText className="text-[36px] text-lightShade font-bold">
              Verify if this is a {verificationAsset.itemName}
            </IonText>

            <div className="w-full h-fit min-h-[200px] rounded-xl bg-white">
              <img src={verificationAsset.imageUrl} alt="verify_image" />
            </div>

            <IonText className="text-lightShade text-center underline-offset-2 underline">How to verify?</IonText>

            <div className="grid grid-cols-2 grid-rows-1 gap-4">
              <AppButton 
                bgColour="bg-[#F5F8F8]" 
                className="py-5 flex items-center justify-center"
                onClick={userRejectOnClick}
              >
                <CrossIcon />
              </AppButton>

              <AppButton 
                className="py-5 flex items-center justify-center"
                onClick={userValidateOnClick}
              >
                <TickIcon />
              </AppButton>
            </div>
          </div>
        </div>
        
      </IonContent>
    </IonPage>
  );
};

export default Verification;