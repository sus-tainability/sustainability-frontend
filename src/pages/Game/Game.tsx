import {
  IonPage,
  IonHeader,
  //   IonToolbar,
  //   IonTitle,
  IonContent,
} from "@ionic/react";
import React from "react";
import { ShareIcon, CameraIcon } from "@heroicons/react/20/solid";

import gameImg from "@/assets/gameImg.png";
import AppButton from "@/components/AppButton";
import ProgressTimeline from "@/components/ProgressTimeline";
import ProgressBar from "@/components/ProgressBar";
import EffortGraph from "@/components/EffortGraph";
import InfoTile from "@/components/InfoTile";

const foodForThought = [
  {
    imageUrl:
      "https://www.mandai.com/content/dam/wrs/river-safari/animals/red-panda/the-panda-connection.jpg.transform/compress/resize1000/img.jpg",
    link: "https://www.mandai.com/en/river-wonders/animals-and-zones/red-panda.html",
  },
  {
    imageUrl:
      "https://files.worldwildlife.org/wwfcmsprod/images/HERO_Red_Panda_279141/hero_full/7bkg4jrmln_XL_279141.jpg",
    link: "https://www.worldwildlife.org/species/red-panda",
  },
  {
    imageUrl:
      "https://www.wwf.org.uk/sites/default/files/styles/gallery_image/public/2022-04/_WW187246.jpg?h=485d8330&itok=50jJdB4O",
    link: "https://www.wwf.org.uk/learn/fascinating-facts/red-panda",
  },
  {
    imageUrl:
      "https://www.mandai.com/content/dam/wrs/river-safari/animals/red-panda/the-panda-connection.jpg.transform/compress/resize1000/img.jpg",
    link: "https://www.mandai.com/en/river-wonders/animals-and-zones/red-panda.html",
  },
  {
    imageUrl:
      "https://files.worldwildlife.org/wwfcmsprod/images/HERO_Red_Panda_279141/hero_full/7bkg4jrmln_XL_279141.jpg",
    link: "https://www.worldwildlife.org/species/red-panda",
  },
  {
    imageUrl:
      "https://www.wwf.org.uk/sites/default/files/styles/gallery_image/public/2022-04/_WW187246.jpg?h=485d8330&itok=50jJdB4O",
    link: "https://www.wwf.org.uk/learn/fascinating-facts/red-panda",
  },
];
const Game = () => {
  const days = 29;
  const target = 3000;
  return (
    <IonPage>
      <IonHeader>
        {/* <IonToolbar mode="ios">
          <IonTitle className="font-body">Game tool</IonTitle>
        </IonToolbar> */}
      </IonHeader>
      <IonContent>
        <div className=" h-fit min-h-full bg-gradient-to-b from-[#9d6552] to-[#9d654d] text-[#312E3E] w-[100%]">
          <img className="w-full absolute top-0" src={gameImg} alt="test" />
          <ProgressTimeline />
          <div
            className="bg-[#d9d9d91a] rounded-t-3xl  backdrop-blur mt-[35vh]"
            style={{ WebkitBackdropFilter: "blur(8px)" }}
          >
            <div className="p-8 min-h-[100%]">
              <div className="flex justify-between text-[#312E3E] font-medium">
                <a href="/profile" className="underline-offset-2 underline">
                  My Impact
                </a>
                <a
                  href="/profile"
                  className="underline-offset-2 underline " // align this link to the right
                >
                  How to Contribute?
                </a>
              </div>
              <div className="flex justify-between mt-4 text-base">
                <AppButton bgColour="bg-white" className="w-full mr-3 p-2 ">
                  <div className="flex flex-col items-center">
                    <p>Share</p>
                    <ShareIcon className="h-12 w-12 mt-1" />
                  </div>
                </AppButton>
                <AppButton className="w-full ml-3 p-2 ">
                  <div className="flex flex-col items-center">
                    <p>Contribute</p>
                    <CameraIcon className="h-12 w-12 mt-1" />
                  </div>
                </AppButton>
              </div>
              <div className="mt-4">
                <AppButton
                  bgColour="bg-white"
                  className="w-full p-2 px-5 h-32 flex flex-col text-sm"
                >
                  <p className="text-lg font-header font-bold text-left">
                    Less Paper, More Trees
                  </p>
                  <p className="float-right text-right self-stretch">
                    {days} days left
                  </p>
                  <ProgressBar progress={60} />
                  <div className="flex justify-between self-stretch">
                    <p>0</p>
                    <p className="">Target: {target} e-statement opt-in</p>
                  </div>
                </AppButton>
              </div>
              <div className="mt-4">
                <AppButton
                  bgColour="bg-white"
                  className="w-full p-2 px-5 h-32 flex flex-col"
                >
                  <p className="text-lg font-header font-bold text-left">
                    Compare your efforts
                  </p>
                  <div className="flex flex-row items-center self-stretch justify-between flex-grow">
                    <div>
                      <p className="text-xl">
                        Great Job! <br />
                        Top 15%
                      </p>
                    </div>

                    <EffortGraph />
                  </div>
                </AppButton>
              </div>
              <div className="mt-4">
                <p className="font-header font-semibold text-xl">
                  Food for Thought
                </p>

                <div className="flex w-fit mt-2">
                  {foodForThought.map((item) => (
                    <InfoTile imageUrl={item.imageUrl} link={item.link} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Game;
