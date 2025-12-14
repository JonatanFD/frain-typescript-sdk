import { describe, expect, it } from "bun:test";
import { Frain } from "../src/frain";
import type { FrainConfig } from "../src/types";

describe("Frain", () => {
  const validConfig: FrainConfig = {
    apiKey: "550e8400-e29b-41d4-a716-446655440000", // Valid UUID v4
    apiSecret: "550e8400-e29b-41d4-a716-446655440001", // Valid UUID v4
    workspaceId: "550e8400-e29b-41d4-a716-446655440002", // Valid UUID v4
  };

  it("should instantiate Frain with valid config", () => {
    expect(() => new Frain(validConfig)).not.toThrow();
    const frain = new Frain(validConfig);
    expect(frain).toBeInstanceOf(Frain);
  });

  it("should throw error for invalid apiKey", () => {
    const invalidConfig: FrainConfig = {
      ...validConfig,
      apiKey: "invalid-key",
    };
    expect(() => new Frain(invalidConfig)).toThrow(
      "Invalid Frain Configuration, check your credentials. Message:",
    );
  });

  it("should throw error for invalid apiSecret", () => {
    const invalidConfig: FrainConfig = {
      ...validConfig,
      apiSecret: "invalid-secret",
    };
    expect(() => new Frain(invalidConfig)).toThrow(
      "Invalid Frain Configuration, check your credentials. Message:",
    );
  });

  it("should throw error for invalid workspaceId", () => {
    const invalidConfig: FrainConfig = {
      ...validConfig,
      workspaceId: "invalid-workspace",
    };
    expect(() => new Frain(invalidConfig)).toThrow(
      "Invalid Frain Configuration, check your credentials. Message:",
    );
  });

  it("should initialize context on instantiation", () => {
    const frain = new Frain(validConfig);
    // Since context is private, we verify instantiation doesn't fail and instance is created
    expect(frain).toBeDefined();
  });
});
