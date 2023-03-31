import ApiService, { ApiData } from "@/api/ApiService";
import { PhotoState } from "@/utils/atoms/photo/atom";
import { base64FromPath } from "@capacitor-community/react-hooks/filesystem";
import { b64toBlob } from "@/utils/blob";

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
    const base64String = await base64FromPath(
      createImageAssetData.photoData.takenPhoto.preview
    );
    // Split the base64 string in data and contentType
    const block = base64String.split(";");
    // Get the content type of the image
    const contentType = block[0].split(":")[1]; // In this case "image/gif"
    // get the real base64 content of the file
    const realData = block[1].split(",")[1]; // In this case "R0lGODlhPQBEAPeoAJosM...."

    // Convert it to a blob to upload
    const blob = b64toBlob(realData, contentType);
    // Create a FormData and append the file with "file" as parameter name
    formData.append("file", blob);
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
