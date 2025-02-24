export class ImageConversion {
    /**
     * Converts a Blob to a Base64 string.
     */
    private static async convertBlobToBase64(blob: Blob): Promise<string> {
        try {
            const reader = new FileReader();

            return await new Promise<string>((resolve, reject) => {
                reader.onloadend = () => {
                    if (typeof reader.result === "string") {
                        resolve(reader.result);
                    } else {
                        reject(new Error("FileReader failed to read the blob as Base64."));
                    }
                };

                reader.onerror = () => reject(new Error("Error occurred while reading the Blob as Base64."));
                reader.readAsDataURL(blob);
            });
        } catch (error) {
            console.error("convertBlobToBase64 failed:", error);
            throw new Error("Failed to convert Blob to Base64.");
        }
    }

    /**
     * Converts an image URL to Base64.
     */
    public static async toBase64(url: string): Promise<string> {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch image. HTTP status: ${response.status}`);
            }
            const blob = await response.blob();
            return await this.convertBlobToBase64(blob);
        } catch (error) {
            console.error("toBase64 failed:", error);
            throw new Error("Failed to convert URL to Base64.");
        }
    }

}