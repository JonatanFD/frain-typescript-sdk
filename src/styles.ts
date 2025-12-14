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

  public static createSoftwareSystem() {
    const styles = new Styles();

    styles.setShape(ElementShape.RECTANGLE);
    styles.setColor("#000000");
    styles.setBackgroundColor("#ffffff");

    return styles;
  }

  public static createExternalSoftwareSystem() {
    const styles = new Styles();

    styles.setShape(ElementShape.RECTANGLE);
    styles.setColor("#666666");
    styles.setBackgroundColor("#ffffff");

    return styles;
  }

  public static createContainer() {
    const styles = new Styles();

    styles.setShape(ElementShape.ROUNDED_BOX);
    styles.setColor("#000000");
    styles.setBackgroundColor("#f0f0f0");

    return styles;
  }

  public static createComponent() {
    const styles = new Styles();

    styles.setShape(ElementShape.ROUNDED_BOX);
    styles.setColor("#000000");
    styles.setBackgroundColor("#e0e0e0");

    return styles;
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
