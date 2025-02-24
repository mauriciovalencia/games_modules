import {LocalStorageDataModel} from "../../models/LocalStorageDataModel.ts";
import {LocalStorageKeyModel} from "../../models/LocalStorageKeyModel.ts";
import {LocalStorageResponseModel} from "../../models/LocalStorageResponseModel.ts";

export interface StorageRepositoryInterface<T> {
    saveOnLocalStorageBrowser(params: { key: LocalStorageKeyModel, data: LocalStorageDataModel<T> }): void;

    loadFromLocalStorageBrowser(params: { key: LocalStorageKeyModel }): LocalStorageResponseModel<T>[] | null;

    loadFromLocalStorageBrowserAll(params: {
        page: number;
        pageSize?: number;
        dataType: string;
    }): LocalStorageResponseModel<T>[] | null;

    loadFromLocalStorageBrowserByKey(params: { key: string }): LocalStorageResponseModel<T> | null;

    loadFromLocalStorageBrowserByName(params: { name: string }): LocalStorageResponseModel<T> | null;

    loadFromLocalStorageBrowserByDataType(params: { dataType: string }): LocalStorageResponseModel<T>[] | null;

    updateOnLocalStorageBrowser(params: { key: LocalStorageKeyModel, data: LocalStorageDataModel<T> }): {
        key: LocalStorageKeyModel,
        isUpdated: boolean
    } | null;

    removeFromLocalStorageBrowserByKey(params: { key: string }): { isDeleted: boolean } | null;

    removeFromLocalStorageBrowserByDataType(params: { dataType: string }): {
        key: LocalStorageKeyModel,
        isDeleted: boolean
    }[] | null;

    resetOnLocalStorageBrowser(): void;
}