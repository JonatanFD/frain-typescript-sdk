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
    expect(() => context.setTitle("")).toThrow("Error setting title to Context Diagram");
  });

  it("should throw error for title longer than 100 characters", () => {
    const context = new Context();
    const longTitle = "a".repeat(101);
    expect(() => context.setTitle(longTitle)).toThrow("Error setting title to Context Diagram");
  });

  it("should set description with valid string", () => {
    const context = new Context();
    expect(() => context.setDescription("Valid Description")).not.toThrow();
  });

  it("should throw error for empty description", () => {
    const context = new Context();
    expect(() => context.setDescription("")).toThrow("Error setting description to Context Diagram");
  });

  it("should throw error for description longer than 100 characters", () => {
    const context = new Context();
    const longDescription = "a".repeat(101);
    expect(() => context.setDescription(longDescription)).toThrow("Error setting description to Context Diagram");
  });
});
