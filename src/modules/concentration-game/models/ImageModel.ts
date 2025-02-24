export interface ImageModel {
    id: string;
    url:string;
    name: string;
    content_type: string;
    size: number;
    base_64: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    deleted_at: Date | null;
}