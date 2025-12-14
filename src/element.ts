export class Element {
  private name: string;
  private description: string;
  private technology: string;

  constructor(name: string, description: string, technology: string) {
    this.name = name;
    this.description = description;
    this.technology = technology;
  }
}
