import { ImageClientInterface } from "./ImageClientInterface";
import {ImageResponseModel} from "../models/ImageResponseModel.ts";

export class ImageClientMock implements ImageClientInterface {
    async fetchImages(): Promise<ImageResponseModel[]> {
        return [
            {
                url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
                uuid: "mock-uuid-1",
                title: "Mock Image",
                contentType: "image/png",
            },
        ];
    }
}
