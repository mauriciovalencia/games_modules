import {LocalStorageKeyModel} from "./LocalStorageKeyModel.ts";
import {LocalStorageDataModel} from "./LocalStorageDataModel.ts";

export interface LocalStorageResponseModel<T> {
    key: LocalStorageKeyModel;
    data: LocalStorageDataModel<T>
}