import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/react";
import { ShareIcon, CameraIcon } from "@heroicons/react/20/solid";

import gameImg from "@/assets/game/gameImg.png";
import AppButton from "@/components/AppButton";
import ProgressTimeline from "@/components/ProgressTimeline";
import ProgressBar from "@/components/ProgressBar";
import EffortGraph from "@/components/EffortGraph";
import InfoTile from "@/components/InfoTile";
import { routes } from "@/constants/routes";
import { useApi } from "@/api/ApiHandler";
import EventService, { EventData } from "@/api/Event/EventService";
import StoryService, { StoryData } from "@/api/Story/StoryService";
import { Share } from "@capacitor/share";
import { dialogAtom } from "@/utils/atoms/dialog";
import { useRecoilState } from "recoil";
import AttemptService from "@/api/Attempt/AttemptService";

const foodForThought = [
  {
    id: 1,
    imageUrl:
      "https://www.mandai.com/content/dam/wrs/river-safari/animals/red-panda/the-panda-connection.jpg.transform/compress/resize1000/img.jpg",
    link: "https://www.mandai.com/en/river-wonders/animals-and-zones/red-panda.html",
  },
  {
    id: 2,
    imageUrl:
      "https://files.worldwildlife.org/wwfcmsprod/images/HERO_Red_Panda_279141/hero_full/7bkg4jrmln_XL_279141.jpg",
    link: "https://www.worldwildlife.org/species/red-panda",
  },
  {
    id: 3,
    imageUrl:
      "https://www.wwf.org.uk/sites/default/files/styles/gallery_image/public/2022-04/_WW187246.jpg?h=485d8330&itok=50jJdB4O",
    link: "https://www.wwf.org.uk/learn/fascinating-facts/red-panda",
  },
  {
    id: 4,
    imageUrl:
      "https://www.mandai.com/content/dam/wrs/river-safari/animals/red-panda/the-panda-connection.jpg.transform/compress/resize1000/img.jpg",
    link: "https://www.mandai.com/en/river-wonders/animals-and-zones/red-panda.html",
  },
  {
    id: 5,
    imageUrl:
      "https://files.worldwildlife.org/wwfcmsprod/images/HERO_Red_Panda_279141/hero_full/7bkg4jrmln_XL_279141.jpg",
    link: "https://www.worldwildlife.org/species/red-panda",
  },
];
const Game = () => {
  const history = useHistory();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setDialogState] = useRecoilState(dialogAtom);

  const [getCurrentEvent] = useApi(
    () => EventService.getCurrentEvents(),
    false,
    false,
    false
  );

  const [getCurrentStory] = useApi(
    () => StoryService.getCurrentStory(),
    false,
    false,
    false
  );

  const [getEventById] = useApi(
    (id: number) => EventService.getEventById(id),
    false,
    false,
    false
  );

  const [createAttempt] = useApi(
    (eventId: number) => AttemptService.createAttempt(eventId),
    false,
    false,
    false
  );

  const [event, setEvent] = useState<EventData>();
  const [story, setStory] = useState<StoryData>();
  const location = useLocation();

  const isMockRoute = location.pathname.split("/").length >= 4;

  const getData = async () => {
    if (!isMockRoute) {
      const [currentEvent, currentStory] = await Promise.all([
        getCurrentEvent(),
        getCurrentStory(),
      ]);
      if (currentEvent && currentEvent.data) {
        setEvent(currentEvent.data);
      }
      if (currentStory && currentStory.data) {
        setStory(currentStory.data);
      }
    } else {
      const id = location.pathname.split("/")[3];
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [currentStory, _] = await Promise.all([
        getCurrentStory(),
        createAttempt(id),
      ]);
      const currentEvent = await getEventById(id);
      if (currentEvent && currentEvent.data) {
        setEvent(currentEvent.data);
      }
      if (currentStory && currentStory.data) {
        setStory(currentStory.data);
      }
    }
  };

  const redirectToVote = () => {
    history.push("/story/vote");
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProgress = () => {
    if (event) {
      const progress =
        (event.attempt.assets.length / event.requiredAssets) * 100;
      return progress > 100 ? 100 : progress;
    }
    return 0;
  };

  const getDaysLeft = () => {
    if (event && story) {
      const partOf = story.partOf.filter(
        (part) => part.eventOneId === event.id || part.eventTwoId === event.id
      );
      const startDate = Date.parse(partOf[0].startDate);
      const duration = event.eventDuration;
      const endDate = startDate + duration * 24 * 60 * 60 * 1000;

      const today = new Date();
      const diff = endDate - today.getTime();
      if (diff < 0) {
        return 0;
      }
      const daysLeft = Math.ceil(diff / (1000 * 3600 * 24));
      return daysLeft;
    }
    return 0;
  };

  const onClickShare = async () => {
    await Share.share({
      title: "Join me in saving the environment!",
      text: "Complete daily tasks, have fun and promote a sustainable future!",
      url: window.location.href,
      dialogTitle: "Share with friends",
    });
  };

  const onClickContribute = () => {
    setDialogState({
      isShown: true,
      title: event?.name || "",
      message: event?.description || "",
      footer: [
        "Contribute",
        "Validate Community Posts",
        `${event?.reward?.toString() || "0"} Credits`,
      ],
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar mode="ios">
          <IonTitle className="font-body">{event?.name}</IonTitle>
        </IonToolbar>
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
                <p
                  onClick={onClickContribute}
                  className="underline-offset-2 underline " // align this link to the right
                >
                  Event Information
                </p>
              </div>
              <div className="flex justify-between mt-4 text-base">
                <AppButton
                  bgColour="bg-white"
                  className="w-full mr-3 p-2 "
                  onClick={onClickShare}
                >
                  <div className="flex flex-col items-center">
                    <p>Share</p>
                    <ShareIcon className="h-12 w-12 mt-1" />
                  </div>
                </AppButton>
                <AppButton
                  className="w-full ml-3 p-2"
                  onClick={() => history.push(routes.story.takePhoto)}
                >
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
                    {event?.name}
                  </p>
                  <p className="float-right text-right self-stretch">
                    {getDaysLeft()} days left
                  </p>
                  <ProgressBar progress={getProgress()} />
                  <div className="flex justify-between self-stretch">
                    <p>{event?.attempt.assets.length}</p>
                    <p className="">
                      Target: {event?.requiredAssets} contributions
                    </p>
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
              <p className="font-header font-semibold text-xl mt-4">
                Food for Thought
              </p>
              <div className="overflow-x-auto">
                <div className="flex w-fit mt-2">
                  {foodForThought.map((item) => (
                    <InfoTile
                      key={item.id}
                      imageUrl={item.imageUrl}
                      link={item.link}
                    />
                  ))}
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    redirectToVote();
                  }}
                  className="flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-lg font-semibold text-black shadow-sm bg-white bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 mt-5"
                >
                  Try out the next event!
                  <span className="text-red-400 ml-1">(Demo)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Game;
