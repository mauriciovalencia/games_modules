import {ImageClientInterface} from "../../clients/ImageClientInterface.ts";
import {StorageRepositoryInterface} from "../../repositories/storage/StorageRepositoryInterface.ts";
import {ImageServiceInterface} from "./ImageServiceInterface.ts";
import {ImageModel} from "../../models/ImageModel.ts";
import {ImageConversion} from "../../helpers/ImageConversion.ts";
import {ImageResponseModel} from "../../models/ImageResponseModel.ts";
import {ImageMapper} from "../../mappers/ImageMapper.ts";
import {ImageClient} from "../../clients/ImageClient.ts";
import {StorageRepository} from "../../repositories/storage/StorageRepository.ts";


export class ImageService implements ImageServiceInterface {
    private imageClient: ImageClientInterface;
    private storageRepo: StorageRepositoryInterface<ImageModel>;
    private DATA_TYPE_TAG = 'image';

    constructor() {
        this.imageClient = new ImageClient();
        this.storageRepo = new StorageRepository();
    }

    private async convertImagesToBase64(images: ImageModel[]): Promise<ImageModel[]> {
        try {
            return await Promise.all(images.map(async (image: ImageModel) => {
                image.base_64 = await ImageConversion.toBase64(image.url);
                return image;
            }));
        } catch (e) {
            console.error("Failed to convert images to base64: ", e);
            throw new Error("Failed to convert images to base64");
        }
    }

    private async saveImagesOnStorage(images: ImageModel[]): Promise<ImageModel[]> {
        try {
            await Promise.all(images.map(async (image: ImageModel) => {
                this.storageRepo.saveOnLocalStorageBrowser({
                    key: {
                        id: image.id,
                        name: image.name,
                        dataType: this.DATA_TYPE_TAG,
                    }, data: {value: image}
                });
            }));
            return images;
        } catch (e) {
            console.error("Failed to save images on storage: ", e);
            throw new Error("Failed to save images on storage");
        }
    }

    async fetchImagesFromWebService(): Promise<ImageModel[]> {
        try {
            const response = await this.imageClient.fetchImages();
            let images: ImageModel[] = response.map((value: ImageResponseModel) => {
                return ImageMapper.fromResponseModelToImageModel(value);
            });

            images = await this.convertImagesToBase64(images);
            images = await this.saveImagesOnStorage(images);
            return images;
        } catch (e) {
            console.error("Failed to load images from service: ", e);
            throw new Error("Failed to load images from service");
        }
    }

    async fetchImagesFromStorage(params: {
        page: number;
        pageSize?: number;
        dataType: string;
    }): Promise<ImageModel[]> {
        try {
            const storedImages = this.storageRepo.loadFromLocalStorageBrowserAll(params);
            if (!storedImages) return [];
            return storedImages.map((value) => {
                return value.data.value;
            });
        } catch (e) {
            console.error("Failed to load images from storage: ", e);
            throw new Error("Failed to load images from storage");
        }
    }

    async fetchImageByIdFromStorage(params: { id: string }): Promise<ImageModel | null> {
        try {
            const storedImage = this.storageRepo.loadFromLocalStorageBrowserByKey({
                key: params.id
            });
            if (!storedImage) return null;
            return storedImage.data.value;
        } catch (e) {
            console.error(`Failed to load image with id "${params.id}": ${e}`);
            throw new Error(`Failed to load image with id "${params.id}"`);
        }
    }

    fetchImageByNameFromStorage(params: { name: string }): Promise<ImageModel | null> {
        try {
            const storedImage = this.storageRepo.loadFromLocalStorageBrowserByKey({
                key: params.name
            });
            if (!storedImage) return Promise.resolve(null);
            return Promise.resolve(storedImage.data.value);
        } catch (e) {
            console.error(`Failed to load image with name "${params.name}": ${e}`);
            throw new Error(`Failed to load image with name "${params.name}"`);
        }
    }

    async fetchImagesByDataTypeFromStorage(params: { dataType: string }): Promise<ImageModel[] | null> {
        try {
            const storedImages = this.storageRepo.loadFromLocalStorageBrowserByDataType({dataType: params.dataType});
            if (!storedImages) return [];
            return storedImages.map((value) => {
                return value.data.value;
            });
        } catch (e) {
            console.error(`Failed to load images with dataType "${params.dataType}": ${e}`);
            throw new Error(`Failed to load images with dataType "${params.dataType}"`);
        }
    }

    async storeImage(params: { createData: ImageModel }): Promise<ImageModel | null> {
        const {createData} = params;
        const id = createData.id;
        try {
            createData.base_64 = await ImageConversion.toBase64(createData.url);
            this.storageRepo.saveOnLocalStorageBrowser({
                key: {
                    id,
                    name: createData.name,
                    dataType: this.DATA_TYPE_TAG
                }, data: {value: createData}
            });
            return createData;
        } catch (e) {
            console.error(`Failed to save image with id "${id}": ${e}`);
            throw new Error(`Failed to save image with id "${createData.id}"`);
        }
    }

    async updateImageInStorage(params: { id: string, updatedData: ImageModel }): Promise<ImageModel | null> {
        const {id, updatedData} = params;
        try {
            this.storageRepo.updateOnLocalStorageBrowser({
                key: {id, name: updatedData.name, dataType: this.DATA_TYPE_TAG},
                data: {value: updatedData}
            });
            return updatedData;
        } catch (e) {
            console.error(`Failed to edit image with id "${id}": ${e}`);
            throw new Error(`Failed to edit image with id "${id}"`);
        }
    }

    async removeImageFromStorage(params: { id: string }): Promise<{ isDeleted: boolean } | null> {
        const {id} = params;
        try {
            const isDeleted = this.storageRepo.removeFromLocalStorageBrowserByKey({key: id});
            if (!isDeleted) return null;
            return isDeleted;
        } catch (e) {
            console.error(`Failed to remove image with id "${id}": ${e}`);
            throw new Error(`Failed to remove image with id "${id}"`);
        }
    }

    removeAllImagesFromStorage(): Promise<{ key: string; isDeleted: boolean }[] | null> {
        try {
            const deletedKeys = this.storageRepo.removeFromLocalStorageBrowserByDataType({dataType: this.DATA_TYPE_TAG});
            return Promise.resolve(deletedKeys ? deletedKeys.map(item => ({
                key: item.key.id ?? '', // Provide a default empty string if id is null or undefined
                isDeleted: item.isDeleted
            })) : null);
        } catch (e) {
            console.error("Failed to remove all images from storage: ", e);
            return Promise.reject(new Error("Failed to remove all images from storage"));
        }
    }
}
