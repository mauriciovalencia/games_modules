class GameConfig {
    private static localConfig = {
        API_IMAGE_URL: import.meta.env.VITE_API_IMAGES_URL || "http://localhost:8080/images",
    };

    private static prodConfig = {
        API_IMAGE_URL: import.meta.env.VITE_API_IMAGES_URL || "https://nowayjose.com",
    };

    private static ENV = import.meta.env.VITE_ENV || "local";

    public static API_IMAGE_URL = GameConfig.ENV === "production" ? GameConfig.prodConfig.API_IMAGE_URL : GameConfig.localConfig.API_IMAGE_URL;
}

export default GameConfig;
