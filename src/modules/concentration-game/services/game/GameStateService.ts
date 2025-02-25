import {GameStateServiceInterface} from "./GameStateServiceInterface.ts";
import {GameStateModel} from "../../models/GameStateModel.ts";
import {StorageRepository} from "../../repositories/storage/StorageRepository.ts";

export class GameStateService implements GameStateServiceInterface {
    private storageRepository: StorageRepository<GameStateModel>;
    private DATA_TYPE_TAG = 'game_state';

    constructor() {
        this.storageRepository = new StorageRepository();
    }

    async setGameState(gameState: GameStateModel): Promise<void> {
        try {
            const repoFindResult = this.storageRepository.findByKey({key: this.DATA_TYPE_TAG});
            if (!repoFindResult) {
                this.storageRepository.create({
                    key: {id: this.DATA_TYPE_TAG, name: this.DATA_TYPE_TAG, dataType: this.DATA_TYPE_TAG},
                    data: {
                        value: gameState
                    }
                });
            }
        } catch (e) {
            console.error("Failed to set game state: ", e);
            throw new Error("Failed to set game state");
        }
    }

    async getGameState(): Promise<GameStateModel | null> {
        try {
            const repoFindResult = this.storageRepository.findByKey({key: this.DATA_TYPE_TAG});
            if (!repoFindResult) {
                return null;
            }
            return repoFindResult?.data as unknown as GameStateModel;
        } catch (e) {
            console.error("Failed to get game state: ", e);
            throw new Error("Failed to get game state");
        }
    }
}