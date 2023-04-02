/* eslint-disable jsx-a11y/alt-text */
import {
  IonAlert,
  IonContent,
  IonHeader,
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

const Home: React.FC = () => {
  const router = useIonRouter();
  const [hasJoined, setHasJoined] = useLocalStorage("hasJoined", false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [demo, _] = useRecoilState(demoAtom);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let displayMode = "browser tab";
    if (window.matchMedia("(display-mode: standalone)").matches) {
      displayMode = "standalone";
      setIsOpen(true);
    }
    // Log launch display mode to analytics
    console.log("DISPLAY_MODE_LAUNCH:", displayMode);
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar mode="ios">
          <IonTitle className="font-body">Welcome</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonAlert
          isOpen={isOpen}
          header="PWA"
          subHeader="Important message"
          message="This is a PWA"
          buttons={["OK"]}
          onDidDismiss={() => setIsOpen(false)}
        ></IonAlert>
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
