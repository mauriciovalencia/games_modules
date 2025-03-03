import {ImageClientInterface} from "./ImageClientInterface.ts";
import {ImageResponseModel} from "../models/ImageResponseModel.ts";
import {ImageResponseDto} from "../dtos/ImageResponseDto.ts";
import GameConfig from "../config/GameConfig.ts";

export class ImageClient implements ImageClientInterface{
    private readonly API_URL = GameConfig.API_IMAGE_URL;

    async fetchImages(): Promise<ImageResponseModel[]> {
        try {
            const response = await fetch(this.API_URL, {
                method: "GET",
                redirect: "follow",
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch images. Status: ${response.status}`);
            }

            const data = await response.json();
            return ImageResponseDto.fromJSONArray(data);
        } catch (error) {
            console.error("Error fetching images:", error);
            return [];
        }
    }

}