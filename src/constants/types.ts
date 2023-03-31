export type PartOfWithEvents = {
  id: number;
  eventOneId: number;
  eventTwoId: number;
  storyId: number;
  name: string;
  description: string;
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
