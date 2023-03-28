/* eslint-disable jsx-a11y/alt-text */
import {
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

const Home: React.FC = () => {
  const router = useIonRouter();
  const [hasJoined, setHasJoined] = useLocalStorage("hasJoined", false);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar mode="ios">
          <IonTitle className="font-body">Welcome</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="h-full bg-gradient-to-b from-[#582302] to-[#964C1E]">
          <img className="w-full" src={homeImg} />
          <InformationFooter>
            <div className="p-8">
              <p className="text-lightShade text-4xl font-header font-bold">
                The Red Pandas invites you...
              </p>
              <p className="mt-8 text-lightShade font-body">
                Save these furry friends from extinction. Complete daily tasks,
                protect the endangered species, and promote a sustainable
                future.
              </p>
              <AppButton
                onClick={() => {
                  setHasJoined(true);
                  router.push(routes.story.game, "forward", "replace");
                }}
                className="py-4 px-10 mt-8"
              >
                {hasJoined && "Resume Journey"}
                {!hasJoined && "Join Now"}
              </AppButton>
            </div>
          </InformationFooter>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
