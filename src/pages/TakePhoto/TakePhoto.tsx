import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

import { routes } from '@/constants/routes';

import { useRecoilState } from "recoil";
import { toasterAtom, ToasterType } from "@/utils/atoms/toaster";
import { photoAtom } from "@/utils/atoms/photo/atom";

const TakePhoto = () => {
  const [photo, setPhoto] = useRecoilState(photoAtom);
  const [, setToasterState] = useRecoilState(toasterAtom);
  const history = useHistory();

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
        takenPhoto: {
          path: takenPhoto.path,
          preview: takenPhoto.webPath,
        }
      })
      history.push(routes.story.photoLanding)
    } catch (err: any) {
      setToasterState({
        title: "Error",
        message: err.data.message,
        type: ToasterType.ERROR,
        isShown: true,
      });
      history.push(routes.story.base)
    }
  };

  useEffect(() => {
    takePhotoHandler();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default TakePhoto;