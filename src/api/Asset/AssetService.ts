import ApiService, { ApiData } from "@/api/ApiService";

export type AssetData = {
  id: number;
  attemptId: number;
  imgUrl: string;
  status: string;
};

export type CreateImageAssetData = {
  file: File;
  attemptId: number;
};

export default class AssetService {
  private static getAssetUrl(): string {
    return "assets";
  }

  public static async createNewImageAsset(
    createImageAssetData: CreateImageAssetData
  ) {
    const formData = new FormData();
    formData.append("file", createImageAssetData.file);
    formData.append("attemptId", createImageAssetData.attemptId.toString());
    try {
      const response = await ApiService.request(
        {
          url: `${this.getAssetUrl()}/new`,
          method: "POST",
          data: formData,
        },
        true
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async validateImageAsset(imageId: number) {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getAssetUrl()}/images/validate`,
          method: "POST",
          data: {
            imageId,
          },
        },
        true
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async rejectImageAsset(imageId: number) {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getAssetUrl()}/images/reject`,
          method: "POST",
          data: {
            imageId,
          },
        },
        true
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async getPendingAssets(): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getAssetUrl()}/images/pending`,
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
