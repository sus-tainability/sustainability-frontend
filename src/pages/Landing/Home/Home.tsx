/* eslint-disable jsx-a11y/alt-text */
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import homeImg from "@/assets/homeImg.png";
import AppButton from "@/components/AppButton";
import InformationFooter from "@/components/InformationFooter";
import { routes } from "@/constants/routes";
import useLocalStorage from "@/hooks/useLocalStorage";
import { demoAtom } from "@/utils/atoms/demo";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import howToInstall from "@/assets/howtoinstall-ios.gif";

const Home: React.FC = () => {
  const router = useIonRouter();
  const [hasJoined, setHasJoined] = useLocalStorage("hasJoined", false);
  const [dontShowAgain, setDontShowAgain] = useLocalStorage(
    "dontShowAgain",
    false
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [demo, _] = useRecoilState(demoAtom);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // if PWA is not installed, show modal
    if (window.matchMedia("(display-mode: standalone)").matches) {
      return;
    }
    if (dontShowAgain) {
      return;
    }
    setIsOpen(true);
  }, [dontShowAgain]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar mode="ios">
          <IonTitle className="font-body">Welcome</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonModal id="image-preview-modal" isOpen={isOpen}>
          <IonContent>
            <IonToolbar className="font-body" mode="ios">
              <IonTitle>Install App</IonTitle>
              <IonButtons slot="end">
                <IonButton mode="ios" onClick={() => setIsOpen(false)}>
                  Close
                </IonButton>
              </IonButtons>
            </IonToolbar>
            <div className="w-full px-10 flex flex-col items-center">
              <p className="text-3xl font-header text-center pt-10 pb-5 font-bold">
                Psst! Hey did you know you could install this application?
              </p>
              <img src={howToInstall} className="w-3/4 pb-5" />
              <div className="relative flex items-start pb-5">
                <div className="flex h-6 items-center">
                  <input
                    id="comments"
                    aria-describedby="comments-description"
                    name="comments"
                    type="checkbox"
                    checked={dontShowAgain}
                    onChange={(e) => {
                      setDontShowAgain(e.target.checked);
                    }}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label htmlFor="comments" className="text-gray-900 font-body">
                    Don't Show This Again
                  </label>
                </div>
              </div>
            </div>
          </IonContent>
        </IonModal>
        <div className="h-full bg-gradient-to-b from-[#582302] to-[#964C1E]">
          <img className="w-full absolute top-0" src={homeImg} />
          <InformationFooter>
            <div className="p-8">
              <p className="text-lightShade text-4xl font-header font-bold">
                The Red Pandas invites you...
              </p>
              <p className="mt-8 text-lightShade font-body">
                Complete daily tasks, protect endangered species, and promote a
                sustainable future.
              </p>
              <AppButton
                onClick={() => {
                  setHasJoined(true);
                  const base = `${routes.story.base}`;
                  const history = demo.history.filter((x) => x !== "/story");
                  const nextUrl =
                    history.length === 0
                      ? `${base}/vote/2/3`
                      : history[history.length - 1];
                  router.push(nextUrl, "forward", "replace");
                }}
                className="py-4 px-10 mt-8"
              >
                {hasJoined && "Resume Journey"}
                {!hasJoined && "Join Now"}
                <span className="ml-1 text-red-400 font-bold">(Demo)</span>
              </AppButton>
            </div>
          </InformationFooter>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
