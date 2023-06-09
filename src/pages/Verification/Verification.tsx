import React, { useEffect, useState } from "react";
import { IonContent, IonPage, IonText, useIonRouter } from "@ionic/react";

import AppButton from "@/components/AppButton";
import AssetService, {
  CreateImageAssetData,
  PendingAsset,
} from "@/api/Asset/AssetService";

import { useRecoilState } from "recoil";

import profileBgImg from "@/assets/profile_bg.png";
import { ReactComponent as CrossIcon } from "@/assets/verification/cross.svg";
import { ReactComponent as TickIcon } from "@/assets/verification/tick.svg";
import { useApi } from "@/api/ApiHandler";
import { photoAtom } from "@/utils/atoms/photo";
import EventService from "@/api/Event/EventService";
import { routes } from "@/constants/routes";
import { demoAtom } from "@/utils/atoms/demo";
import LoadingPage from "@/components/LoadingPage/LoadingPage";

const Verification: React.FC = () => {
  const router = useIonRouter();
  const [verificationAssets, setVerificationAssets] = useState<PendingAsset[]>(
    []
  );
  const [photoState] = useRecoilState(photoAtom);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [attemptId, setAttemptId] = useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [demo, _] = useRecoilState(demoAtom);
  const [getEventById] = useApi(
    (id: number) => EventService.getEventById(id),
    false,
    false,
    false
  );
  const [createNewImageAsset] = useApi(
    (data: CreateImageAssetData) => AssetService.createNewImageAsset(data),
    true,
    true,
    true
  );
  const [getPendingAssets] = useApi(
    () => AssetService.getPendingAssets(),
    false,
    false,
    false
  );
  const [validateImageAsset] = useApi(
    (id: number) => AssetService.validateImageAsset(id),
    false,
    false,
    false
  );
  const [rejectImageAsset] = useApi(
    (id: number) => AssetService.rejectImageAsset(id),
    false,
    false,
    false
  );

  const getData = async () => {
    setIsLoading(true);
    const res = await getPendingAssets();
    setIsLoading(false);
    if (res && res.data) {
      res.data.sort(
        (a: PendingAsset, b: PendingAsset) =>
          a.percentageComplete - b.percentageComplete
      );

      setVerificationAssets(res.data.splice(0, 3));
    }
    if (photoState.eventId && photoState.eventId !== 0) {
      const eventRes = await getEventById(photoState.eventId);
      if (eventRes && eventRes.data) {
        setAttemptId(eventRes.data.attempt.attemptId);
      }
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createAsset = async () => {
    await createNewImageAsset({
      photoData: photoState,
      attemptId,
    });
  };

  const nextImage = async () => {
    if (currentIndex < verificationAssets.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
      setIsLoading(true);
      await createAsset();
      setIsLoading(false);
      const base = routes.story.base;
      const game = `${base}/game/${photoState.eventId}`;
      router.push(game, "none", "replace");
    }
  };

  const userValidateOnClick = async () => {
    setIsLoading(true);
    await Promise.all([
      validateImageAsset(verificationAssets[currentIndex].id),
      nextImage(),
    ]);
    setIsLoading(false);
  };

  const userRejectOnClick = async () => {
    setIsLoading(true);
    await Promise.all([
      rejectImageAsset(verificationAssets[currentIndex].id),
      nextImage(),
    ]);
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <LoadingPage />}
      {!isLoading && (
        <IonPage>
          <IonContent>
            <div className="h-full">
              <img
                className="fixed w-full h-full"
                src={profileBgImg}
                alt="background"
              />
              <div className="fixed w-full h-full bg-black opacity-60" />

              <div className="relative h-full p-8 flex flex-col gap-5">
                <IonText className="text-[36px] text-lightShade font-bold">
                  {verificationAssets[currentIndex]?.validationText}
                </IonText>

                <div className="w-[100%] aspect-1 min-h-[200px] rounded-xl bg-white">
                  <img
                    src={verificationAssets[currentIndex]?.imageUrl}
                    alt="verify_image"
                    className="w-full h-full rounded-xl object-cover"
                  />
                </div>

                <IonText className="text-lightShade text-center underline-offset-2 underline">
                  How to verify?
                </IonText>

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
      )}
    </>
  );
};

export default Verification;
