import { Relation } from "./relation";
import { Styles } from "./styles";
import {
  ElementType,
  type ElementConfig,
  type PersonConfig,
  type SoftwareSystemConfig,
  type ExternalSoftwareSystemConfig,
  type ContainerConfig,
  type ComponentConfig,
  type RelationConfig,
} from "./types";
import {
  elementValidator,
  elementWithTechnologyValidator,
} from "./validations";

export abstract class Element {
  private id: string;

  private name: string;
  private description: string;
  private technology: string;

  private relations: Relation[] = []; // used to store references to other elements

  protected styles: Styles;

  protected constructor(
    config: ElementConfig,
    requireTechnology: boolean = false,
  ) {
    const validator = requireTechnology
      ? elementWithTechnologyValidator
      : elementValidator;
    const validation = validator.safeParse(config);

    if (!validation.success) {
      throw new Error(`Invalid element configuration: ${validation.error}`);
    }

    this.name = config.name;
    this.description = config.description;
    this.technology = config.technology || "";
    this.id = crypto.randomUUID();

    this.styles = new Styles();
  }

  public use(element: Element, config: RelationConfig) {
    this.relations.push(new Relation(element.id, config));
  }
}

export class Person extends Element {
  constructor(config: PersonConfig) {
    super({
      ...config,
      elementType: ElementType.PERSON,
      technology: "Person",
    });
    this.styles = Styles.createPerson();
  }
}

export class SoftwareSystem extends Element {
  constructor(config: SoftwareSystemConfig) {
    super({
      ...config,
      elementType: ElementType.SOFTWARE_SYSTEM,
      technology: "Software System",
    });
    this.styles = Styles.createSoftwareSystem();
  }
}

export class ExternalSoftwareSystem extends Element {
  constructor(config: ExternalSoftwareSystemConfig) {
    super({
      ...config,
      elementType: ElementType.EXTERNAL_SOFTWARE_SYSTEM,
      technology: "External Software System",
    });
    this.styles = Styles.createExternalSoftwareSystem();
  }
}

export class Container extends Element {
  constructor(config: ContainerConfig) {
    super(
      {
        ...config,
        elementType: ElementType.CONTAINER,
      },
      true,
    );
    this.styles = Styles.createContainer();
  }
}

export class Component extends Element {
  constructor(config: ComponentConfig) {
    super(
      {
        ...config,
        elementType: ElementType.COMPONENT,
      },
      true,
    );
    this.styles = Styles.createComponent();
  }
}
