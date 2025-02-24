import {ImageModel} from "../../models/ImageModel.ts";

export interface ServiceCommandInterface {
    createImage(params:{image: ImageModel}): Promise<ImageModel | null>;
    updateImage(params:{id:string,image: ImageModel}): Promise<ImageModel | null>;
    deleteImage(params:{id:string}): Promise<{ isDeleted: boolean } | null>;
}