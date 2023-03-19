import ApiService, { ApiData } from "@/api/ApiService";

export default class UserService {
  private static getUserUrl() {
    return "users";
  }

  public static async getSelf(): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getUserUrl()}/getSelf`,
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
