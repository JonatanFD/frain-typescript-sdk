import { describe, expect, it } from "bun:test";
import { Context } from "../src/context";

describe("Context", () => {
  it("should instantiate Context", () => {
    const context = new Context();
    expect(context).toBeInstanceOf(Context);
  });

  it("should set title with valid string", () => {
    const context = new Context();
    expect(() => context.setTitle("Valid Title")).not.toThrow();
  });

  it("should throw error for empty title", () => {
    const context = new Context();
    expect(() => context.setTitle("")).toThrow(
      "Error setting title to Context Diagram",
    );
  });

  it("should throw error for title longer than 100 characters", () => {
    const context = new Context();
    const longTitle = "a".repeat(101);
    expect(() => context.setTitle(longTitle)).toThrow(
      "Error setting title to Context Diagram",
    );
  });

  it("should set description with valid string", () => {
    const context = new Context();
    expect(() => context.setDescription("Valid Description")).not.toThrow();
  });

  it("should throw error for empty description", () => {
    const context = new Context();
    expect(() => context.setDescription("")).toThrow(
      "Error setting description to Context Diagram",
    );
  });

  it("should throw error for description longer than 100 characters", () => {
    const context = new Context();
    const longDescription = "a".repeat(101);
    expect(() => context.setDescription(longDescription)).toThrow(
      "Error setting description to Context Diagram",
    );
  });

  describe("Boundary cases for title", () => {
    it("should set title with exactly 1 character", () => {
      const context = new Context();
      expect(() => context.setTitle("A")).not.toThrow();
    });

    it("should set title with exactly 100 characters", () => {
      const context = new Context();
      const title = "a".repeat(100);
      expect(() => context.setTitle(title)).not.toThrow();
    });

    it("should throw error for title with exactly 101 characters", () => {
      const context = new Context();
      const title = "a".repeat(101);
      expect(() => context.setTitle(title)).toThrow(
        "Error setting title to Context Diagram",
      );
    });
  });

  describe("Boundary cases for description", () => {
    it("should set description with exactly 1 character", () => {
      const context = new Context();
      expect(() => context.setDescription("D")).not.toThrow();
    });

    it("should set description with exactly 100 characters", () => {
      const context = new Context();
      const description = "b".repeat(100);
      expect(() => context.setDescription(description)).not.toThrow();
    });

    it("should throw error for description with exactly 101 characters", () => {
      const context = new Context();
      const description = "b".repeat(101);
      expect(() => context.setDescription(description)).toThrow(
        "Error setting description to Context Diagram",
      );
    });
  });

  describe("Special characters and whitespace", () => {
    it("should set title with special characters", () => {
      const context = new Context();
      expect(() => context.setTitle("Title @#$%^&*()")).not.toThrow();
    });

    it("should set title with numbers", () => {
      const context = new Context();
      expect(() => context.setTitle("Title 123")).not.toThrow();
    });

    it("should set title with spaces", () => {
      const context = new Context();
      expect(() => context.setTitle("My Context Title")).not.toThrow();
    });

    it("should set description with special characters", () => {
      const context = new Context();
      expect(() =>
        context.setDescription("Description @#$%^&*()"),
      ).not.toThrow();
    });

    it("should set description with numbers", () => {
      const context = new Context();
      expect(() => context.setDescription("Description 123")).not.toThrow();
    });

    it("should set description with spaces", () => {
      const context = new Context();
      expect(() =>
        context.setDescription("My Context Description"),
      ).not.toThrow();
    });
  });

  describe("Multiple setter calls", () => {
    it("should allow setting title multiple times", () => {
      const context = new Context();
      expect(() => context.setTitle("First Title")).not.toThrow();
      expect(() => context.setTitle("Second Title")).not.toThrow();
      expect(() => context.setTitle("Third Title")).not.toThrow();
    });

    it("should allow setting description multiple times", () => {
      const context = new Context();
      expect(() => context.setDescription("First Description")).not.toThrow();
      expect(() => context.setDescription("Second Description")).not.toThrow();
      expect(() => context.setDescription("Third Description")).not.toThrow();
    });

    it("should allow alternating title and description settings", () => {
      const context = new Context();
      expect(() => context.setTitle("Title 1")).not.toThrow();
      expect(() => context.setDescription("Description 1")).not.toThrow();
      expect(() => context.setTitle("Title 2")).not.toThrow();
      expect(() => context.setDescription("Description 2")).not.toThrow();
    });
  });

  describe("Error handling across multiple operations", () => {
    it("should fail on invalid title but succeed on next valid title", () => {
      const context = new Context();
      expect(() => context.setTitle("")).toThrow();
      expect(() => context.setTitle("Valid Title")).not.toThrow();
    });

    it("should fail on invalid description but succeed on next valid description", () => {
      const context = new Context();
      expect(() => context.setDescription("")).toThrow();
      expect(() => context.setDescription("Valid Description")).not.toThrow();
    });
  });

  describe("Getters", () => {
    it("should return empty string for title when not set", () => {
      const context = new Context();
      expect(context.getTitle()).toBe("");
    });

    it("should return empty string for description when not set", () => {
      const context = new Context();
      expect(context.getDescription()).toBe("");
    });

    it("should return the correct title after setting it", () => {
      const context = new Context();
      const title = "My Context Title";
      context.setTitle(title);
      expect(context.getTitle()).toBe(title);
    });

    it("should return the correct description after setting it", () => {
      const context = new Context();
      const description = "My Context Description";
      context.setDescription(description);
      expect(context.getDescription()).toBe(description);
    });

    it("should return the latest title after multiple sets", () => {
      const context = new Context();
      context.setTitle("First Title");
      context.setTitle("Second Title");
      const finalTitle = "Final Title";
      context.setTitle(finalTitle);
      expect(context.getTitle()).toBe(finalTitle);
    });

    it("should return the latest description after multiple sets", () => {
      const context = new Context();
      context.setDescription("First Description");
      context.setDescription("Second Description");
      const finalDescription = "Final Description";
      context.setDescription(finalDescription);
      expect(context.getDescription()).toBe(finalDescription);
    });

    it("should maintain title and description independently", () => {
      const context = new Context();
      const title = "Test Title";
      const description = "Test Description";
      context.setTitle(title);
      context.setDescription(description);
      expect(context.getTitle()).toBe(title);
      expect(context.getDescription()).toBe(description);
    });
  });

  describe("Adding elements", () => {
    it("should add a Person element", () => {
      const context = new Context();
      const person = context.addPerson({
        name: "User",
        description: "End user of the system",
      });
      expect(person).toBeDefined();
    });

    it("should add a SoftwareSystem element", () => {
      const context = new Context();
      const system = context.addSoftwareSystem({
        name: "My System",
        description: "Main software system",
      });
      expect(system).toBeDefined();
    });

    it("should add an ExternalSoftwareSystem element", () => {
      const context = new Context();
      const externalSystem = context.addExternalSoftwareSystem({
        name: "External API",
        description: "Third-party service",
      });
      expect(externalSystem).toBeDefined();
    });

    it("should add multiple Person elements", () => {
      const context = new Context();
      const person1 = context.addPerson({
        name: "User 1",
        description: "First user",
      });
      const person2 = context.addPerson({
        name: "User 2",
        description: "Second user",
      });
      expect(person1).toBeDefined();
      expect(person2).toBeDefined();
    });

    it("should add multiple SoftwareSystem elements", () => {
      const context = new Context();
      const system1 = context.addSoftwareSystem({
        name: "System 1",
        description: "First system",
      });
      const system2 = context.addSoftwareSystem({
        name: "System 2",
        description: "Second system",
      });
      expect(system1).toBeDefined();
      expect(system2).toBeDefined();
    });

    it("should add multiple ExternalSoftwareSystem elements", () => {
      const context = new Context();
      const external1 = context.addExternalSoftwareSystem({
        name: "External 1",
        description: "First external",
      });
      const external2 = context.addExternalSoftwareSystem({
        name: "External 2",
        description: "Second external",
      });
      expect(external1).toBeDefined();
      expect(external2).toBeDefined();
    });

    it("should add mixed element types", () => {
      const context = new Context();
      const person = context.addPerson({
        name: "User",
        description: "System user",
      });
      const system = context.addSoftwareSystem({
        name: "Main System",
        description: "Primary system",
      });
      const external = context.addExternalSoftwareSystem({
        name: "External Service",
        description: "Third-party API",
      });
      expect(person).toBeDefined();
      expect(system).toBeDefined();
      expect(external).toBeDefined();
    });

    it("should add elements with special characters in names", () => {
      const context = new Context();
      const person = context.addPerson({
        name: "User@2024",
        description: "User with special chars",
      });
      expect(person).toBeDefined();
    });

    it("should add elements with long descriptions", () => {
      const context = new Context();
      const system = context.addSoftwareSystem({
        name: "System",
        description:
          "A very detailed description of the software system that contains many words",
      });
      expect(system).toBeDefined();
    });

    it("should maintain context state after adding elements", () => {
      const context = new Context();
      const title = "Context with Elements";
      const description = "A context diagram with multiple elements";

      context.setTitle(title);
      context.setDescription(description);

      context.addPerson({ name: "User", description: "User" });
      context.addSoftwareSystem({ name: "System", description: "System" });

      expect(context.getTitle()).toBe(title);
      expect(context.getDescription()).toBe(description);
    });
  });
});
