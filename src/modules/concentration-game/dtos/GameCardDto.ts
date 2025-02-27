import { GameCardModel } from "../models/GameCardModel.ts";

export class GameCardDto implements GameCardModel {
    id: string;
    name: string;
    imageId: string;
    base64: string;
    flipped: boolean;
    matched: boolean;

    constructor(data: Partial<GameCardModel> = {}) {
        this.id = data.id ?? "";
        this.name = data.name ?? "Unknown Card";
        this.imageId = data.imageId ?? "";
        this.base64 = data.base64 ?? "";
        this.flipped = data.flipped ?? false;
        this.matched = data.matched ?? false;
    }
}