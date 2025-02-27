import {GameCardModel} from "../../../models/GameCardModel.ts";

export interface GameCardServiceInterface {
    getCards(): Promise<GameCardModel[]>
    //getCard(id: string): Promise<GameCardModel | null>
    createCard(params: { card: GameCardModel }): Promise<GameCardModel>
    createCards(): Promise<GameCardModel[]>
    //updateCard(params: { id: string, card: GameCardModel }): Promise<GameCardModel | null>
    //deleteCard(params: { id: string }): Promise<{ isDeleted: boolean } | null>
}