import { describe, expect, it } from "bun:test";
import {
  Person,
  SoftwareSystem,
  ExternalSoftwareSystem,
  Container,
  Component,
} from "../src/element";

describe("Elements", () => {
  it("should create a Person", () => {
    const person = new Person({
      name: "John Doe",
      description: "A user",
    });
    expect(person).toBeInstanceOf(Person);
  });

  it("should create a SoftwareSystem", () => {
    const system = new SoftwareSystem({
      name: "My System",
      description: "A software system",
    });
    expect(system).toBeInstanceOf(SoftwareSystem);
  });

  it("should create an ExternalSoftwareSystem", () => {
    const externalSystem = new ExternalSoftwareSystem({
      name: "External API",
      description: "An external service",
    });
    expect(externalSystem).toBeInstanceOf(ExternalSoftwareSystem);
  });

  it("should create a Container", () => {
    const container = new Container({
      name: "Web App",
      description: "A web application",
      technology: "React",
    });
    expect(container).toBeInstanceOf(Container);
  });

  it("should create a Component", () => {
    const component = new Component({
      name: "Auth Service",
      description: "Handles authentication",
      technology: "Node.js",
    });
    expect(component).toBeInstanceOf(Component);
  });
});
