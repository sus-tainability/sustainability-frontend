import ApiService, { ApiData } from "@/api/ApiService";
import { AssetData } from "@/api/Asset/AssetService";

export type AttemptData = {
  attemptId: number;
  eventId: number;
  userId: number;
  startDate: string;
  isCompleted: boolean;
  carbonSave: number;
  assets: AssetData[];
  createdAt: string;
  updatedAt: string;
};

export default class AttemptService {
  private static getAttemptUrl(): string {
    return "attempt";
  }

  public static async createAttempt(eventId: number): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getAttemptUrl()}/new`,
          method: "POST",
          data: {
            eventId,
          },
        },
        true
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
