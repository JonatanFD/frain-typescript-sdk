import { ElementShape } from "./types";

export class Styles {
  private shape: ElementShape;
  private color: string; // HEX
  private backgroundColor: string; // HEX

  constructor() {
    this.shape = ElementShape.RECTANGLE;
    this.color = "#ffffff";
    this.backgroundColor = "#000000";
  }

  public static createPerson() {
    const personStyles = new Styles();

    personStyles.setShape(ElementShape.PERSON);
    personStyles.setColor("#00396E");
    personStyles.setBackgroundColor("#ffffff");

    return personStyles;
  }

  public setShape(shape: ElementShape) {
    this.shape = shape;
  }

  public setColor(color: string) {
    this.color = color;
  }

  public setBackgroundColor(backgroundColor: string) {
    this.backgroundColor = backgroundColor;
  }
}
