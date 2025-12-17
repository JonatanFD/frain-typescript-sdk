import { describe, expect, it } from "bun:test";
import { frainConfigValidator, elementValidator } from "../src/validations";

describe("Validations", () => {
  describe("frainConfigValidator", () => {
    const validConfig = {
      apiKey: "550e8400-e29b-41d4-a716-446655440000",
      apiSecret: "550e8400-e29b-41d4-a716-446655440001",
      workspaceId: "550e8400-e29b-41d4-a716-446655440002",
    };

    describe("Valid configs", () => {
      it("should validate correct UUID v4 apiKey", () => {
        const result = frainConfigValidator.safeParse(validConfig);
        expect(result.success).toBe(true);
      });

      it("should validate correct UUID v4 apiSecret", () => {
        const result = frainConfigValidator.safeParse(validConfig);
        expect(result.success).toBe(true);
      });

      it("should validate correct UUID v4 workspaceId", () => {
        const result = frainConfigValidator.safeParse(validConfig);
        expect(result.success).toBe(true);
      });

      it("should validate multiple valid configs", () => {
        const config1 = frainConfigValidator.safeParse(validConfig);
        const config2 = frainConfigValidator.safeParse({
          apiKey: "550e8400-e29b-41d4-a716-446655440003",
          apiSecret: "550e8400-e29b-41d4-a716-446655440004",
          workspaceId: "550e8400-e29b-41d4-a716-446655440005",
        });
        expect(config1.success).toBe(true);
        expect(config2.success).toBe(true);
      });
    });

    describe("Invalid apiKey", () => {
      it("should reject non-UUID apiKey", () => {
        const result = frainConfigValidator.safeParse({
          ...validConfig,
          apiKey: "not-a-uuid",
        });
        expect(result.success).toBe(false);
      });

      it("should reject empty apiKey", () => {
        const result = frainConfigValidator.safeParse({
          ...validConfig,
          apiKey: "",
        });
        expect(result.success).toBe(false);
      });

      it("should reject numeric apiKey", () => {
        const result = frainConfigValidator.safeParse({
          ...validConfig,
          apiKey: "12345678901234567890123456789012",
        });
        expect(result.success).toBe(false);
      });

      it("should reject non-v4 format apiKey", () => {
        const result = frainConfigValidator.safeParse({
          ...validConfig,
          apiKey: "550e8400-e29b-31d4-a716-446655440000",
        });
        expect(result.success).toBe(false);
      });

      it("should reject apiKey with invalid format", () => {
        const result = frainConfigValidator.safeParse({
          ...validConfig,
          apiKey: "550e8400-e29b-41d4-a716",
        });
        expect(result.success).toBe(false);
      });
    });

    describe("Invalid apiSecret", () => {
      it("should reject non-UUID apiSecret", () => {
        const result = frainConfigValidator.safeParse({
          ...validConfig,
          apiSecret: "not-a-uuid",
        });
        expect(result.success).toBe(false);
      });

      it("should reject empty apiSecret", () => {
        const result = frainConfigValidator.safeParse({
          ...validConfig,
          apiSecret: "",
        });
        expect(result.success).toBe(false);
      });

      it("should reject numeric apiSecret", () => {
        const result = frainConfigValidator.safeParse({
          ...validConfig,
          apiSecret: "12345678901234567890123456789012",
        });
        expect(result.success).toBe(false);
      });

      it("should reject non-v4 format apiSecret", () => {
        const result = frainConfigValidator.safeParse({
          ...validConfig,
          apiSecret: "550e8400-e29b-31d4-a716-446655440000",
        });
        expect(result.success).toBe(false);
      });
    });

    describe("Invalid workspaceId", () => {
      it("should reject non-UUID workspaceId", () => {
        const result = frainConfigValidator.safeParse({
          ...validConfig,
          workspaceId: "invalid-workspace",
        });
        expect(result.success).toBe(false);
      });

      it("should reject empty workspaceId", () => {
        const result = frainConfigValidator.safeParse({
          ...validConfig,
          workspaceId: "",
        });
        expect(result.success).toBe(false);
      });

      it("should reject numeric workspaceId", () => {
        const result = frainConfigValidator.safeParse({
          ...validConfig,
          workspaceId: "12345678901234567890123456789012",
        });
        expect(result.success).toBe(false);
      });

      it("should reject non-v4 format workspaceId", () => {
        const result = frainConfigValidator.safeParse({
          ...validConfig,
          workspaceId: "550e8400-e29b-31d4-a716-446655440000",
        });
        expect(result.success).toBe(false);
      });
    });

    describe("Missing fields", () => {
      it("should reject missing apiKey", () => {
        const result = frainConfigValidator.safeParse({
          apiSecret: validConfig.apiSecret,
          workspaceId: validConfig.workspaceId,
        });
        expect(result.success).toBe(false);
      });

      it("should reject missing apiSecret", () => {
        const result = frainConfigValidator.safeParse({
          apiKey: validConfig.apiKey,
          workspaceId: validConfig.workspaceId,
        });
        expect(result.success).toBe(false);
      });

      it("should reject missing workspaceId", () => {
        const result = frainConfigValidator.safeParse({
          apiKey: validConfig.apiKey,
          apiSecret: validConfig.apiSecret,
        });
        expect(result.success).toBe(false);
      });

      it("should reject empty object", () => {
        const result = frainConfigValidator.safeParse({});
        expect(result.success).toBe(false);
      });
    });

    describe("Type validation", () => {
      it("should reject null apiKey", () => {
        const result = frainConfigValidator.safeParse({
          ...validConfig,
          apiKey: null,
        });
        expect(result.success).toBe(false);
      });

      it("should reject undefined apiKey", () => {
        const result = frainConfigValidator.safeParse({
          ...validConfig,
          apiKey: undefined,
        });
        expect(result.success).toBe(false);
      });

      it("should reject number apiKey", () => {
        const result = frainConfigValidator.safeParse({
          ...validConfig,
          apiKey: 123456,
        });
        expect(result.success).toBe(false);
      });
    });
  });

  describe("elementValidator", () => {
    const validElement = {
      name: "Test Element",
      description: "A test element",
      technology: "TypeScript",
    };

    describe("Valid elements", () => {
      it("should validate element with all fields", () => {
        const result = elementValidator.safeParse(validElement);
        expect(result.success).toBe(true);
      });

      it("should validate element without technology", () => {
        const result = elementValidator.safeParse({
          name: "Test",
          description: "Description",
        });
        expect(result.success).toBe(true);
      });

      it("should validate element with minimum length name", () => {
        const result = elementValidator.safeParse({
          ...validElement,
          name: "A",
        });
        expect(result.success).toBe(true);
      });

      it("should validate element with maximum length name", () => {
        const result = elementValidator.safeParse({
          ...validElement,
          name: "a".repeat(100),
        });
        expect(result.success).toBe(true);
      });

      it("should validate element with minimum length description", () => {
        const result = elementValidator.safeParse({
          ...validElement,
          description: "D",
        });
        expect(result.success).toBe(true);
      });

      it("should validate element with maximum length description", () => {
        const result = elementValidator.safeParse({
          ...validElement,
          description: "d".repeat(100),
        });
        expect(result.success).toBe(true);
      });

      it("should validate element with minimum length technology", () => {
        const result = elementValidator.safeParse({
          ...validElement,
          technology: "T",
        });
        expect(result.success).toBe(true);
      });

      it("should validate element with maximum length technology", () => {
        const result = elementValidator.safeParse({
          ...validElement,
          technology: "t".repeat(100),
        });
        expect(result.success).toBe(true);
      });
    });

    describe("Invalid name", () => {
      it("should reject empty name", () => {
        const result = elementValidator.safeParse({
          ...validElement,
          name: "",
        });
        expect(result.success).toBe(false);
      });

      it("should reject name longer than 100 characters", () => {
        const result = elementValidator.safeParse({
          ...validElement,
          name: "a".repeat(101),
        });
        expect(result.success).toBe(false);
      });

      it("should reject null name", () => {
        const result = elementValidator.safeParse({
          ...validElement,
          name: null,
        });
        expect(result.success).toBe(false);
      });

      it("should reject undefined name", () => {
        const result = elementValidator.safeParse({
          ...validElement,
          name: undefined,
        });
        expect(result.success).toBe(false);
      });

      it("should reject number name", () => {
        const result = elementValidator.safeParse({
          ...validElement,
          name: 123,
        });
        expect(result.success).toBe(false);
      });
    });

    describe("Invalid description", () => {
      it("should reject empty description", () => {
        const result = elementValidator.safeParse({
          ...validElement,
          description: "",
        });
        expect(result.success).toBe(false);
      });

      it("should reject description longer than 100 characters", () => {
        const result = elementValidator.safeParse({
          ...validElement,
          description: "d".repeat(101),
        });
        expect(result.success).toBe(false);
      });

      it("should reject null description", () => {
        const result = elementValidator.safeParse({
          ...validElement,
          description: null,
        });
        expect(result.success).toBe(false);
      });

      it("should reject undefined description", () => {
        const result = elementValidator.safeParse({
          ...validElement,
          description: undefined,
        });
        expect(result.success).toBe(false);
      });

      it("should reject number description", () => {
        const result = elementValidator.safeParse({
          ...validElement,
          description: 123,
        });
        expect(result.success).toBe(false);
      });
    });

    describe("Invalid technology", () => {
      it("should reject empty technology", () => {
        const result = elementValidator.safeParse({
          ...validElement,
          technology: "",
        });
        expect(result.success).toBe(false);
      });

      it("should reject technology longer than 100 characters", () => {
        const result = elementValidator.safeParse({
          ...validElement,
          technology: "t".repeat(101),
        });
        expect(result.success).toBe(false);
      });

      it("should reject null technology", () => {
        const result = elementValidator.safeParse({
          ...validElement,
          technology: null,
        });
        expect(result.success).toBe(false);
      });

      it("should reject number technology", () => {
        const result = elementValidator.safeParse({
          ...validElement,
          technology: 123,
        });
        expect(result.success).toBe(false);
      });
    });

    describe("Missing fields", () => {
      it("should reject missing name", () => {
        const result = elementValidator.safeParse({
          description: validElement.description,
          technology: validElement.technology,
        });
        expect(result.success).toBe(false);
      });

      it("should reject missing description", () => {
        const result = elementValidator.safeParse({
          name: validElement.name,
          technology: validElement.technology,
        });
        expect(result.success).toBe(false);
      });

      it("should allow missing technology (optional)", () => {
        const result = elementValidator.safeParse({
          name: validElement.name,
          description: validElement.description,
        });
        expect(result.success).toBe(true);
      });

      it("should reject empty object", () => {
        const result = elementValidator.safeParse({});
        expect(result.success).toBe(false);
      });
    });

    describe("Special characters", () => {
      it("should validate name with special characters", () => {
        const result = elementValidator.safeParse({
          ...validElement,
          name: "Test @#$%^&*()",
        });
        expect(result.success).toBe(true);
      });

      it("should validate description with special characters", () => {
        const result = elementValidator.safeParse({
          ...validElement,
          description: "Desc @#$%^&*()",
        });
        expect(result.success).toBe(true);
      });

      it("should validate technology with special characters", () => {
        const result = elementValidator.safeParse({
          ...validElement,
          technology: "Tech @#$%^&*()",
        });
        expect(result.success).toBe(true);
      });

      it("should validate name with numbers", () => {
        const result = elementValidator.safeParse({
          ...validElement,
          name: "Test 123",
        });
        expect(result.success).toBe(true);
      });

      it("should validate description with numbers", () => {
        const result = elementValidator.safeParse({
          ...validElement,
          description: "Desc 123",
        });
        expect(result.success).toBe(true);
      });

      it("should validate technology with numbers", () => {
        const result = elementValidator.safeParse({
          ...validElement,
          technology: "Tech 2.0",
        });
        expect(result.success).toBe(true);
      });

      it("should validate name with spaces", () => {
        const result = elementValidator.safeParse({
          ...validElement,
          name: "Test Element Name",
        });
        expect(result.success).toBe(true);
      });
    });

    describe("Boundary cases", () => {
      it("should validate name with exactly 100 characters", () => {
        const result = elementValidator.safeParse({
          ...validElement,
          name: "a".repeat(100),
        });
        expect(result.success).toBe(true);
      });

      it("should reject name with exactly 101 characters", () => {
        const result = elementValidator.safeParse({
          ...validElement,
          name: "a".repeat(101),
        });
        expect(result.success).toBe(false);
      });

      it("should validate description with exactly 100 characters", () => {
        const result = elementValidator.safeParse({
          ...validElement,
          description: "b".repeat(100),
        });
        expect(result.success).toBe(true);
      });

      it("should reject description with exactly 101 characters", () => {
        const result = elementValidator.safeParse({
          ...validElement,
          description: "b".repeat(101),
        });
        expect(result.success).toBe(false);
      });

      it("should validate technology with exactly 100 characters", () => {
        const result = elementValidator.safeParse({
          ...validElement,
          technology: "c".repeat(100),
        });
        expect(result.success).toBe(true);
      });

      it("should reject technology with exactly 101 characters", () => {
        const result = elementValidator.safeParse({
          ...validElement,
          technology: "c".repeat(101),
        });
        expect(result.success).toBe(false);
      });
    });
  });

  describe("elementWithTechnologyValidator", () => {
    const { elementWithTechnologyValidator } = require("../src/validations");

    const validElement = {
      name: "Container Element",
      description: "A container with required technology",
      technology: "Docker",
    };

    describe("Valid elements with required technology", () => {
      it("should validate element with all required fields", () => {
        const result = elementWithTechnologyValidator.safeParse(validElement);
        expect(result.success).toBe(true);
      });

      it("should validate element with minimum length name", () => {
        const result = elementWithTechnologyValidator.safeParse({
          name: "C",
          description: "Container",
          technology: "Tech",
        });
        expect(result.success).toBe(true);
      });

      it("should validate element with maximum length name", () => {
        const result = elementWithTechnologyValidator.safeParse({
          ...validElement,
          name: "a".repeat(100),
        });
        expect(result.success).toBe(true);
      });

      it("should validate element with maximum length description", () => {
        const result = elementWithTechnologyValidator.safeParse({
          ...validElement,
          description: "d".repeat(100),
        });
        expect(result.success).toBe(true);
      });

      it("should validate element with maximum length technology", () => {
        const result = elementWithTechnologyValidator.safeParse({
          ...validElement,
          technology: "t".repeat(100),
        });
        expect(result.success).toBe(true);
      });
    });

    describe("Invalid name with required technology", () => {
      it("should reject empty name", () => {
        const result = elementWithTechnologyValidator.safeParse({
          ...validElement,
          name: "",
        });
        expect(result.success).toBe(false);
      });

      it("should reject name longer than 100 characters", () => {
        const result = elementWithTechnologyValidator.safeParse({
          ...validElement,
          name: "a".repeat(101),
        });
        expect(result.success).toBe(false);
      });
    });

    describe("Invalid description with required technology", () => {
      it("should reject empty description", () => {
        const result = elementWithTechnologyValidator.safeParse({
          ...validElement,
          description: "",
        });
        expect(result.success).toBe(false);
      });

      it("should reject description longer than 100 characters", () => {
        const result = elementWithTechnologyValidator.safeParse({
          ...validElement,
          description: "d".repeat(101),
        });
        expect(result.success).toBe(false);
      });
    });

    describe("Invalid technology (now required)", () => {
      it("should reject empty technology", () => {
        const result = elementWithTechnologyValidator.safeParse({
          ...validElement,
          technology: "",
        });
        expect(result.success).toBe(false);
      });

      it("should reject technology longer than 100 characters", () => {
        const result = elementWithTechnologyValidator.safeParse({
          ...validElement,
          technology: "t".repeat(101),
        });
        expect(result.success).toBe(false);
      });

      it("should reject missing technology (now required)", () => {
        const result = elementWithTechnologyValidator.safeParse({
          name: validElement.name,
          description: validElement.description,
        });
        expect(result.success).toBe(false);
      });

      it("should reject null technology", () => {
        const result = elementWithTechnologyValidator.safeParse({
          ...validElement,
          technology: null,
        });
        expect(result.success).toBe(false);
      });

      it("should reject undefined technology", () => {
        const result = elementWithTechnologyValidator.safeParse({
          ...validElement,
          technology: undefined,
        });
        expect(result.success).toBe(false);
      });

      it("should reject number technology", () => {
        const result = elementWithTechnologyValidator.safeParse({
          ...validElement,
          technology: 123,
        });
        expect(result.success).toBe(false);
      });
    });

    describe("Missing required fields", () => {
      it("should reject missing name", () => {
        const result = elementWithTechnologyValidator.safeParse({
          description: validElement.description,
          technology: validElement.technology,
        });
        expect(result.success).toBe(false);
      });

      it("should reject missing description", () => {
        const result = elementWithTechnologyValidator.safeParse({
          name: validElement.name,
          technology: validElement.technology,
        });
        expect(result.success).toBe(false);
      });

      it("should reject all missing fields", () => {
        const result = elementWithTechnologyValidator.safeParse({});
        expect(result.success).toBe(false);
      });
    });

    describe("Boundary cases for required technology", () => {
      it("should validate technology with exactly 1 character", () => {
        const result = elementWithTechnologyValidator.safeParse({
          ...validElement,
          technology: "T",
        });
        expect(result.success).toBe(true);
      });

      it("should validate technology with exactly 100 characters", () => {
        const result = elementWithTechnologyValidator.safeParse({
          ...validElement,
          technology: "t".repeat(100),
        });
        expect(result.success).toBe(true);
      });

      it("should reject technology with exactly 101 characters", () => {
        const result = elementWithTechnologyValidator.safeParse({
          ...validElement,
          technology: "t".repeat(101),
        });
        expect(result.success).toBe(false);
      });
    });

    describe("Special characters in required technology field", () => {
      it("should validate technology with special characters", () => {
        const result = elementWithTechnologyValidator.safeParse({
          ...validElement,
          technology: "Docker @2.0 (latest)",
        });
        expect(result.success).toBe(true);
      });

      it("should validate technology with numbers", () => {
        const result = elementWithTechnologyValidator.safeParse({
          ...validElement,
          technology: "Node.js 18.0.0",
        });
        expect(result.success).toBe(true);
      });

      it("should validate technology with spaces", () => {
        const result = elementWithTechnologyValidator.safeParse({
          ...validElement,
          technology: "React Native Framework",
        });
        expect(result.success).toBe(true);
      });
    });
  });
});
