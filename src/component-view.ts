import type { Container } from "./element";

export interface ComponentViewConfig {
    title: string;
    description: string;
}

export interface ComponentViewJSON {
    type: "component-view";
    targetContainerId: string;
    title: string;
    description: string;
}

export class ComponentView {
    private targetContainer: Container;
    private title: string;
    private description: string;

    constructor(container: Container, config: ComponentViewConfig) {
        this.targetContainer = container;
        this.title = config.title;
        this.description = config.description;
    }

    public getTargetContainer(): Container {
        return this.targetContainer;
    }

    public getTargetContainerId(): string {
        return this.targetContainer.getId();
    }

    public getTitle(): string {
        return this.title;
    }

    public getDescription(): string {
        return this.description;
    }

    public toJSON(): ComponentViewJSON {
        return {
            type: "component-view",
            targetContainerId: this.targetContainer.getId(),
            title: this.title,
            description: this.description,
        };
    }
}
