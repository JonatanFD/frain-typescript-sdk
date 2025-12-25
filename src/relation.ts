import type { RelationConfig, RelationJSON } from "./types";

export class Relation {
    private targetId: string;
    private description: string;
    private technology: string;

    constructor(targetId: string, config: RelationConfig) {
        this.targetId = targetId;
        this.description = config.description;
        this.technology = config.technology;
    }

    public getTargetId(): string {
        return this.targetId;
    }

    public getDescription(): string {
        return this.description;
    }

    public getTechnology(): string {
        return this.technology;
    }

    public toJSON(): RelationJSON {
        return {
            targetId: this.targetId,
            description: this.description,
            technology: this.technology,
        };
    }
}
