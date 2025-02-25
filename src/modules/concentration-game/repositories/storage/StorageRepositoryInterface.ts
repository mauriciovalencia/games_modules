import {LocalStorageDataModel} from "../../models/LocalStorageDataModel.ts";
import {LocalStorageKeyModel} from "../../models/LocalStorageKeyModel.ts";
import {LocalStorageResponseModel} from "../../models/LocalStorageResponseModel.ts";

export interface StorageRepositoryInterface<T> {
    create(params: { key: LocalStorageKeyModel, data: LocalStorageDataModel<T> }): void;

    find(params: { key: LocalStorageKeyModel }): LocalStorageResponseModel<T>[] | null;

    findAll(params: {
        page: number;
        pageSize?: number;
        dataType: string;
    }): LocalStorageResponseModel<T>[] | null;

    findByKey(params: { key: string }): LocalStorageResponseModel<T> | null;

    findByName(params: { name: string }): LocalStorageResponseModel<T> | null;

    findByDataType(params: { dataType: string }): LocalStorageResponseModel<T>[] | null;

    update(params: { key: LocalStorageKeyModel, data: LocalStorageDataModel<T> }): {
        key: LocalStorageKeyModel,
        isUpdated: boolean
    } | null;

    delete(params: { key: string }): { isDeleted: boolean } | null;

    deleteByDataType(params: { dataType: string }): {
        key: LocalStorageKeyModel,
        isDeleted: boolean
    }[] | null;

    resetStorage(): void;
}