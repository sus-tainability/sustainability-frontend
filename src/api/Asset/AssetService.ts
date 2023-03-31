import ApiService, { ApiData } from "@/api/ApiService";
import { PhotoState } from "@/utils/atoms/photo/atom";

export type AssetData = {
  id: number;
  attemptId: number;
  imgUrl: string;
  status: string;
};

export type CreateImageAssetData = {
  photoData: PhotoState;
  attemptId: number;
};

export type PendingAsset = {
  id: number;
  imageUrl: string;
  status: string;
  eventId: number;
  name: string;
  percentageComplete: number;
  description: string;
  validationText: string;
};

export default class AssetService {
  private static getAssetUrl(): string {
    return "assets";
  }

  public static async createNewImageAsset(
    createImageAssetData: CreateImageAssetData
  ) {
    console.log(createImageAssetData);
    if (!createImageAssetData || !createImageAssetData.photoData.takenPhoto)
      return Promise.reject("Null Image");

    const formData = new FormData();
    const res = await fetch(createImageAssetData.photoData.takenPhoto.preview);
    const blob = await res.blob();
    formData.append("file", blob, "filename.jpg");

    formData.append("attemptId", createImageAssetData.attemptId.toString());
    try {
      const response = await ApiService.request(
        {
          url: `${this.getAssetUrl()}/images/new`,
          method: "POST",
          data: formData,
        },
        true,
        "",
        "multipart/form-data"
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
