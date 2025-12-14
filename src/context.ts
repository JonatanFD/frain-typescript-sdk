import z from "zod";

export class Context {
  private title: string;
  private description: string;

  constructor() {
    this.title = "";
    this.description = "";
  }

  setTitle(title: string): void {
    if (z.string().min(1).max(100).safeParse(title).success) {
      this.title = title;
    }

    throw new Error("Error setting title to Context Diagram");
  }

  setDescription(description: string): void {
    if (z.string().min(1).max(100).safeParse(description).success) {
      this.description = description;
    }

    throw new Error("Error setting description to Context Diagram");
  }
}
