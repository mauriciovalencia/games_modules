import {ImageModel} from "../../models/ImageModel.ts";

export interface ImageServiceInterface {
    fetchImagesFromWebService(): Promise<ImageModel[] | null>;

    getImages(params: {
        page: number;
        pageSize?: number;
        dataType: string;
    }): Promise<ImageModel[] | null>;

    getImageById(params: { id: string }): Promise<ImageModel | null>;

    getImageByName(params: { name: string }): Promise<ImageModel | null>;

    getImagesByDataType(params: { dataType: string }): Promise<ImageModel[] | null>;

    saveImage(params: { createData: ImageModel }): Promise<ImageModel | null>;

    updateImage(params: { id: string; updatedData: ImageModel }): Promise<ImageModel | null>;

    deleteImage(params: { id: string }): Promise<{ isDeleted: boolean } | null>;

    deleteImages(): Promise<{ key: string; isDeleted: boolean }[] | null>;
}

