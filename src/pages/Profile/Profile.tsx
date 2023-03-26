import { IonContent, IonPage, IonText } from "@ionic/react";
import ProfileCard from "@/components/ProfileCard";
import ProfileBadge from "@/components/ProfileBadge";

import profileBgImg from "@/assets/profile_bg.png";
import { ReactComponent as TreeIcon } from "@/assets/profile/tree.svg"
import { ReactComponent as BackIcon } from "@/assets/profile/backButton.svg"

const Profile: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <div className="h-full">
          <img className="fixed w-full h-full" alt="background" src={profileBgImg} />
          <div className="fixed w-full h-full bg-black opacity-60" />

          <div className="relative flex flex-col gap-6 p-8">
            <button className="w-fit rounded-lg bg-gradient-to-r from-[#CAE326] to-[#909f28] px-7 py-4">
              <BackIcon />
            </button>

            <IonText className="text-white text-[36px]">My Profile</IonText>

            <div className="flex flex-col gap-2">
              <IonText className="text-white text-[21px]">Jeffrey Cui Shenyi</IonText>
              <div className="w-[30%] border-1 border-b-2 border-white" />
            </div>
            <div className="flex flex-col gap-6">
              <ProfileCard title="Your Eco-Credits">
                <div className="flex items-end gap-2">
                  <IonText className="text-[27px] leading-[32px] font-bold">3,000</IonText>
                  <IonText className="text-[16px] leading-[24px]">credits</IonText>
                </div>
              </ProfileCard>
              <ProfileCard title="Your Impact since...">
                <div className="flex items-end gap-2">
                  <IonText className="text-[27px] leading-[32px] font-bold">26,911</IonText>
                  <IonText className="text-[16px] leading-[24px]">kg CO2e</IonText>
                </div>
              </ProfileCard>
              <ProfileCard title="Comparing with others...">
                <div className="flex flex-col">
                  <IonText className="text-[27px] leading-[32px] font-bold">Top 15% eco-warriors</IonText>
                  <IonText className="text-[16px] leading-[24px]">in your age group</IonText>
                </div>
              </ProfileCard>
            </div>

            <IonText className="text-[21px] text-white">Your Eco-badges</IonText>

            <div className="flex flex-wrap items-center justify-between gap-y-6">
              <ProfileBadge title="Life on Land" color="#59BA47" icon={<TreeIcon />} />
              <ProfileBadge title="Life Below Water" color="#1F97D4" icon={<TreeIcon />} />
              <ProfileBadge title="Responsible Consumption" color="#BF8D2C" icon={<TreeIcon />} />
              <ProfileBadge title="Curently Exploring..." color="#7C7278" icon={<TreeIcon />} />
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;