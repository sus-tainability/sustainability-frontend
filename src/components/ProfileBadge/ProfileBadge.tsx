import React from "react";
import { IonText } from "@ionic/react";

interface ProfileBadgeProps {
  title: string;
  color: string;
  icon: JSX.Element;
}

const ProfileBadge: React.FC<ProfileBadgeProps> = (props: ProfileBadgeProps) => (
  <div
    style={{
      backgroundColor: props.color,
    }}
    className="w-[45%] aspect-[1/1] rounded-lg flex flex-col items-center justify-center gap-4 py-4 px-2"
  >
    <IonText className="text-white text-[16px] text-center">{props.title}</IonText>
    {props.icon}
  </div>
);

export default ProfileBadge;