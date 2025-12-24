import type { RelationConfig } from "./types";

export class Relation {
  private targetId: string;
  private description: string;
  private technology: string;

  constructor(targetId: string, config: RelationConfig) {
    this.targetId = targetId;
    this.description = config.description;
    this.technology = config.technology;
  }
}
