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
    personStyles.setColor("#ffffff");
    personStyles.setBackgroundColor("#003668");

    return personStyles;
  }

  public static createSoftwareSystem() {
    const styles = new Styles();

    styles.setShape(ElementShape.RECTANGLE);
    styles.setColor("#ffffff");
    styles.setBackgroundColor("#0055A4");

    return styles;
  }

  public static createExternalSoftwareSystem() {
    const styles = new Styles();

    styles.setShape(ElementShape.RECTANGLE);
    styles.setColor("#ffffff");
    styles.setBackgroundColor("#81788A");

    return styles;
  }

  public static createContainer() {
    const styles = new Styles();

    styles.setShape(ElementShape.ROUNDED_BOX);
    styles.setColor("#ffffff");
    styles.setBackgroundColor("#0097D1");

    return styles;
  }

  public static createComponent() {
    const styles = new Styles();

    styles.setShape(ElementShape.ROUNDED_BOX);
    styles.setColor("#ffffff");
    styles.setBackgroundColor("#50B5ED");

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
