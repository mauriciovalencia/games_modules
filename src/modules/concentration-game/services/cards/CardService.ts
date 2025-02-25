import {CardServiceInterface} from "./CardServiceInterface.ts";
import {CardModel} from "../../models/CardModel.ts";
import {ImageServiceInterface} from "../image/ImageServiceInterface.ts";
import {ImageService} from "../image/ImageService.ts";
import {ImageMapper} from "../../mappers/ImageMapper.ts";
import {StorageRepositoryInterface} from "../../repositories/storage/StorageRepositoryInterface.ts";
import {StorageRepository} from "../../repositories/storage/StorageRepository.ts";

export class CardService implements CardServiceInterface {
    private imageService: ImageServiceInterface;
    private storageService: StorageRepositoryInterface<CardModel>
    private DATA_TYPE_TAG = 'card';

    constructor() {
        this.imageService = new ImageService();
        this.storageService = new StorageRepository();
    }

    createCard(params: { card: CardModel }): Promise<CardModel> {
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

    async createCards(): Promise<CardModel[]> {
        try {
            const images = await this.imageService.fetchImagesFromStorage({
                page: 1,
                dataType: 'image'
            });
            if (!images) {
                throw new Error("Failed to fetch images");
            }
            /* const cards = images?.map((image, index) => {
                return ImageMapper.fromImageModelToCardModel({id: index, image});
            }); */
            const cards: CardModel[] = [];
            images?.forEach((image, index) => {
                if(index <= 10){
                    const dataResponse = ImageMapper.fromImageModelToCardModel({id: index, image});
                    cards.push(dataResponse);
                }
            });
            await Promise.all(cards.map(async (card: CardModel) => {
                this.storageService.create({
                    key: {
                        id: card.id,
                        name: card.name,
                        dataType: this.DATA_TYPE_TAG,
                    }, data: {value: card}
                });
            }));
            await this.imageService.removeAllImagesFromStorage();
            return cards;
        } catch (e) {
            console.error("Failed to create cards: ", e);
            throw new Error("Failed to create cards");
        }
    }

    async getCards(): Promise<CardModel[]> {
        try {
            const storageResult = this.storageService.findByDataType({
                dataType: this.DATA_TYPE_TAG
            })
            return storageResult?.map((card) => card?.data) as unknown as CardModel[];
        } catch (e) {
            console.error("Failed to get cards: ", e);
            throw new Error("Failed to get cards");
        }

    }
}