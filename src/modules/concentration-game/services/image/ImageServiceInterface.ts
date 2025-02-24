import {ImageModel} from "../../models/ImageModel.ts";

export interface ImageServiceInterface {
    fetchImagesFromWebService(): Promise<ImageModel[] | null>;

    fetchImagesFromStorage(params: {
        page: number;
        pageSize?: number;
        dataType: string;
    }): Promise<ImageModel[] | null>;

    fetchImageByIdFromStorage(params: { id: string }): Promise<ImageModel | null>;

    fetchImageByNameFromStorage(params: { name: string }): Promise<ImageModel | null>;

    fetchImagesByDataTypeFromStorage(params: { dataType: string }): Promise<ImageModel[] | null>;

    storeImage(params: { createData: ImageModel }): Promise<ImageModel | null>;

    updateImageInStorage(params: { id: string; updatedData: ImageModel }): Promise<ImageModel | null>;

    removeImageFromStorage(params: { id: string }): Promise<{ isDeleted: boolean } | null>;

    removeAllImagesFromStorage(): Promise<{ key: string; isDeleted: boolean }[] | null>;
}

