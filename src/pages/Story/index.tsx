import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useApi } from "@/api/ApiHandler";
import EventService from "@/api/Event/EventService";
import AttemptService from "@/api/Attempt/AttemptService";
import LoadingPage from "@/components/LoadingPage";

import Vote from "@pages/Story/Vote";
import Game from "@pages/Game";

const Story = () => {
  const location = useLocation();
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

  const isVotePage = location.pathname.split("/").includes("vote");
  const isGamePage =
    location.pathname.split("/").includes("game") &&
    location.pathname.split("/").length >= 4;

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
    if (!isVotePage && !isGamePage) {
      getData();
    }

    if (isVotePage) {
      setIsLoading(false);
      setIsVote(true);
    }

    if (isGamePage) {
      setIsLoading(false);
      setIsVote(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVotePage, isGamePage]);

  return (
    <>
      {isLoading && <LoadingPage />}
      {!isLoading && !isVote && <Game />}
      {!isLoading && isVote && <Vote />}
    </>
  );
};

export default Story;
