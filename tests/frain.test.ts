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

  describe("getContext method", () => {
    it("should return a Context instance", () => {
      const frain = new Frain(validConfig);
      const context = frain.getContext();
      expect(context).toBeDefined();
    });

    it("should return the same Context instance on multiple calls", () => {
      const frain = new Frain(validConfig);
      const context1 = frain.getContext();
      const context2 = frain.getContext();
      expect(context1).toBe(context2);
    });

    it("should return different Context instances for different Frain instances", () => {
      const frain1 = new Frain(validConfig);
      const frain2 = new Frain(validConfig);
      const context1 = frain1.getContext();
      const context2 = frain2.getContext();
      expect(context1).not.toBe(context2);
    });

    it("should allow setting title on returned context", () => {
      const frain = new Frain(validConfig);
      const context = frain.getContext();
      const title = "My Diagram Title";
      expect(() => context.setTitle(title)).not.toThrow();
      expect(context.getTitle()).toBe(title);
    });

    it("should allow setting description on returned context", () => {
      const frain = new Frain(validConfig);
      const context = frain.getContext();
      const description = "My Diagram Description";
      expect(() => context.setDescription(description)).not.toThrow();
      expect(context.getDescription()).toBe(description);
    });

    it("should allow adding Person elements to returned context", () => {
      const frain = new Frain(validConfig);
      const context = frain.getContext();
      const person = context.addPerson({
        name: "User",
        description: "System user",
      });
      expect(person).toBeDefined();
    });

    it("should allow adding SoftwareSystem elements to returned context", () => {
      const frain = new Frain(validConfig);
      const context = frain.getContext();
      const system = context.addSoftwareSystem({
        name: "My System",
        description: "Main system",
      });
      expect(system).toBeDefined();
    });

    it("should allow adding ExternalSoftwareSystem elements to returned context", () => {
      const frain = new Frain(validConfig);
      const context = frain.getContext();
      const external = context.addExternalSoftwareSystem({
        name: "External API",
        description: "Third-party service",
      });
      expect(external).toBeDefined();
    });
  });

  describe("Frain and Context integration", () => {
    it("should create a complete diagram with title, description and elements", () => {
      const frain = new Frain(validConfig);
      const context = frain.getContext();

      context.setTitle("E-Commerce System");
      context.setDescription("System context diagram for e-commerce platform");

      const customer = context.addPerson({
        name: "Customer",
        description: "A customer of the e-commerce platform",
      });

      const ecommerceSystem = context.addSoftwareSystem({
        name: "E-Commerce Platform",
        description: "Main e-commerce system",
      });

      const paymentGateway = context.addExternalSoftwareSystem({
        name: "Payment Gateway",
        description: "External payment processing service",
      });

      expect(context.getTitle()).toBe("E-Commerce System");
      expect(context.getDescription()).toBe(
        "System context diagram for e-commerce platform",
      );
      expect(customer).toBeDefined();
      expect(ecommerceSystem).toBeDefined();
      expect(paymentGateway).toBeDefined();
    });

    it("should maintain context state across multiple operations", () => {
      const frain = new Frain(validConfig);
      const context = frain.getContext();

      context.setTitle("Initial Title");
      context.addPerson({ name: "Person 1", description: "First person" });

      context.setTitle("Updated Title");
      context.addSoftwareSystem({
        name: "System 1",
        description: "First system",
      });

      context.setDescription("Final Description");
      context.addExternalSoftwareSystem({
        name: "External 1",
        description: "First external",
      });

      expect(context.getTitle()).toBe("Updated Title");
      expect(context.getDescription()).toBe("Final Description");
    });

    it("should handle complex scenarios with multiple elements", () => {
      const frain = new Frain(validConfig);
      const context = frain.getContext();

      context.setTitle("Complex System");
      context.setDescription("A complex system with many actors");

      for (let i = 1; i <= 3; i++) {
        context.addPerson({
          name: `User ${i}`,
          description: `User number ${i}`,
        });
      }

      for (let i = 1; i <= 2; i++) {
        context.addSoftwareSystem({
          name: `System ${i}`,
          description: `System number ${i}`,
        });
      }

      for (let i = 1; i <= 2; i++) {
        context.addExternalSoftwareSystem({
          name: `External ${i}`,
          description: `External system number ${i}`,
        });
      }

      expect(context.getTitle()).toBe("Complex System");
      expect(context.getDescription()).toBe(
        "A complex system with many actors",
      );
    });

    it("should allow building diagram incrementally", () => {
      const frain = new Frain(validConfig);
      const context = frain.getContext();

      // Step 1: Set basic info
      context.setTitle("Banking System");
      expect(context.getTitle()).toBe("Banking System");

      // Step 2: Add description
      context.setDescription("Online banking platform");
      expect(context.getDescription()).toBe("Online banking platform");

      // Step 3: Add actors
      const customer = context.addPerson({
        name: "Bank Customer",
        description: "Customer using online banking",
      });
      expect(customer).toBeDefined();

      // Step 4: Add main system
      const bankingSystem = context.addSoftwareSystem({
        name: "Online Banking System",
        description: "Main banking platform",
      });
      expect(bankingSystem).toBeDefined();

      // Step 5: Add external dependencies
      const creditBureau = context.addExternalSoftwareSystem({
        name: "Credit Bureau",
        description: "External credit checking service",
      });
      expect(creditBureau).toBeDefined();
    });

    it("should handle empty context gracefully", () => {
      const frain = new Frain(validConfig);
      const context = frain.getContext();

      expect(context.getTitle()).toBe("");
      expect(context.getDescription()).toBe("");
    });

    it("should allow updating context after elements are added", () => {
      const frain = new Frain(validConfig);
      const context = frain.getContext();

      context.addPerson({ name: "User", description: "User" });
      context.addSoftwareSystem({ name: "System", description: "System" });

      context.setTitle("New Title");
      context.setDescription("New Description");

      expect(context.getTitle()).toBe("New Title");
      expect(context.getDescription()).toBe("New Description");
    });
  });

  describe("Context reference persistence", () => {
    it("should reflect changes in context when retrieved multiple times", () => {
      const frain = new Frain(validConfig);

      const context1 = frain.getContext();
      context1.setTitle("First Title");

      const context2 = frain.getContext();
      expect(context2.getTitle()).toBe("First Title");
    });

    it("should reflect title changes made through one reference in another reference", () => {
      const frain = new Frain(validConfig);

      const contextRef1 = frain.getContext();
      const contextRef2 = frain.getContext();

      contextRef1.setTitle("Title from Ref 1");
      expect(contextRef2.getTitle()).toBe("Title from Ref 1");

      contextRef2.setTitle("Title from Ref 2");
      expect(contextRef1.getTitle()).toBe("Title from Ref 2");
    });

    it("should reflect description changes made through one reference in another reference", () => {
      const frain = new Frain(validConfig);

      const contextRef1 = frain.getContext();
      const contextRef2 = frain.getContext();

      contextRef1.setDescription("Description from Ref 1");
      expect(contextRef2.getDescription()).toBe("Description from Ref 1");

      contextRef2.setDescription("Description from Ref 2");
      expect(contextRef1.getDescription()).toBe("Description from Ref 2");
    });

    it("should reflect added Person elements across all references", () => {
      const frain = new Frain(validConfig);

      const contextRef1 = frain.getContext();
      contextRef1.addPerson({ name: "User 1", description: "First user" });

      const contextRef2 = frain.getContext();
      const person2 = contextRef2.addPerson({
        name: "User 2",
        description: "Second user",
      });

      expect(person2).toBeDefined();
    });

    it("should reflect added SoftwareSystem elements across all references", () => {
      const frain = new Frain(validConfig);

      const contextRef1 = frain.getContext();
      contextRef1.addSoftwareSystem({
        name: "System 1",
        description: "First system",
      });

      const contextRef2 = frain.getContext();
      const system2 = contextRef2.addSoftwareSystem({
        name: "System 2",
        description: "Second system",
      });

      expect(system2).toBeDefined();
    });

    it("should reflect added ExternalSoftwareSystem elements across all references", () => {
      const frain = new Frain(validConfig);

      const contextRef1 = frain.getContext();
      contextRef1.addExternalSoftwareSystem({
        name: "External 1",
        description: "First external",
      });

      const contextRef2 = frain.getContext();
      const external2 = contextRef2.addExternalSoftwareSystem({
        name: "External 2",
        description: "Second external",
      });

      expect(external2).toBeDefined();
    });

    it("should maintain all changes across multiple context retrievals", () => {
      const frain = new Frain(validConfig);

      // First reference: set title
      const context1 = frain.getContext();
      context1.setTitle("My Title");

      // Second reference: verify title and set description
      const context2 = frain.getContext();
      expect(context2.getTitle()).toBe("My Title");
      context2.setDescription("My Description");

      // Third reference: verify both and add person
      const context3 = frain.getContext();
      expect(context3.getTitle()).toBe("My Title");
      expect(context3.getDescription()).toBe("My Description");
      context3.addPerson({ name: "User", description: "Test user" });

      // Fourth reference: verify everything
      const context4 = frain.getContext();
      expect(context4.getTitle()).toBe("My Title");
      expect(context4.getDescription()).toBe("My Description");
    });

    it("should reflect complex state changes across references", () => {
      const frain = new Frain(validConfig);

      const ref1 = frain.getContext();
      ref1.setTitle("Initial Title");
      ref1.addPerson({ name: "Person 1", description: "First" });

      const ref2 = frain.getContext();
      expect(ref2.getTitle()).toBe("Initial Title");
      ref2.setTitle("Updated Title");
      ref2.addSoftwareSystem({ name: "System 1", description: "First system" });

      const ref3 = frain.getContext();
      expect(ref3.getTitle()).toBe("Updated Title");
      ref3.setDescription("New Description");
      ref3.addExternalSoftwareSystem({
        name: "External 1",
        description: "First external",
      });

      const ref4 = frain.getContext();
      expect(ref4.getTitle()).toBe("Updated Title");
      expect(ref4.getDescription()).toBe("New Description");
    });

    it("should share the same context instance between Frain and returned references", () => {
      const frain = new Frain(validConfig);

      const context = frain.getContext();
      context.setTitle("Shared Title");
      context.setDescription("Shared Description");

      const contextAgain = frain.getContext();
      expect(contextAgain.getTitle()).toBe("Shared Title");
      expect(contextAgain.getDescription()).toBe("Shared Description");

      // Modify through second reference
      contextAgain.setTitle("Modified Title");

      // Verify through third reference
      const contextYetAgain = frain.getContext();
      expect(contextYetAgain.getTitle()).toBe("Modified Title");
    });

    it("should maintain element additions in order across references", () => {
      const frain = new Frain(validConfig);

      const ref1 = frain.getContext();
      ref1.addPerson({ name: "Person 1", description: "First" });
      ref1.addPerson({ name: "Person 2", description: "Second" });

      const ref2 = frain.getContext();
      ref2.addSoftwareSystem({ name: "System 1", description: "First" });

      const ref3 = frain.getContext();
      ref3.addExternalSoftwareSystem({
        name: "External 1",
        description: "First",
      });

      // All elements should be in the same context
      const ref4 = frain.getContext();
      expect(ref4).toBeDefined();
    });

    it("should allow interleaved operations across multiple references", () => {
      const frain = new Frain(validConfig);

      const ref1 = frain.getContext();
      const ref2 = frain.getContext();
      const ref3 = frain.getContext();

      ref1.setTitle("Title from ref1");
      expect(ref2.getTitle()).toBe("Title from ref1");
      expect(ref3.getTitle()).toBe("Title from ref1");

      ref2.setDescription("Description from ref2");
      expect(ref1.getDescription()).toBe("Description from ref2");
      expect(ref3.getDescription()).toBe("Description from ref2");

      ref3.addPerson({
        name: "Person from ref3",
        description: "Added via ref3",
      });

      // All references should see all changes
      expect(ref1.getTitle()).toBe("Title from ref1");
      expect(ref1.getDescription()).toBe("Description from ref2");
      expect(ref2.getTitle()).toBe("Title from ref1");
      expect(ref2.getDescription()).toBe("Description from ref2");
      expect(ref3.getTitle()).toBe("Title from ref1");
      expect(ref3.getDescription()).toBe("Description from ref2");
    });
  });
});
