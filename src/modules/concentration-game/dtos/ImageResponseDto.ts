import {ImageResponseModel} from "../models/ImageResponseModel.ts";

export class ImageResponseDto implements ImageResponseModel{
    url: string;
    uuid: string;
    title: string;
    content_type: string;

    constructor(data:{
        url: string,
        uuid: string,
        title: string,
        content_type: string
    }) {
        this.url = this.validateString(data.url, "url");
        this.uuid = this.validateUUID(data.uuid);
        this.title = this.validateString(data.title, "title");
        this.content_type = this.validateContentType(data.content_type);
    }

    private validateString(value: string, fieldName: string): string {
        if (value.trim() === "") {
            throw new Error(`Invalid ${fieldName}. Expected a non-empty string.`);
        }
        return value;
    }

    private validateUUID(value: string): string {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(value)) {
            throw new Error("Invalid UUID format.");
        }
        return value;
    }

    private validateContentType(value: string): string {
        const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
        if (!validTypes.includes(value)) {
            throw new Error(`Invalid content type: ${value}`);
        }
        return value;
    }

    static fromJSON(data: ImageResponseModel): ImageResponseDto {
        return new ImageResponseDto(data);
    }

    static fromJSONArray(dataArray: ImageResponseModel[]): ImageResponseDto[] {
        if (!Array.isArray(dataArray)) {
            throw new Error("Invalid response format. Expected an array.");
        }
        return dataArray.map((data) => new ImageResponseDto(data));
    }

}