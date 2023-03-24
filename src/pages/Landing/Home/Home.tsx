/* eslint-disable jsx-a11y/alt-text */
import { IonContent, IonPage } from "@ionic/react";
import homeImg from "@/assets/homeImg.png";
import AppButton from "@/components/AppButton";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen={true}>
        <div className="relative h-screen bg-gradient-to-b from-[#582302] to-[#964C1E]">
          <img className="w-full" src={homeImg} />
          <div
            style={{
              height: `calc(100% - 500px)`,
              backdropFilter: "blur(8px)",
            }}
            className="bg-[#d9d9d91a] absolute bottom-0 rounded-t-3xl min-h-[414px] w-full"
          >
            <div className="p-8">
              <p className="text-lightShade text-4xl font-header font-bold">
                The Red Pandas invites you...
              </p>
              <p className="mt-8 text-lightShade font-body">
                Save these furry friends from extinction. Complete daily tasks,
                protect the endangered species, and promote a sustainable
                future.
              </p>
              <AppButton className="py-4 px-10 mt-8">Join Now</AppButton>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
