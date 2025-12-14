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

export interface PersonConfig extends Omit<
  ElementConfig,
  "technology" | "elementType"
> {}

export enum ElementType {
  PERSON = "person",
  SOFTWARE_SYSTEM = "software_system",
  EXTERNAL_SYSTEM = "external_system",
}

export enum ElementShape {
  RECTANGLE = "rectangle",
  ROUNDED_BOX = "rounded-box",
  WEB_BROWSER = "web-browser",
  MOBILE_PHONE = "mobile-phone",
  DATABASE = "database",
  PERSON = "person",
}
