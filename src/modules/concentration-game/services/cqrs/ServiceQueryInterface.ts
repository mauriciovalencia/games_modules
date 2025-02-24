import {ImageModel} from "../../models/ImageModel.ts";

export interface ServiceQueryInterface {
    getImages(): Promise<ImageModel[] | null>
}