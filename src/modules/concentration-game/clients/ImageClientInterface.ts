import {ImageResponseModel} from "../models/ImageResponseModel.ts";

export interface ImageClientInterface {
    /**
     * Fetches images from the API.
     * @returns A promise resolving to an array of image models.
     */
    fetchImages(): Promise<ImageResponseModel[]>;
}