import { describe, expect, it } from "bun:test";
import { Frain } from "../src/frain";
import type { FrainConfig } from "../src/types";

describe("Frain", () => {
  const validConfig: FrainConfig = {
    apiKey: "550e8400-e29b-41d4-a716-446655440000", // Valid UUID v4
    apiSecret: "550e8400-e29b-41d4-a716-446655440001", // Valid UUID v4
    workspaceId: "550e8400-e29b-41d4-a716-446655440002", // Valid UUID v4
  };

  describe("Constructor with valid config", () => {
    it("should instantiate Frain with valid config", () => {
      expect(() => new Frain(validConfig)).not.toThrow();
      const frain = new Frain(validConfig);
      expect(frain).toBeInstanceOf(Frain);
    });

    it("should initialize context on instantiation", () => {
      const frain = new Frain(validConfig);
      expect(frain).toBeDefined();
    });

    it("should accept different valid UUID v4 values", () => {
      const altConfig: FrainConfig = {
        apiKey: "550e8400-e29b-41d4-a716-446655440003",
        apiSecret: "550e8400-e29b-41d4-a716-446655440004",
        workspaceId: "550e8400-e29b-41d4-a716-446655440005",
      };
      expect(() => new Frain(altConfig)).not.toThrow();
      const frain = new Frain(altConfig);
      expect(frain).toBeInstanceOf(Frain);
    });
  });

  describe("Constructor with invalid apiKey", () => {
    it("should throw error for non-UUID apiKey", () => {
      const invalidConfig: FrainConfig = {
        ...validConfig,
        apiKey: "invalid-key",
      };
      expect(() => new Frain(invalidConfig)).toThrow(
        "Invalid Frain Configuration, check your credentials. Message:",
      );
    });

    it("should throw error for empty apiKey", () => {
      const invalidConfig: FrainConfig = {
        ...validConfig,
        apiKey: "",
      };
      expect(() => new Frain(invalidConfig)).toThrow();
    });

    it("should throw error for null-like apiKey", () => {
      const invalidConfig = {
        ...validConfig,
        apiKey: null as any,
      };
      expect(() => new Frain(invalidConfig)).toThrow();
    });

    it("should throw error for UUID v3 apiKey", () => {
      const invalidConfig: FrainConfig = {
        ...validConfig,
        apiKey: "6ba7b8c0-9dad-11d1-80b4-00c04fd430c8",
      };
      expect(() => new Frain(invalidConfig)).toThrow();
    });

    it("should throw error for numeric string apiKey", () => {
      const invalidConfig: FrainConfig = {
        ...validConfig,
        apiKey: "12345678901234567890123456789012",
      };
      expect(() => new Frain(invalidConfig)).toThrow();
    });
  });

  describe("Constructor with invalid apiSecret", () => {
    it("should throw error for non-UUID apiSecret", () => {
      const invalidConfig: FrainConfig = {
        ...validConfig,
        apiSecret: "invalid-secret",
      };
      expect(() => new Frain(invalidConfig)).toThrow(
        "Invalid Frain Configuration, check your credentials. Message:",
      );
    });

    it("should throw error for empty apiSecret", () => {
      const invalidConfig: FrainConfig = {
        ...validConfig,
        apiSecret: "",
      };
      expect(() => new Frain(invalidConfig)).toThrow();
    });

    it("should throw error for null-like apiSecret", () => {
      const invalidConfig = {
        ...validConfig,
        apiSecret: null as any,
      };
      expect(() => new Frain(invalidConfig)).toThrow();
    });

    it("should throw error for UUID v3 apiSecret", () => {
      const invalidConfig: FrainConfig = {
        ...validConfig,
        apiSecret: "6ba7b8c0-9dad-11d1-80b4-00c04fd430c8",
      };
      expect(() => new Frain(invalidConfig)).toThrow();
    });
  });

  describe("Constructor with invalid workspaceId", () => {
    it("should throw error for non-UUID workspaceId", () => {
      const invalidConfig: FrainConfig = {
        ...validConfig,
        workspaceId: "invalid-workspace",
      };
      expect(() => new Frain(invalidConfig)).toThrow(
        "Invalid Frain Configuration, check your credentials. Message:",
      );
    });

    it("should throw error for empty workspaceId", () => {
      const invalidConfig: FrainConfig = {
        ...validConfig,
        workspaceId: "",
      };
      expect(() => new Frain(invalidConfig)).toThrow();
    });

    it("should throw error for null-like workspaceId", () => {
      const invalidConfig = {
        ...validConfig,
        workspaceId: null as any,
      };
      expect(() => new Frain(invalidConfig)).toThrow();
    });

    it("should throw error for UUID v3 workspaceId", () => {
      const invalidConfig: FrainConfig = {
        ...validConfig,
        workspaceId: "6ba7b8c0-9dad-11d1-80b4-00c04fd430c8",
      };
      expect(() => new Frain(invalidConfig)).toThrow();
    });
  });

  describe("Constructor with multiple invalid fields", () => {
    it("should throw error when apiKey and apiSecret are invalid", () => {
      const invalidConfig: FrainConfig = {
        ...validConfig,
        apiKey: "invalid",
        apiSecret: "invalid",
      };
      expect(() => new Frain(invalidConfig)).toThrow();
    });

    it("should throw error when all fields are invalid", () => {
      const invalidConfig: FrainConfig = {
        apiKey: "invalid",
        apiSecret: "invalid",
        workspaceId: "invalid",
      };
      expect(() => new Frain(invalidConfig)).toThrow();
    });
  });

  describe("Constructor edge cases", () => {
    it("should throw error for undefined config", () => {
      expect(() => new Frain(undefined as any)).toThrow();
    });

    it("should throw error for null config", () => {
      expect(() => new Frain(null as any)).toThrow();
    });

    it("should throw error for empty object config", () => {
      expect(() => new Frain({} as any)).toThrow();
    });

    it("should throw error when apiKey is missing", () => {
      const incompleteConfig = {
        apiSecret: validConfig.apiSecret,
        workspaceId: validConfig.workspaceId,
      };
      expect(() => new Frain(incompleteConfig as any)).toThrow();
    });

    it("should throw error when apiSecret is missing", () => {
      const incompleteConfig = {
        apiKey: validConfig.apiKey,
        workspaceId: validConfig.workspaceId,
      };
      expect(() => new Frain(incompleteConfig as any)).toThrow();
    });

    it("should throw error when workspaceId is missing", () => {
      const incompleteConfig = {
        apiKey: validConfig.apiKey,
        apiSecret: validConfig.apiSecret,
      };
      expect(() => new Frain(incompleteConfig as any)).toThrow();
    });
  });

  describe("Multiple instantiations", () => {
    it("should create multiple independent Frain instances", () => {
      const frain1 = new Frain(validConfig);
      const frain2 = new Frain(validConfig);
      expect(frain1).toBeInstanceOf(Frain);
      expect(frain2).toBeInstanceOf(Frain);
      expect(frain1).not.toBe(frain2);
    });

    it("should create multiple Frain instances with different configs", () => {
      const config1: FrainConfig = {
        apiKey: "550e8400-e29b-41d4-a716-446655440000",
        apiSecret: "550e8400-e29b-41d4-a716-446655440001",
        workspaceId: "550e8400-e29b-41d4-a716-446655440002",
      };
      const config2: FrainConfig = {
        apiKey: "550e8400-e29b-41d4-a716-446655440003",
        apiSecret: "550e8400-e29b-41d4-a716-446655440004",
        workspaceId: "550e8400-e29b-41d4-a716-446655440005",
      };
      const frain1 = new Frain(config1);
      const frain2 = new Frain(config2);
      expect(frain1).toBeInstanceOf(Frain);
      expect(frain2).toBeInstanceOf(Frain);
    });
  });

  describe("Error message validation", () => {
    it("should include error message in throw for invalid config", () => {
      const invalidConfig: FrainConfig = {
        ...validConfig,
        apiKey: "not-a-uuid",
      };
      expect(() => new Frain(invalidConfig)).toThrow(
        /Invalid Frain Configuration/,
      );
    });

    it("should include credentials hint in error message", () => {
      const invalidConfig: FrainConfig = {
        ...validConfig,
        apiKey: "not-a-uuid",
      };
      expect(() => new Frain(invalidConfig)).toThrow(/check your credentials/);
    });
  });
});
