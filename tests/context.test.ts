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
});
