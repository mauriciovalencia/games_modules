import {GameControllerInterface} from "./controllers/GameControllerInterface.ts";
import {GameController} from "./controllers/GameController.ts";

class IoCContainer {
    private services: Map<string, any> = new Map();

    register<T>(name: string, service: new () => T): void {
        this.services.set(name, new service());
    }

    resolve<T>(name: string): T {
        const service = this.services.get(name);
        if (!service) {
            throw new Error(`Service not found: ${name}`);
        }
        return service;
    }
}

const container = new IoCContainer();
container.register<GameControllerInterface>("GameController", GameController);
export { container };