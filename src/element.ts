import { Styles } from "./styles";
import { ElementType, type ElementConfig, type PersonConfig } from "./types";
import { elementValidator } from "./validations";

export abstract class Element {
  private name: string;
  private description: string;
  private technology: string;

  private styles: Styles;

  constructor(config: ElementConfig) {
    const validation = elementValidator.safeParse(config);

    if (!validation.success) {
      throw new Error(`Invalid element configuration: ${validation.error}`);
    }

    this.name = config.name;
    this.description = config.description;
    this.technology = config.technology;
    this.styles = new Styles();
  }
}

export class Person extends Element {
  constructor(config: PersonConfig) {
    super({
      ...config,
      elementType: ElementType.PERSON,
      technology: "Person",
    });
  }
}

export class SoftwareSystem extends Element {
  constructor(config: ElementConfig) {
    super(config);
  }
}

export class ExternalSoftwareSystem extends Element {
  constructor(config: ElementConfig) {
    super(config);
  }
}

export class Container extends Element {
  constructor(config: ElementConfig) {
    super(config);
  }
}

export class Component extends Element {
  constructor(config: ElementConfig) {
    super(config);
  }
}
