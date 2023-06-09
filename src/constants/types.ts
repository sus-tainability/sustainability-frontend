export const demoRoutes = new Map<string, string>([
  ["2", "/story/vote/4/5"],
  ["3", "/story/vote/4/5"],
  ["4", "/story/vote/6/7"],
  ["5", "/story/vote/6/7"],
  ["6", "/story"],
  ["7", "/story"],
]);

export type PartOfWithEvents = {
  id: number;
  eventOneId: number;
  eventTwoId: number;
  storyId: number;
  name: string;
  description: string;
  voteImgUrl: string;
  startDate: string;
  createdAt: string;
  updatedAt: string;
  eventOne: {
    id: number;
    name: string;
    description: string;
    carbonSave: number;
    eventDuration: number;
    reward: number;
    requiredAssets: number;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
    votes: {
      id: number;
      eventId: number;
      userId: number;
    }[];
  };
  eventTwo: {
    id: number;
    name: string;
    description: string;
    carbonSave: number;
    eventDuration: number;
    reward: number;
    requiredAssets: number;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
    votes: {
      id: number;
      eventId: number;
      userId: number;
    }[];
  };
};
