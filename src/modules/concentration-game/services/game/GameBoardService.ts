import {GameBoardServiceInterface} from "./GameBoardServiceInterface.ts";
import {GameBoardModel} from "../../models/GameBoardModel.ts";
import {StorageRepositoryInterface} from "../../repositories/storage/StorageRepositoryInterface.ts";
import {StorageRepository} from "../../repositories/storage/StorageRepository.ts";

export class GameBoardService implements GameBoardServiceInterface {
    private storageRepository: StorageRepositoryInterface<GameBoardModel>;
    private DATA_TYPE_TAG = 'game_board';

    constructor() {
        this.storageRepository = new StorageRepository();
    }

    async setGameBoard(data:GameBoardModel): Promise<void> {
        try{
            this.storageRepository.create({
                key: {
                    id: this.DATA_TYPE_TAG,
                    name: this.DATA_TYPE_TAG,
                    dataType: this.DATA_TYPE_TAG
                },
                data: {
                    value: data
                }
            })
        }catch (e) {
            console.error(e);
        }
    }

    async getGameBoard(): Promise<GameBoardModel | undefined> {
        try {
            const storageResponse = this.storageRepository.findByKey({
                key: this.DATA_TYPE_TAG
            });
            if(!storageResponse){
                throw new Error("Failed to fetch game board");
            }
            return storageResponse?.data as unknown as GameBoardModel;
        }catch (e) {
            console.error(e);
        }
    }


}