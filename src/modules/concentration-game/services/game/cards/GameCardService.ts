import {GameCardServiceInterface} from "./GameCardServiceInterface.ts";
import {GameCardModel} from "../../../models/GameCardModel.ts";
import {ImageServiceInterface} from "../../image/ImageServiceInterface.ts";
import {ImageService} from "../../image/ImageService.ts";
import {ImageMapper} from "../../../mappers/ImageMapper.ts";
import {StorageRepositoryInterface} from "../../../repositories/storage/StorageRepositoryInterface.ts";
import {StorageRepository} from "../../../repositories/storage/StorageRepository.ts";

export class GameCardService implements GameCardServiceInterface {
    private imageService: ImageServiceInterface;
    private storageService: StorageRepositoryInterface<GameCardModel>
    private DATA_TYPE_TAG = 'card';

    constructor() {
        this.imageService = new ImageService();
        this.storageService = new StorageRepository();
    }

    createCard(params: { card: GameCardModel }): Promise<GameCardModel> {
        try {
            const card = params.card;
            this.storageService.create({
                key: {
                    id: card.id,
                    name: card.name,
                    dataType: this.DATA_TYPE_TAG,
                }, data: {value: card}
            });
            return Promise.resolve(card);
        } catch (e) {
            console.error("Failed to create card: ", e);
            throw new Error("Failed to create card");
        }
    }

    async createCards(): Promise<GameCardModel[]> {
        try {
            // TODO: unable because storage limit
            /* const images = await this.imageService.getImages({
                page: 1,
                dataType: 'image'
            }); */
            // TODO: meanwhile temporally from web Service, don't forget make IndexedDb implementation on repository
            const images = await this.imageService.fetchImagesFromWebService();
            if (!images) {
                throw new Error("Failed to fetch images");
            }
            const cards = images?.map((image, index) => {
                return ImageMapper.fromImageModelToCardModel({id: index, image});
            });
            // TODO: meanwhile temporally from web Service, don't forget make IndexedDb implementation on repository
            /* await Promise.all(cards.map(async (card: GameCardModel) => {
                this.storageService.create({
                    key: {
                        id: card.id,
                        name: card.name,
                        dataType: this.DATA_TYPE_TAG,
                    }, data: {value: card}
                });
            })); */
            await Promise.all(cards.map(async (card: GameCardModel) => {
                // card.base64 = ''; depends right now of LocalStorage Limit
                this.storageService.create({
                    key: {
                        id: card.id,
                        name: card.name,
                        dataType: this.DATA_TYPE_TAG,
                    }, data: {value: card}
                });
            }));
            return cards;
        } catch (e) {
            console.error("Failed to create cards: ", e);
            throw new Error("Failed to create cards");
        }
    }

    async getCards(): Promise<GameCardModel[]> {
        try {
            const storageResult = this.storageService.findByDataType({
                dataType: this.DATA_TYPE_TAG
            })
            return storageResult?.map((card) => card?.data) as unknown as GameCardModel[];
        } catch (e) {
            console.error("Failed to get cards: ", e);
            throw new Error("Failed to get cards");
        }

    }
}