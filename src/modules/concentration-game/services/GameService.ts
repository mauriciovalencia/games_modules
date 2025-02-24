import {StorageRepositoryInterface} from "../repositories/storage/StorageRepositoryInterface.ts";
import {StorageRepository} from "../repositories/storage/StorageRepository.ts";
import {GameServiceInterface} from "./GameServiceInterface.ts";

export class GameService implements GameServiceInterface{

    private storage: StorageRepositoryInterface<never>

    constructor() {
        this.storage = new StorageRepository();
    }

    resetStorage(){
        this.storage.resetOnLocalStorageBrowser();
    }
}