import {ImageModel} from "../models/ImageModel.ts";
import {ImageResponseDto} from "../dtos/ImageResponseDto.ts";
import {ImageResponseModel} from "../models/ImageResponseModel.ts";
import {GameCardModel} from "../models/GameCardModel.ts";

export class ImageMapper {
    static fromResponseDtoToImageModel(dto: ImageResponseDto): ImageModel {
        return {
            id: dto.uuid,
            url: dto.url,
            name: dto.title,
            content_type: dto.content_type,
            size: 0,
            base_64: null,
            created_at: new Date(),
            updated_at: null,
            deleted_at: null,
        };
    }

    static fromResponseModelToImageModel(dto: ImageResponseModel): ImageModel {
        return {
            id: dto.uuid,
            url: dto.url,
            name: dto.title,
            content_type: dto.content_type,
            size: 0,
            base_64: null,
            created_at: new Date(),
            updated_at: null,
            deleted_at: null,
        };
    }

    static fromImageModelToCardModel(params:{id: number, image: ImageModel}): GameCardModel {
        const {id, image} = params;
        return {
            id : id.toString(),
            name: image.name,
            imageId: image.id,
            base64: image.base_64 || '',
            flipped: false,
            matched: false
        }
    }

}