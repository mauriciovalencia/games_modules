import {CardModel} from "../../models/CardModel.ts";

export interface CardServiceInterface {
    getCards(): Promise<CardModel[]>
    //getCard(id: string): Promise<CardModel | null>
    createCard(params: { card: CardModel }): Promise<CardModel>
    createCards(): Promise<CardModel[]>
    //updateCard(params: { id: string, card: CardModel }): Promise<CardModel | null>
    //deleteCard(params: { id: string }): Promise<{ isDeleted: boolean } | null>
}