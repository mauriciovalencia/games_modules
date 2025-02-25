import {StorageRepositoryInterface} from "./StorageRepositoryInterface.ts";
import {LocalStorageDataModel} from "../../models/LocalStorageDataModel.ts";
import {LocalStorageKeyModel} from "../../models/LocalStorageKeyModel.ts";
import {LocalStorageResponseModel} from "../../models/LocalStorageResponseModel.ts";

export class StorageRepository<T> implements StorageRepositoryInterface<T> {

    private parseLocalStorageKey(key: string): LocalStorageKeyModel | null {
        try {
            return JSON.parse(key);
        } catch (error) {
            console.error(`Failed to parse localStorage key ${key}:`, error);
            return null;
        }
    }

    private getItemsByKeyPredicate(predicate: (key: LocalStorageKeyModel) => boolean): {
        key: LocalStorageKeyModel,
        data: LocalStorageDataModel<T>
    }[] {
        const items: { key: LocalStorageKeyModel, data: LocalStorageDataModel<T> }[] = [];

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (!key) continue;

            const parsedKey = this.parseLocalStorageKey(key);
            if (!parsedKey || !predicate(parsedKey)) continue;

            const storedItem = localStorage.getItem(key);
            if (!storedItem) continue;

            try {
                const parsedData: LocalStorageDataModel<T> = JSON.parse(storedItem);
                items.push({key: parsedKey, data: parsedData});
            } catch (error) {
                console.error(`Failed to parse localStorage item ${key}:`, error);
            }
        }
        return items;
    }

    create(params: { key: LocalStorageKeyModel; data: LocalStorageDataModel<T> }): void {
        const {key, data} = params;
        try {
            const keyString = JSON.stringify(key);
            const existingData = localStorage.getItem(keyString);

            if (existingData) {
                this.update({key, data});
            } else {
                localStorage.setItem(keyString, JSON.stringify(data.value));
            }
        } catch (error) {
            console.error(`[StorageRepository] Failed to save/update data: ${error}`);
        }
    }

    find(params: { key: LocalStorageKeyModel }): LocalStorageResponseModel<T>[] | null {
        const {key} = params;
        try {
            const storedData = localStorage.getItem(JSON.stringify(key));
            if (!storedData) return null;
            const parsedData = JSON.parse(storedData);
            return parsedData.map((value: LocalStorageResponseModel<T>) => ({key, data: value}));
        } catch (error) {
            console.error(`[StorageRepository] Failed to load data: ${error}`);
            return null;
        }
    }

    findAll(params: {
        page: number;
        pageSize?: number;
        dataType: string
    }): LocalStorageResponseModel<T>[] | null {
        const {page, pageSize = 20, dataType} = params;
        try {
            const allItems = this.getItemsByKeyPredicate(key => key.dataType === dataType);

            const startIndex = (page - 1) * pageSize;
            const endIndex = startIndex + pageSize;

            return allItems.slice(startIndex, endIndex);
        } catch (error) {
            console.error("Failed to load all items from localStorage:", error);
            return [];
        }
    }

    findByKey(params: { key: string }): LocalStorageResponseModel<T> | null {
        return this.loadFromLocalStorageBrowserByPredicate(key => key.id === params.key);
    }

    findByName(params: { name: string }): LocalStorageResponseModel<T> | null {
        return this.loadFromLocalStorageBrowserByPredicate(key => key.name === params.name);
    }

    findByDataType(params: { dataType: string }): LocalStorageResponseModel<T>[] | null {
        try {
            const items = this.getItemsByKeyPredicate(key => key.dataType === params.dataType);
            return items.length > 0 ? items : null;
        } catch (error) {
            console.error(`[StorageRepository] Failed to load items by dataType:`, error);
            return null;
        }
    }

    private loadFromLocalStorageBrowserByPredicate(predicate: (key: LocalStorageKeyModel) => boolean): LocalStorageResponseModel<T> | null {
        try {
            const items = this.getItemsByKeyPredicate(predicate);
            return items.length > 0 ? items[0] : null;
        } catch (error) {
            console.error(`Failed to load item by predicate:`, error);
            return null;
        }
    }

    update(params: { key: LocalStorageKeyModel; data: LocalStorageDataModel<T> }): {
        key: LocalStorageKeyModel,
        isUpdated: boolean
    } {
        const {key, data} = params;
        try {
            const keyString = JSON.stringify(key);
            const existingData = localStorage.getItem(keyString);

            if (!existingData) {
                console.warn(`[StorageRepository] No existing data found for key: ${keyString}`);
                return {key, isUpdated: false};
            }

            localStorage.setItem(keyString, JSON.stringify(data.value));
            const updatedRecord: LocalStorageDataModel<T> = JSON.parse(<string>localStorage.getItem(keyString));
            if (updatedRecord?.value) {
                return {key, isUpdated: true}
            } else {
                return {key, isUpdated: false}
            }
        } catch (error) {
            console.error(`[StorageRepository] Failed to update data: ${error}`);
            return {key, isUpdated: false};
        }
    }

    delete(params: { key: string }): { isDeleted: boolean } {
        try {
            const recordFound = this.loadFromLocalStorageBrowserByPredicate(key => key.id === params.key);
            if (recordFound) {
                const keyQuery: LocalStorageKeyModel = {
                    id: recordFound.key.id,
                    name: recordFound.key.name,
                    dataType: recordFound.key.dataType,
                }
                localStorage.removeItem(JSON.stringify(keyQuery));
                return {isDeleted: true};
            } else {
                console.warn(`[StorageRepository] No record found for key: ${params.key}`);
                return {isDeleted: false};
            }
        } catch (error) {
            console.error(`[StorageRepository] Failed to remove data: ${error}`);
            return {isDeleted: false};
        }
    }

    deleteByDataType(params: { dataType: string }): {
        key: LocalStorageKeyModel,
        isDeleted: boolean
    }[] {
        const results: { key: LocalStorageKeyModel, isDeleted: boolean }[] = [];
        try {
            const recordsFound = this.loadFromLocalStorageBrowserByPredicate(key => key.dataType === params.dataType);

            if (Array.isArray(recordsFound)) {
                recordsFound.forEach((recordFound) => {
                    const keyQuery: LocalStorageKeyModel = {
                        id: recordFound.key.id,
                        name: recordFound.key.name,
                        dataType: recordFound.key.dataType,
                    };
                    try {
                        localStorage.removeItem(JSON.stringify(keyQuery));
                        results.push({key: keyQuery, isDeleted: true});
                    } catch (error) {
                        console.error(`[StorageRepository] Failed to remove item with key: ${JSON.stringify(keyQuery)}`, error);
                        results.push({key: keyQuery, isDeleted: false});
                    }
                });
            } else {
                console.warn(`[StorageRepository] No records found for dataType: ${params.dataType}`);
            }

            return results;
        } catch (error) {
            console.error(`[StorageRepository] Failed to remove data:`, error);
            return results;
        }
    }

    resetStorage(): void {
        try {
            localStorage.clear();
        } catch (error) {
            console.error(`[StorageRepository] Failed to reset storage: ${error}`);
        }
    }
}
