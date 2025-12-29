export interface FrainConfig {
    apiKey: string;
    apiSecret: string;
    workspaceId: string;
}

export interface ElementConfig {
    name: string;
    description: string;
    technology: string;
    elementType: ElementType;
}

export interface RelationConfig {
    description: string;
    technology: string;
}

export interface PersonConfig extends Omit<
    ElementConfig,
    "technology" | "elementType"
> {}

export interface SoftwareSystemConfig extends Omit<
    ElementConfig,
    "technology" | "elementType"
> {}

export interface ExternalSoftwareSystemConfig extends Omit<
    ElementConfig,
    "technology" | "elementType"
> {}

export interface ContainedElementConfig extends ElementConfig {
    parentId: string;
}

export interface ContainerConfig extends Omit<
    ContainedElementConfig,
    "elementType"
> {}

export interface ComponentConfig extends Omit<
    ContainedElementConfig,
    "elementType"
> {}

export enum ElementType {
    PERSON = "person",
    SOFTWARE_SYSTEM = "software_system",
    EXTERNAL_SOFTWARE_SYSTEM = "external_software_system",
    CONTAINER = "container",
    COMPONENT = "component",
}

export enum ElementShape {
    RECTANGLE = "rectangle",
    ROUNDED_BOX = "rounded-box",
    WEB_BROWSER = "web-browser",
    MOBILE_PHONE = "mobile-phone",
    DATABASE = "database",
    PERSON = "person",
}

// JSON Payload interfaces for serialization

export interface RelationJSON {
    targetId: string;
    description: string;
    technology: string;
}

export interface StylesJSON {
    shape: ElementShape;
    color: string;
    backgroundColor: string;
}

export interface GraphNodeJSON {
    id: string;
    name: string;
    description: string;
    technology: string;
    elementType: ElementType;
    styles: StylesJSON;
}

export interface ElementJSON extends GraphNodeJSON {
    relations: RelationJSON[];
    parentId?: string;
}

export interface EdgeJSON {
    source: string;
    target: string;
    description: string;
    technology: string;
}

export type GraphNodesIndex = Record<string, GraphNodeJSON>;

export interface ContextJSON {
    title: string;
    description: string;
}

export interface FrainPayload {
    workspaceId: string;
    nodes: GraphNodesIndex;
    edges: EdgeJSON[];
    context: ContextJSON;
}
