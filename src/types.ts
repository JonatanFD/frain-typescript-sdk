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

export interface ContainerConfig extends Omit<ElementConfig, "elementType"> {}

export interface ComponentConfig extends Omit<ElementConfig, "elementType"> {}

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
