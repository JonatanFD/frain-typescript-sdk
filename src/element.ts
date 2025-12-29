import { Relation } from "./relation";
import { Styles } from "./styles";
import {
    ElementType,
    type ElementConfig,
    type PersonConfig,
    type SoftwareSystemConfig,
    type ExternalSoftwareSystemConfig,
    type ContainedElementConfig,
    type ContainerConfig,
    type ComponentConfig,
    type RelationConfig,
    type ElementJSON,
} from "./types";
import {
    elementValidator,
    elementWithTechnologyValidator,
} from "./validations";

export type ContainerCreationConfig = Omit<ContainerConfig, "parentId">;

export abstract class Element {
    private id: string;

    private name: string;
    private description: string;
    private technology: string;
    private elementType: ElementType;

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
            throw new Error(
                `Invalid element configuration: ${validation.error}`,
            );
        }

        this.name = config.name;
        this.description = config.description;
        this.technology = config.technology || "";
        this.elementType = config.elementType;
        this.id = crypto.randomUUID();

        this.styles = new Styles();
    }

    public use(element: Element, config: RelationConfig) {
        this.relations.push(new Relation(element.id, config));
    }

    public getId(): string {
        return this.id;
    }

    public getRelations(): Relation[] {
        return this.relations;
    }

    public toJSON(): ElementJSON {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            technology: this.technology,
            elementType: this.elementType,
            styles: this.styles.toJSON(),
            relations: this.relations.map((relation) => relation.toJSON()),
        };
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
    private containers: Container[] = [];

    constructor(config: SoftwareSystemConfig) {
        super({
            ...config,
            elementType: ElementType.SOFTWARE_SYSTEM,
            technology: "Software System",
        });
        this.styles = Styles.createSoftwareSystem();
    }

    /**
     * Creates a new Container as a child of this SoftwareSystem.
     * Note: The container must be registered in the global element list
     * by the orchestrator (Frain) to appear in the final output.
     */
    public addContainer(config: ContainerCreationConfig): Container {
        const container = new Container({
            ...config,
            parentId: this.getId(),
        });
        this.containers.push(container);
        return container;
    }

    public getContainers(): Container[] {
        return this.containers;
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

export abstract class ContainedElement extends Element {
    private parentId: string;

    protected constructor(
        config: ContainedElementConfig,
        requireTechnology: boolean = false,
    ) {
        super(config, requireTechnology);
        this.parentId = config.parentId;
    }

    public getParentId(): string {
        return this.parentId;
    }

    public override toJSON(): ElementJSON {
        return {
            ...super.toJSON(),
            parentId: this.parentId,
        };
    }
}

export class Container extends ContainedElement {
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

export class Component extends ContainedElement {
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
