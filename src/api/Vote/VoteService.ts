import ApiService, { ApiData } from "@/api/ApiService";

export default class VoteService {
  private static getVoteUrl(): string {
    return "vote";
  }

  public static async createVote(eventId: number): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getVoteUrl()}/new`,
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
