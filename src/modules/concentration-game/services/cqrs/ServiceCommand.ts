import {ImageModel} from "../../models/ImageModel.ts";
import {ServiceCommandInterface} from "./ServiceCommandInterface.ts";
import {ImageService} from "../image/ImageService.ts";
import {ImageServiceInterface} from "../image/ImageServiceInterface.ts";

export class ServiceCommand implements ServiceCommandInterface {

    private imageService: ImageServiceInterface;

    constructor() {
        this.imageService = new ImageService();
    }

    createImage(params: { image: ImageModel }): Promise<ImageModel | null> {
        const {image} = params;
        try {
            if (!image) {
                console.error("Image is required");
                throw new Error("Image is required");
            }
            return this.imageService.storeImage({createData: image});
        } catch (e) {
            console.error("Failed to create image: ", e);
            throw new Error("Failed to create image");
        }
    }

    deleteImage(params: { id: string }): Promise<{ isDeleted: boolean } | null> {
        try {
            if (!params.id) {
                console.error("Image id is required");
                throw new Error("Image id is required");
            }
            const isDeleted = this.imageService.removeImageFromStorage({id: params.id});
            if (!isDeleted) {
                console.error("Failed to delete image");
                throw new Error("Failed to delete image");
            }
            return isDeleted;
        } catch (e) {
            console.error("Failed to delete image: ", e);
            throw new Error("Failed to delete image");
        }
    }

    updateImage(params: { id: string; image: ImageModel }): Promise<ImageModel | null> {
        const {image} = params;
        try {
            if (!image) {
                console.error("Image is required");
                throw new Error("Image is required");
            }
            return this.imageService.updateImageInStorage({id: params.id, updatedData: image});
        } catch (e) {
            console.error("Failed to update image: ", e);
            throw new Error("Failed to update image");
        }
    }


}