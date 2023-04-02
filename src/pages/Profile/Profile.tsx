import React, { useEffect } from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonPopover,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ProfileCard from "@/components/ProfileCard";
import ProfileBadge from "@/components/ProfileBadge";

import profileBgImg from "@/assets/profile_bg.png";
import { ReactComponent as TreeIcon } from "@/assets/profile/tree.svg";
import { ReactComponent as ConsumptionIcon } from "@/assets/profile/consumption.svg";
import { ReactComponent as ExploreIcon } from "@/assets/profile/currentlyExploring.svg";
import { ReactComponent as LifeWaterIcon } from "@/assets/profile/lifeBelowWater.svg";

import useAsync from "@/hooks/useAsync";
import { useApi } from "@/api/ApiHandler";
import UserService from "@/api/User/UserService";
import AuthService from "@/api/Authentication/AuthService";

import { useRecoilState } from "recoil";
import { userAtom } from "@/utils/atoms/user/atom";
import { ellipsisHorizontal } from "ionicons/icons";
import AppButton from "@/components/AppButton/AppButton";

const Profile: React.FC = () => {
  const [user, setUser] = useRecoilState(userAtom);

  const [getSelf] = useApi(() => UserService.getSelf(), false, false, false);

  const { execute, value, status } = useAsync(getSelf, false);

  useEffect(() => {
    execute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (status === "success" && value && value.data) {
      setUser((prev) => ({ ...prev, ...value.data }));
    }
  }, [setUser, status, value]);

  const handleLogout = () => {
    AuthService.logout();
    window.location.reload();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar mode="ios">
          <IonButtons slot="primary">
            <IonButton id="click-trigger">
              <IonIcon
                slot="icon-only"
                ios={ellipsisHorizontal}
                md={ellipsisHorizontal}
              ></IonIcon>
            </IonButton>
          </IonButtons>
          <IonPopover mode="ios" trigger="click-trigger" triggerAction="click">
            <AppButton className="w-full py-3" onClick={handleLogout}>
              Log Out
            </AppButton>
          </IonPopover>
          <IonTitle className="font-body">My Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="h-full">
          <img
            className="fixed w-full h-full"
            alt="background"
            src={profileBgImg}
          />
          <div className="fixed w-full h-full bg-black opacity-60" />

          <div className="relative flex flex-col gap-6 p-8">
            <IonText className="text-white text-[36px]">My Profile</IonText>

            <div className="flex flex-col gap-2">
              <IonText className="text-white text-[21px]">{user.email}</IonText>
              <div className="w-[30%] border-1 border-b-2 border-white" />
            </div>
            <div className="flex flex-col gap-6">
              <ProfileCard title="Your Eco-Credits">
                <div className="flex items-end gap-2">
                  <IonText className="text-[27px] leading-[32px] font-bold">
                    {user.totalPoints}
                  </IonText>
                  <IonText className="text-[16px] leading-[24px]">
                    credits
                  </IonText>
                </div>
              </ProfileCard>
              <ProfileCard title="Your Impact since...">
                <div className="flex items-end gap-2">
                  <IonText className="text-[27px] leading-[32px] font-bold">
                    {user.totalCarbonSaved}
                  </IonText>
                  <IonText className="text-[16px] leading-[24px]">
                    kg CO2e
                  </IonText>
                </div>
              </ProfileCard>
              <ProfileCard title="Comparing with others...">
                <div className="flex flex-col">
                  <IonText className="text-[27px] leading-[32px] font-bold">
                    Top 15% eco-warriors
                  </IonText>
                  <IonText className="text-[16px] leading-[24px]">
                    in your age group
                  </IonText>
                </div>
              </ProfileCard>
            </div>

            <IonText className="text-[21px] text-white">
              Your Eco-badges
            </IonText>

            <div className="flex flex-wrap items-center justify-between gap-y-6">
              <ProfileBadge
                title="Life on Land"
                color="#59BA47"
                icon={<TreeIcon />}
              />
              <ProfileBadge
                title="Life Below Water"
                color="#1F97D4"
                icon={<LifeWaterIcon />}
              />
              <ProfileBadge
                title="Responsible Consumption"
                color="#BF8D2C"
                icon={<ConsumptionIcon />}
              />
              <ProfileBadge
                title="Curently Exploring..."
                color="#7C7278"
                icon={<ExploreIcon />}
              />
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
