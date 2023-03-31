import ApiService, { ApiData } from "@/api/ApiService";
import { AttemptData } from "@/api/Attempt/AttemptService";

export type EventData = {
  id: number;
  name: string;
  description: string;
  validationText: string;
  carbonSavePerAsset: number;
  eventDuration: number;
  reward: number;
  requiredAssets: number;
  imageUrl: string;
  activeParticipants: number;
  createdAt: string;
  updatedAt: string;
  attempt: AttemptData;
};

export default class EventService {
  private static getEventUrl() {
    return "events";
  }

  public static async getEventById(id: number): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getEventUrl()}/${id}`,
          method: "GET",
        },
        true
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async getNextEventsByIds(
    id1: number,
    id2: number
  ): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getEventUrl()}/next/${id1}/${id2}`,
          method: "GET",
        },
        true
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async getCurrentEvents(): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getEventUrl()}/current`,
          method: "GET",
        },
        true
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async getNextEvents(): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getEventUrl()}/next`,
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
