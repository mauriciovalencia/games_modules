import {ServiceQueryInterface} from "./ServiceQueryInterface.ts";
import {ImageModel} from "../../models/ImageModel.ts";
import {ImageServiceInterface} from "../image/ImageServiceInterface.ts";
import {ImageService} from "../image/ImageService.ts";

export class ServiceQuery implements ServiceQueryInterface {

    private imageService: ImageServiceInterface;

    constructor() {
        this.imageService = new ImageService();
    }

    getImages(): Promise<ImageModel[] | null> {
        try {
            return this.imageService.fetchImagesFromStorage({
                page: 1,
                dataType: 'image'
            });
        } catch (e) {
            console.error("Failed to fetch images: ", e);
            throw new Error("Failed to fetch images");
        }
    }

    getImageById(id: string): Promise<ImageModel | null> {
        try {
            return this.imageService.fetchImageByIdFromStorage({id});
        } catch (e) {
            console.error("Failed to fetch image: ", e);
            throw new Error("Failed to fetch image");
        }
    }

    getImageByName(name: string): Promise<ImageModel | null> {
        try {
            return this.imageService.fetchImageByNameFromStorage({name});
        } catch (e) {
            console.error("Failed to fetch image: ", e);
            throw new Error("Failed to fetch image");
        }
    }

    getImagesByDataType(dataType: string): Promise<ImageModel[] | null> {
        try {
            return this.imageService.fetchImagesByDataTypeFromStorage({dataType});
        } catch (e) {
            console.error("Failed to fetch images: ", e);
            throw new Error("Failed to fetch images");
        }
    }
}