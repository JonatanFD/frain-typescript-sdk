import type { SoftwareSystem } from "./element";

export interface ContainerViewConfig {
    title: string;
    description: string;
}

export interface ContainerViewJSON {
    type: "container-view";
    targetSystemId: string;
    title: string;
    description: string;
}

export class ContainerView {
    private targetSystem: SoftwareSystem;
    private title: string;
    private description: string;

    constructor(system: SoftwareSystem, config: ContainerViewConfig) {
        this.targetSystem = system;
        this.title = config.title;
        this.description = config.description;
    }

    public getTargetSystem(): SoftwareSystem {
        return this.targetSystem;
    }

    public getTargetSystemId(): string {
        return this.targetSystem.getId();
    }

    public getTitle(): string {
        return this.title;
    }

    public getDescription(): string {
        return this.description;
    }

    public toJSON(): ContainerViewJSON {
        return {
            type: "container-view",
            targetSystemId: this.targetSystem.getId(),
            title: this.title,
            description: this.description,
        };
    }
}
