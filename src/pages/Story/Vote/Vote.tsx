/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  useIonRouter,
} from "@ionic/react";
import { useLocation } from "react-router-dom";

import InformationFooter from "@/components/InformationFooter";
import AppButton from "@/components/AppButton";
import LoadingPage from "@/components/LoadingPage/LoadingPage";
import { PartOfWithEvents } from "@/constants/types";
import moment, { Moment } from "moment";

import { useApi } from "@/api/ApiHandler";
import EventService from "@/api/Event/EventService";
import { demoAtom } from "@/utils/atoms/demo";
import { useRecoilState } from "recoil";

import { routes } from "@/constants/routes";

const Vote = () => {
  const [currentEvents, setCurrentEvents] = useState<PartOfWithEvents>();
  const [timeUntilEvent, setTimeUntilEvent] = useState<string>("0d 0h 0m");
  const [isLoading, setIsLoading] = useState(true);
  const [isOptionOne, setIsOptionOne] = useState(false);
  const [isOptionTwo, setIsOptionTwo] = useState(false);
  const [nextId, setNextId] = useState<number>();
  const [demo, setDemo] = useRecoilState(demoAtom);
  const hasVoted = isOptionOne || isOptionTwo;
  const location = useLocation();
  const router = useIonRouter();
  const [manualGetNextEvents] = useApi(
    (ids: number[]) => EventService.getNextEventsByIds(ids[0], ids[1]),
    false,
    false,
    false
  );
  const [getNextEvents] = useApi(
    () => EventService.getNextEvents(),
    false,
    false,
    false
  );

  useEffect(() => {
    localStorage.setItem("nextId", (nextId || 2).toString());
  }, [nextId]);

  function durationAsString(start: Moment, end: Moment) {
    const duration = moment.duration(end.diff(start));

    //Get Days
    const days = Math.floor(duration.asDays());
    const daysFormatted = days < 0 ? "0d" : `${days}d`;

    //Get Hours
    const hours = duration.hours();
    const hoursFormatted = hours < 0 ? "0h" : `${hours}h `;

    //Get Minutes
    const minutes = duration.minutes();
    const minutesFormatted = minutes < 0 ? "0m" : `${minutes}m`;

    const str = `${daysFormatted} ${hoursFormatted} ${minutesFormatted}`;
    return str;
  }

  const isMockRoute = location.pathname.split("/").length >= 4;

  const getData = async () => {
    if (isMockRoute) {
      const id1 = location.pathname.split("/")[3];
      const id2 = location.pathname.split("/")[4];
      const events = await manualGetNextEvents([id1, id2]);
      setCurrentEvents(events.data);
      setIsLoading(false);
    } else {
      const events = await getNextEvents();
      setCurrentEvents(events.data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  useEffect(() => {
    if (currentEvents) {
      setInterval(() => {
        const eventTime = moment(currentEvents.startDate);
        const currentTime = moment();
        setTimeUntilEvent(durationAsString(currentTime, eventTime));
      }, 1000);
    }
  }, [currentEvents, currentEvents?.startDate]);

  const redirectToGame = () => {
    const route = `${routes.story.base}/game/${nextId}`;
    router.push(route, "forward", "replace");
  };

  return (
    <>
      {isLoading && <LoadingPage />}
      {!isLoading && currentEvents && (
        <IonPage>
          <IonHeader>
            <IonToolbar mode="ios">
              <IonTitle className="font-body">Pick Your Path</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <div className="h-full bg-gradient-to-b from-[#070300] to-[#3A1D0B]">
              <img
                className="w-full absolute top-0"
                src={currentEvents.voteImgUrl}
              />
              <InformationFooter>
                <div className="p-8">
                  <p className="text-lightShade text-4xl font-header font-bold">
                    {currentEvents.name}
                  </p>
                  <div className="mt-3 flex gap-3 items-center text-lightShade font-body">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-20"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                    </span>
                    <p className="font-bold">Time Until Challenge:</p>
                    <p className="">{timeUntilEvent}</p>
                  </div>
                  <p className="mt-3 text-lightShade font-body">
                    {currentEvents.description}
                  </p>
                  <div className="flex w-full mt-8 justify-center items-center gap-10">
                    <AppButton
                      onClick={() => {
                        setIsOptionOne(true);
                        setIsOptionTwo(false);
                        setNextId(currentEvents.eventOne.id);
                      }}
                      className="h-28 w-28"
                    >
                      <div className="relative flex flex-col justify-center items-center h-full">
                        <img
                          className="h-10 w-10 object-cover"
                          src={currentEvents.eventOne.imageUrl}
                        />
                        <p className="mt-2">{currentEvents.eventOne.name}</p>
                        {hasVoted && (
                          <>
                            <div className="absolute bottom-0 w-full h-full bg-[#00000093] rounded">
                              {isOptionOne && (
                                <span className="absolute -top-1 -right-1 flex">
                                  <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-0.5 text-sm font-medium text-indigo-800">
                                    Voted!
                                  </span>
                                </span>
                              )}
                            </div>

                            <div
                              style={{ height: `${isOptionOne ? 52 : 48}%` }}
                              className={`absolute py-2 bottom-0 flex items-center justify-center
                              w-full greenGradient rounded origin-bottom animate-grow`}
                            >
                              <p className="font-bold font-header text-4xl animate-fadeIn">
                                {isOptionOne ? "52%" : "48%"}
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    </AppButton>
                    <p className="font-body text-lightShade">or</p>
                    <AppButton
                      onClick={() => {
                        setIsOptionOne(false);
                        setIsOptionTwo(true);
                        setNextId(currentEvents.eventTwo.id);
                      }}
                      className="h-28 w-28"
                    >
                      <div className="relative flex flex-col justify-center items-center h-full">
                        <img
                          className="object-cover h-10 w-10"
                          src={currentEvents.eventTwo.imageUrl}
                        />
                        <p className="mt-2">{currentEvents.eventTwo.name}</p>
                        {hasVoted && (
                          <>
                            <div className="absolute bottom-0 w-full h-full bg-[#00000093] rounded">
                              {isOptionTwo && (
                                <span className="absolute -top-1 -right-1 flex">
                                  <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-0.5 text-sm font-medium text-indigo-800">
                                    Voted!
                                  </span>
                                </span>
                              )}
                            </div>

                            <div
                              style={{ height: `${isOptionTwo ? 52 : 48}%` }}
                              className={`absolute py-2 bottom-0 flex items-center justify-center
                              w-full greenGradient rounded origin-bottom animate-grow`}
                            >
                              <p className="font-bold font-header text-4xl animate-fadeIn">
                                {isOptionTwo ? "52%" : "48%"}
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    </AppButton>
                  </div>
                  <div>
                    {nextId && (
                      <button
                        type="submit"
                        onClick={(e) => {
                          e.preventDefault();
                          redirectToGame();
                        }}
                        className="flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-lg font-semibold text-black shadow-sm bg-white bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 mt-5"
                      >
                        Proceed to the Game
                        <span className="text-red-400 ml-1">(Demo)</span>
                      </button>
                    )}
                  </div>
                </div>
              </InformationFooter>
            </div>
          </IonContent>
        </IonPage>
      )}
    </>
  );
};

export default Vote;
