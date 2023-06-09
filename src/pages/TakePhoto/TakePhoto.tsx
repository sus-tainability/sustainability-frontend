import React, { useEffect } from "react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

import { routes } from "@/constants/routes";

import { useRecoilState } from "recoil";
import { toasterAtom, ToasterType } from "@/utils/atoms/toaster";
import { photoAtom } from "@/utils/atoms/photo/atom";
import { demoAtom } from "@/utils/atoms/demo";
import { useIonRouter } from "@ionic/react";

const TakePhoto = () => {
  const router = useIonRouter();
  const [photo, setPhoto] = useRecoilState(photoAtom);
  const [demo] = useRecoilState(demoAtom);
  const [, setToasterState] = useRecoilState(toasterAtom);

  const takePhotoHandler = async () => {
    try {
      const takenPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 80,
        width: 224,
        height: 224,
      });
      if (!photo || !takenPhoto.webPath) return;

      setPhoto({
        ...photo,
        takenPhoto: {
          path: takenPhoto.path,
          preview: takenPhoto.webPath,
        },
      });
      router.push(routes.story.photoLanding);
    } catch (err: any) {
      setToasterState({
        title: "Error",
        message: err.message,
        type: ToasterType.ERROR,
        isShown: true,
      });

      const game = demo.history[demo.history.length - 1];
      router.push(game, "none", "replace");
    }
  };

  useEffect(() => {
    takePhotoHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default TakePhoto;
