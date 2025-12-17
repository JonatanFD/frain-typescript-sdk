import { ElementShape } from "./types";
import { stylesConfigValidator, type StylesConfig } from "./validations";

export class Styles {
  private shape: ElementShape;
  private color: string; // HEX
  private backgroundColor: string; // HEX

  constructor(config?: Partial<StylesConfig>) {
    if (config) {
      const validation = stylesConfigValidator.partial().safeParse(config);

      if (!validation.success) {
        throw new Error(
          `Invalid styles configuration: ${validation.error.message}`,
        );
      }

      this.shape = validation.data.shape ?? ElementShape.RECTANGLE;
      this.color = validation.data.color ?? "#ffffff";
      this.backgroundColor = validation.data.backgroundColor ?? "#000000";
    } else {
      this.shape = ElementShape.RECTANGLE;
      this.color = "#ffffff";
      this.backgroundColor = "#000000";
    }
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
    const validation = stylesConfigValidator
      .pick({ color: true })
      .safeParse({ color });

    if (!validation.success) {
      throw new Error(`Invalid color: ${validation.error.message}`);
    }

    this.color = validation.data.color;
  }

  public setBackgroundColor(backgroundColor: string) {
    const validation = stylesConfigValidator
      .pick({ backgroundColor: true })
      .safeParse({ backgroundColor });

    if (!validation.success) {
      throw new Error(`Invalid backgroundColor: ${validation.error.message}`);
    }

    this.backgroundColor = validation.data.backgroundColor;
  }
}
