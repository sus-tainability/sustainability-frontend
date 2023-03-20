import ApiService, { ApiData } from "@/api/ApiService";
import { EventData } from "@/api/Event/EventService";

export type StoryData = {
  id: number;
  name: string;
  description: string;
  partOf: PartOfData[];
};

export type PartOfData = {
  eventOneId: number;
  eventTwoId: number;
  storyId: number;
  name: string;
  description: string;
  startDate: string;
  createdAt: string;
  updatedAt: string;
  eventOne: EventData;
  eventTwo: EventData;
};

export default class StoryService {
  private static getStoryUrl(): string {
    return "story";
  }

  public static async getCurrentStory(): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getStoryUrl()}/current`,
          method: "GET",
        },
        true
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
