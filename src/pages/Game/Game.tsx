import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  useIonRouter,
} from "@ionic/react";
import { ShareIcon, CameraIcon } from "@heroicons/react/20/solid";
import LoadingPage from "@/components/LoadingPage/LoadingPage";

import AppButton from "@/components/AppButton";
import ProgressTimeline, { Step } from "@/components/ProgressTimeline";
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
import { demoAtom } from "@/utils/atoms/demo";
import { AssetData } from "@/api/Asset/AssetService";
import ReactGA from "react-ga";

const foodForThought = [
  {
    id: 1,
    text: "Red Panda: The Enigmatic and Adorable Bamboo Eater",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8Pdjt-P2QiYhyqA-pRbCvDKEIHsXGEhKLGw&usqp=CAU",
    link: "https://kids.nationalgeographic.com/animals/mammals/facts/red-panda",
  },

  {
    id: 2,
    text: "Unveiling the Secrets of Red Pandas",
    imageUrl:
      "https://blogs.scientificamerican.com/sciam/assets/Image/16339195416_71a2607816_k.jpg",
    link: "https://blogs.scientificamerican.com/thoughtful-animal/7-things-you-didne28099t-know-about-red-pandas/",
  },
  {
    id: 3,
    text: "Red Pandas: Endangered Animals Spotlight",
    imageUrl:
      "https://u4d2z7k9.rocketcdn.me/wp-content/uploads/2022/08/Untitled-1024-%C3%97-683px-98.jpg",
    link: "https://earth.org/endangered-species/red-pandas/",
  },
];

const Game = () => {
  const router = useIonRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setDialogState] = useRecoilState(dialogAtom);
  const [progressSteps, setProgressSteps] = useState<Step[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const showOnboarding = localStorage.getItem("showOnboarding");
    if (showOnboarding == null) {
      router.push(routes.story.onboarding, "forward", "replace");
      localStorage.setItem("showOnboarding", "true");
    }

    if (showOnboarding === "true") {
      router.push(routes.story.onboarding, "forward", "replace");
    }
  }, [router]);

  ReactGA.pageview(window.location.pathname + window.location.search);
  ReactGA.event({
    category: "Game",
    action: "Game page loaded",
  });

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

  const [demo, setDemo] = useRecoilState(demoAtom);
  const [event, setEvent] = useState<EventData>();
  const [story, setStory] = useState<StoryData>();
  const [assetData, setAssetData] = useState<AssetData[]>([]);
  const location = useLocation();

  useEffect(() => {
    const pathName = location.pathname;
    const newHistory = [...demo.history, pathName].filter(
      (x) => x !== "/story"
    );

    if (newHistory.length > 5) {
      newHistory.shift();
    }
    setDemo((prev) => ({ ...prev, history: newHistory }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isMockRoute = location.pathname.split("/").length >= 4;

  const getData = async () => {
    if (!isMockRoute) {
      setIsLoading(true);
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
      setIsLoading(false);
    } else {
      setIsLoading(true);
      const id = location.pathname.split("/")[3];
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [currentStory, _] = await Promise.all([
        getCurrentStory(),
        createAttempt(id),
      ]);
      const currentEvent = await getEventById(id);
      if (currentEvent && currentEvent.data) {
        setEvent(currentEvent.data);
        setAssetData(currentEvent.data.attempt.assets);
      }
      if (currentStory && currentStory.data) {
        setStory(currentStory.data);
      }
      setIsLoading(false);
    }
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
        "Contribute Your Own Photos",
        "Validate Community Photos",
        `${event?.reward?.toString() || "0"} Credits`,
      ],
    });
  };

  // construct Steps
  useEffect(() => {
    if (!story || !event) return;
    const id = event.id;
    const partOfArr = story.partOf;
    partOfArr.sort((a, b) => a.eventOneId - b.eventOneId);
    const steps: Step[] = partOfArr.map((part) => {
      const isCurrent = part.eventOneId === id || part.eventTwoId === id;
      const icon = isCurrent ? "checkmark-circle" : "checkmark-circle-outline";
      const status = isCurrent
        ? "current"
        : id > part.eventOneId
        ? "complete"
        : "upcoming";
      return { name: "", icon, status, href: "#" };
    });
    setProgressSteps(steps);
  }, [event, isMockRoute, location.pathname, story]);

  return (
    <>
      {isLoading && <LoadingPage />}
      {!isLoading && (
        <IonPage>
          <IonHeader>
            <IonToolbar mode="ios">
              <IonTitle className="font-body">{event?.name}</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <div className="h-fit min-h-full bg-gradient-to-b from-[#9d6552] to-[#9d654d] text-[#312E3E] w-[100%]">
              <img
                className="w-full absolute top-0"
                src={event?.challegeImgUrl}
                alt="test"
              />
              <ProgressTimeline steps={progressSteps} />
              <div
                className="bg-[#d9d9d91a] rounded-t-3xl backdrop-blur mt-[35vh]"
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
                      How to submit an image?
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
                      onClick={() => {
                        ReactGA.event({
                          category: "User",
                          action: "Clicked Contribute",
                        });
                        router.push(routes.story.takePhoto);
                      }}
                    >
                      <div className="flex flex-col items-center">
                        <p>Submit an Image</p>
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
                    Your Contributions
                  </p>
                  <div className="overflow-x-auto">
                    <div
                      className={`flex mt-2 ${
                        assetData.length > 0 ? "w-fit" : "w-full"
                      }`}
                    >
                      {assetData.length > 0 ? (
                        assetData.map((asset) => (
                          <InfoTile
                            key={asset.id}
                            text={asset.status}
                            imageUrl={asset.imgUrl}
                          />
                        ))
                      ) : (
                        <div className="w-full">
                          <p className="text-white font-body italic w-full text-center">
                            [Contribute to see your photos here!]
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="font-header font-semibold text-xl mt-4">
                    Food for Thought
                  </p>
                  <div className="overflow-x-auto">
                    <div className="flex w-fit mt-2">
                      {foodForThought.map((item) => (
                        <InfoTile
                          key={item.id}
                          text={item.text}
                          imageUrl={item.imageUrl}
                          link={item.link}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </IonContent>
        </IonPage>
      )}
    </>
  );
};

export default Game;
