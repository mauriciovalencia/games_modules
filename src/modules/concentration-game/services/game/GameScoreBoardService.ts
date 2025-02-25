import {GameScoreBoardServiceInterface} from "./GameScoreBoardServiceInterface.ts";
import {StorageRepositoryInterface} from "../../repositories/storage/StorageRepositoryInterface.ts";
import {GameScoreBoardModel} from "../../models/GameScoreBoardModel.ts";
import {StorageRepository} from "../../repositories/storage/StorageRepository.ts";

export class GameScoreBoardService implements GameScoreBoardServiceInterface {
    private storageRepository: StorageRepositoryInterface<GameScoreBoardModel>;
    private DATA_TYPE_TAG = 'game_score_board';

    constructor() {
        this.storageRepository = new StorageRepository();
    }

    async setScoreBoard(data: GameScoreBoardModel): Promise<void> {
        try {
            this.storageRepository.create({
                key: {
                    id: this.DATA_TYPE_TAG,
                    name: this.DATA_TYPE_TAG,
                    dataType: this.DATA_TYPE_TAG,
                },
                data: {
                    value: data
                }
            });
        } catch (e) {
            console.error("Failed to set score: ", e);
            throw new Error("Failed to set score");
        }
    }

    async getScoreBoard(): Promise<GameScoreBoardModel> {
        try {
            const repoResult = this.storageRepository.findByKey({
                key: this.DATA_TYPE_TAG,
            });
            if (!repoResult) {
                throw new Error("Failed to fetch score");
            }
            return repoResult?.data as unknown as GameScoreBoardModel;
        } catch (e) {
            console.error("Failed to fetch score: ", e);
            throw new Error("Failed to fetch score");
        }
    }

    async updateSoreBoard(params: { key: string; data: GameScoreBoardModel }): Promise<void> {
        try {
            const repoResult = this.storageRepository.update({
                key: {
                    id: this.DATA_TYPE_TAG,
                    name: this.DATA_TYPE_TAG,
                    dataType: this.DATA_TYPE_TAG,
                },
                data: {
                    value: params.data
                }
            })
            if (!repoResult || repoResult?.isUpdated) {
                throw new Error("Failed to update score");
            }
        } catch (e) {
            console.error("Failed to update score: ", e);
            throw new Error("Failed to update score");
        }
    }

    async resetScoreBoard(): Promise<void> {
        try {
            this.storageRepository.delete({
                key: this.DATA_TYPE_TAG
            });
        } catch (e) {
            console.error("Failed to reset score: ", e);
            throw new Error("Failed to reset score");
        }
    }

}