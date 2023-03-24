/* eslint-disable jsx-a11y/alt-text */
import { IonContent, IonPage } from "@ionic/react";
import homeImg from "@/assets/homeImg.png";
import AppButton from "@/components/AppButton";
import InformationFooter from "@/components/InformationFooter";
import { useHistory } from "react-router";
import { routes } from "@/constants/routes";

const Home: React.FC = () => {
  const history = useHistory();
  return (
    <IonPage>
      <IonContent fullscreen={true}>
        <div className="relative h-screen bg-gradient-to-b from-[#582302] to-[#964C1E]">
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
                  history.push(routes.story.vote);
                }}
                className="py-4 px-10 mt-8"
              >
                Join Now
              </AppButton>
            </div>
          </InformationFooter>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
