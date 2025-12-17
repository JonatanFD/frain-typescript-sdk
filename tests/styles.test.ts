import { describe, expect, it } from "bun:test";
import { Styles } from "../src/styles";
import { ElementShape } from "../src/types";

describe("Styles", () => {
  describe("Constructor", () => {
    it("should instantiate with default values", () => {
      const styles = new Styles();
      expect(styles).toBeInstanceOf(Styles);
    });
  });

  describe("createPerson", () => {
    it("should create Person styles with correct shape", () => {
      const styles = Styles.createPerson();
      expect(styles).toBeInstanceOf(Styles);
    });

    it("should create Person styles with PERSON shape", () => {
      const styles = Styles.createPerson();
      // Verify by attempting to set shape to ensure it works
      styles.setShape(ElementShape.PERSON);
      expect(styles).toBeInstanceOf(Styles);
    });

    it("should create Person styles with white color", () => {
      const styles = Styles.createPerson();
      styles.setColor("#ffffff");
      expect(styles).toBeInstanceOf(Styles);
    });

    it("should create Person styles with dark blue background", () => {
      const styles = Styles.createPerson();
      styles.setBackgroundColor("#003668");
      expect(styles).toBeInstanceOf(Styles);
    });
  });

  describe("createSoftwareSystem", () => {
    it("should create SoftwareSystem styles with correct shape", () => {
      const styles = Styles.createSoftwareSystem();
      expect(styles).toBeInstanceOf(Styles);
    });

    it("should create SoftwareSystem styles with RECTANGLE shape", () => {
      const styles = Styles.createSoftwareSystem();
      styles.setShape(ElementShape.RECTANGLE);
      expect(styles).toBeInstanceOf(Styles);
    });

    it("should create SoftwareSystem styles with white color", () => {
      const styles = Styles.createSoftwareSystem();
      styles.setColor("#ffffff");
      expect(styles).toBeInstanceOf(Styles);
    });

    it("should create SoftwareSystem styles with blue background", () => {
      const styles = Styles.createSoftwareSystem();
      styles.setBackgroundColor("#0055A4");
      expect(styles).toBeInstanceOf(Styles);
    });
  });

  describe("createExternalSoftwareSystem", () => {
    it("should create ExternalSoftwareSystem styles", () => {
      const styles = Styles.createExternalSoftwareSystem();
      expect(styles).toBeInstanceOf(Styles);
    });

    it("should create ExternalSoftwareSystem styles with RECTANGLE shape", () => {
      const styles = Styles.createExternalSoftwareSystem();
      styles.setShape(ElementShape.RECTANGLE);
      expect(styles).toBeInstanceOf(Styles);
    });

    it("should create ExternalSoftwareSystem styles with gray background", () => {
      const styles = Styles.createExternalSoftwareSystem();
      styles.setBackgroundColor("#81788A");
      expect(styles).toBeInstanceOf(Styles);
    });
  });

  describe("createContainer", () => {
    it("should create Container styles", () => {
      const styles = Styles.createContainer();
      expect(styles).toBeInstanceOf(Styles);
    });

    it("should create Container styles with ROUNDED_BOX shape", () => {
      const styles = Styles.createContainer();
      styles.setShape(ElementShape.ROUNDED_BOX);
      expect(styles).toBeInstanceOf(Styles);
    });

    it("should create Container styles with cyan background", () => {
      const styles = Styles.createContainer();
      styles.setBackgroundColor("#0097D1");
      expect(styles).toBeInstanceOf(Styles);
    });
  });

  describe("createComponent", () => {
    it("should create Component styles", () => {
      const styles = Styles.createComponent();
      expect(styles).toBeInstanceOf(Styles);
    });

    it("should create Component styles with ROUNDED_BOX shape", () => {
      const styles = Styles.createComponent();
      styles.setShape(ElementShape.ROUNDED_BOX);
      expect(styles).toBeInstanceOf(Styles);
    });

    it("should create Component styles with light blue background", () => {
      const styles = Styles.createComponent();
      styles.setBackgroundColor("#50B5ED");
      expect(styles).toBeInstanceOf(Styles);
    });
  });

  describe("setShape", () => {
    it("should set shape to RECTANGLE", () => {
      const styles = new Styles();
      styles.setShape(ElementShape.RECTANGLE);
      expect(styles).toBeInstanceOf(Styles);
    });

    it("should set shape to ROUNDED_BOX", () => {
      const styles = new Styles();
      styles.setShape(ElementShape.ROUNDED_BOX);
      expect(styles).toBeInstanceOf(Styles);
    });

    it("should set shape to PERSON", () => {
      const styles = new Styles();
      styles.setShape(ElementShape.PERSON);
      expect(styles).toBeInstanceOf(Styles);
    });

    it("should set shape to DATABASE", () => {
      const styles = new Styles();
      styles.setShape(ElementShape.DATABASE);
      expect(styles).toBeInstanceOf(Styles);
    });
  });

  describe("setColor", () => {
    it("should set color to white", () => {
      const styles = new Styles();
      styles.setColor("#ffffff");
      expect(styles).toBeInstanceOf(Styles);
    });

    it("should set color to black", () => {
      const styles = new Styles();
      styles.setColor("#000000");
      expect(styles).toBeInstanceOf(Styles);
    });

    it("should set color to custom hex value", () => {
      const styles = new Styles();
      styles.setColor("#FF5733");
      expect(styles).toBeInstanceOf(Styles);
    });
  });

  describe("setBackgroundColor", () => {
    it("should set background color to white", () => {
      const styles = new Styles();
      styles.setBackgroundColor("#ffffff");
      expect(styles).toBeInstanceOf(Styles);
    });

    it("should set background color to black", () => {
      const styles = new Styles();
      styles.setBackgroundColor("#000000");
      expect(styles).toBeInstanceOf(Styles);
    });

    it("should set background color to custom hex value", () => {
      const styles = new Styles();
      styles.setBackgroundColor("#FF5733");
      expect(styles).toBeInstanceOf(Styles);
    });
  });

  describe("Chaining operations", () => {
    it("should allow chaining multiple setter calls", () => {
      const styles = new Styles();
      styles.setShape(ElementShape.ROUNDED_BOX);
      styles.setColor("#ffffff");
      styles.setBackgroundColor("#0055A4");
      expect(styles).toBeInstanceOf(Styles);
    });
  });

  describe("Constructor with config validation", () => {
    it("should create Styles with valid config", () => {
      const config = {
        shape: ElementShape.RECTANGLE,
        color: "#ff0000",
        backgroundColor: "#00ff00",
      };
      const styles = new Styles(config);
      expect(styles).toBeInstanceOf(Styles);
    });

    it("should create Styles with partial config", () => {
      const config = {
        shape: ElementShape.PERSON,
      };
      const styles = new Styles(config);
      expect(styles).toBeInstanceOf(Styles);
    });

    it("should throw error for invalid shape", () => {
      const config = {
        shape: "invalid-shape" as any,
        color: "#ffffff",
        backgroundColor: "#000000",
      };
      expect(() => new Styles(config)).toThrow("Invalid styles configuration");
    });

    it("should throw error for invalid color format", () => {
      const config = {
        shape: ElementShape.RECTANGLE,
        color: "not-a-hex",
        backgroundColor: "#000000",
      };
      expect(() => new Styles(config)).toThrow("Invalid styles configuration");
    });

    it("should throw error for invalid backgroundColor format", () => {
      const config = {
        shape: ElementShape.RECTANGLE,
        color: "#ffffff",
        backgroundColor: "not-a-hex",
      };
      expect(() => new Styles(config)).toThrow("Invalid styles configuration");
    });

    it("should accept color with lowercase hex", () => {
      const config = {
        color: "#abc123",
        backgroundColor: "#def456",
      };
      const styles = new Styles(config);
      expect(styles).toBeInstanceOf(Styles);
    });

    it("should accept color with uppercase hex", () => {
      const config = {
        color: "#ABC123",
        backgroundColor: "#DEF456",
      };
      const styles = new Styles(config);
      expect(styles).toBeInstanceOf(Styles);
    });

    it("should accept color with mixed case hex", () => {
      const config = {
        color: "#AbC123",
        backgroundColor: "#DeF456",
      };
      const styles = new Styles(config);
      expect(styles).toBeInstanceOf(Styles);
    });

    it("should throw error for color with wrong number of hex digits", () => {
      const config = {
        color: "#fff",
        backgroundColor: "#000000",
      };
      expect(() => new Styles(config)).toThrow("Invalid styles configuration");
    });

    it("should throw error for backgroundColor with wrong number of hex digits", () => {
      const config = {
        color: "#ffffff",
        backgroundColor: "#fff",
      };
      expect(() => new Styles(config)).toThrow("Invalid styles configuration");
    });

    it("should throw error for color without hash", () => {
      const config = {
        color: "ffffff",
        backgroundColor: "#000000",
      };
      expect(() => new Styles(config)).toThrow("Invalid styles configuration");
    });

    it("should throw error for color with invalid hex characters", () => {
      const config = {
        color: "#gggggg",
        backgroundColor: "#000000",
      };
      expect(() => new Styles(config)).toThrow("Invalid styles configuration");
    });
  });

  describe("setColor validation", () => {
    it("should set valid color", () => {
      const styles = new Styles();
      expect(() => styles.setColor("#ff0000")).not.toThrow();
    });

    it("should throw error for invalid color format", () => {
      const styles = new Styles();
      expect(() => styles.setColor("not-a-hex")).toThrow("Invalid color");
    });

    it("should throw error for color without hash", () => {
      const styles = new Styles();
      expect(() => styles.setColor("ffffff")).toThrow("Invalid color");
    });

    it("should throw error for color with wrong hex digits", () => {
      const styles = new Styles();
      expect(() => styles.setColor("#fff")).toThrow("Invalid color");
    });

    it("should throw error for color with too many hex digits", () => {
      const styles = new Styles();
      expect(() => styles.setColor("#fffffff")).toThrow("Invalid color");
    });

    it("should throw error for color with invalid hex characters", () => {
      const styles = new Styles();
      expect(() => styles.setColor("#gggggg")).toThrow("Invalid color");
    });

    it("should accept uppercase hex color", () => {
      const styles = new Styles();
      expect(() => styles.setColor("#FFFFFF")).not.toThrow();
    });

    it("should accept lowercase hex color", () => {
      const styles = new Styles();
      expect(() => styles.setColor("#ffffff")).not.toThrow();
    });

    it("should accept mixed case hex color", () => {
      const styles = new Styles();
      expect(() => styles.setColor("#FfFfFf")).not.toThrow();
    });
  });

  describe("setBackgroundColor validation", () => {
    it("should set valid background color", () => {
      const styles = new Styles();
      expect(() => styles.setBackgroundColor("#ff0000")).not.toThrow();
    });

    it("should throw error for invalid background color format", () => {
      const styles = new Styles();
      expect(() => styles.setBackgroundColor("not-a-hex")).toThrow(
        "Invalid backgroundColor",
      );
    });

    it("should throw error for background color without hash", () => {
      const styles = new Styles();
      expect(() => styles.setBackgroundColor("000000")).toThrow(
        "Invalid backgroundColor",
      );
    });

    it("should throw error for background color with wrong hex digits", () => {
      const styles = new Styles();
      expect(() => styles.setBackgroundColor("#000")).toThrow(
        "Invalid backgroundColor",
      );
    });

    it("should throw error for background color with too many hex digits", () => {
      const styles = new Styles();
      expect(() => styles.setBackgroundColor("#0000000")).toThrow(
        "Invalid backgroundColor",
      );
    });

    it("should throw error for background color with invalid hex characters", () => {
      const styles = new Styles();
      expect(() => styles.setBackgroundColor("#zzzzzz")).toThrow(
        "Invalid backgroundColor",
      );
    });

    it("should accept uppercase hex background color", () => {
      const styles = new Styles();
      expect(() => styles.setBackgroundColor("#000000")).not.toThrow();
    });

    it("should accept lowercase hex background color", () => {
      const styles = new Styles();
      expect(() => styles.setBackgroundColor("#aaaaaa")).not.toThrow();
    });

    it("should accept mixed case hex background color", () => {
      const styles = new Styles();
      expect(() => styles.setBackgroundColor("#AaAaAa")).not.toThrow();
    });
  });

  describe("Boundary cases for hex colors", () => {
    it("should accept hex color with all zeros", () => {
      const styles = new Styles();
      expect(() => styles.setColor("#000000")).not.toThrow();
    });

    it("should accept hex color with all Fs", () => {
      const styles = new Styles();
      expect(() => styles.setColor("#ffffff")).not.toThrow();
    });

    it("should accept hex color with all 9s", () => {
      const styles = new Styles();
      expect(() => styles.setColor("#999999")).not.toThrow();
    });

    it("should accept hex color with mixed digits", () => {
      const styles = new Styles();
      expect(() => styles.setColor("#123456")).not.toThrow();
    });

    it("should accept hex color with all letters", () => {
      const styles = new Styles();
      expect(() => styles.setColor("#abcdef")).not.toThrow();
    });

    it("should accept background color with all zeros", () => {
      const styles = new Styles();
      expect(() => styles.setBackgroundColor("#000000")).not.toThrow();
    });

    it("should accept background color with all Fs", () => {
      const styles = new Styles();
      expect(() => styles.setBackgroundColor("#FFFFFF")).not.toThrow();
    });
  });
});
