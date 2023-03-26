import { IonText } from "@ionic/react";

interface ProfileCardProps {
  title: string;
  children: JSX.Element;
}

const ProfileCard: React.FC<ProfileCardProps> = (props: ProfileCardProps) => {
  return (
    <div className="w-full h-fit bg-white rounded-md px-4 py-6 flex flex-col gap-1">
      <IonText className="text-[21px]">{props.title}</IonText>
      <div className="w-[30%] h-1 rounded-full bg-gradient-to-r from-[#9EFF00] to-[#ABB0B0]" />
      <div className="mt-2">
        {props.children}
      </div>
      
    </div>
  );
};

export default ProfileCard;