/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { IonPage } from "@ionic/react";
import { Typewriter } from "react-simple-typewriter";

import { useApi } from "@/api/ApiHandler";
import EventService from "@/api/Event/EventService";
import AttemptService from "@/api/Attempt/AttemptService";

import Vote from "@pages/Story/Vote";
import Game from "@pages/Game";

import loading from "@/assets/loading.gif";

const Story = () => {
  const [getCurrentEvent] = useApi(
    () => EventService.getCurrentEvents(),
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

  const [isLoading, setIsLoading] = useState(true);
  const [isVote, setIsVote] = useState(false);

  const getData = async () => {
    const currentEvent = await getCurrentEvent();
    if (currentEvent && currentEvent.isSuccess) {
      if (currentEvent.data) {
        await createAttempt(currentEvent.data.id);
        setIsLoading(false);
      } else if (!currentEvent.data) {
        setIsLoading(false);
        setIsVote(true);
      }
      console.log(currentEvent.isSuccess);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading && (
        <IonPage>
          <div className="flex flex-col justify-center items-center w-full h-full bg-[#FBFBFB] absolute z-30 font-body">
            <img className="w-20" src={loading} />
            <p>
              Cleaning up{" "}
              <Typewriter
                words={[
                  "the sky...",
                  "the forests...",
                  "the rivers...",
                  "the oceans...",
                ]}
                loop={true}
              />
            </p>
          </div>
        </IonPage>
      )}
      {!isLoading && !isVote && <Game />}
      {!isLoading && isVote && <Vote />}
    </>
  );
};

export default Story;
