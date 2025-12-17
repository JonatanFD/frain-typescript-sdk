import { describe, expect, it } from "bun:test";
import {
  Person,
  SoftwareSystem,
  ExternalSoftwareSystem,
  Container,
  Component,
} from "../src/element";

describe("Elements", () => {
  describe("Person", () => {
    it("should create a Person", () => {
      const person = new Person({
        name: "John Doe",
        description: "A user",
      });
      expect(person).toBeInstanceOf(Person);
    });

    it("should create Person with minimum valid name", () => {
      const person = new Person({
        name: "A",
        description: "User",
      });
      expect(person).toBeInstanceOf(Person);
    });

    it("should create Person with maximum valid name length", () => {
      const person = new Person({
        name: "a".repeat(100),
        description: "User",
      });
      expect(person).toBeInstanceOf(Person);
    });

    it("should throw error for empty name", () => {
      expect(() => {
        new Person({
          name: "",
          description: "User",
        });
      }).toThrow();
    });

    it("should throw error for name longer than 100 characters", () => {
      expect(() => {
        new Person({
          name: "a".repeat(101),
          description: "User",
        });
      }).toThrow();
    });

    it("should throw error for empty description", () => {
      expect(() => {
        new Person({
          name: "John",
          description: "",
        });
      }).toThrow();
    });

    it("should throw error for description longer than 100 characters", () => {
      expect(() => {
        new Person({
          name: "John",
          description: "a".repeat(101),
        });
      }).toThrow();
    });
  });

  describe("SoftwareSystem", () => {
    it("should create a SoftwareSystem", () => {
      const system = new SoftwareSystem({
        name: "My System",
        description: "A software system",
      });
      expect(system).toBeInstanceOf(SoftwareSystem);
    });

    it("should create SoftwareSystem with minimum valid name", () => {
      const system = new SoftwareSystem({
        name: "S",
        description: "System",
      });
      expect(system).toBeInstanceOf(SoftwareSystem);
    });

    it("should create SoftwareSystem with maximum valid name length", () => {
      const system = new SoftwareSystem({
        name: "a".repeat(100),
        description: "System",
      });
      expect(system).toBeInstanceOf(SoftwareSystem);
    });

    it("should throw error for empty name", () => {
      expect(() => {
        new SoftwareSystem({
          name: "",
          description: "System",
        });
      }).toThrow();
    });

    it("should throw error for name longer than 100 characters", () => {
      expect(() => {
        new SoftwareSystem({
          name: "a".repeat(101),
          description: "System",
        });
      }).toThrow();
    });

    it("should throw error for empty description", () => {
      expect(() => {
        new SoftwareSystem({
          name: "System",
          description: "",
        });
      }).toThrow();
    });

    it("should throw error for description longer than 100 characters", () => {
      expect(() => {
        new SoftwareSystem({
          name: "System",
          description: "a".repeat(101),
        });
      }).toThrow();
    });
  });

  describe("ExternalSoftwareSystem", () => {
    it("should create an ExternalSoftwareSystem", () => {
      const externalSystem = new ExternalSoftwareSystem({
        name: "External API",
        description: "An external service",
      });
      expect(externalSystem).toBeInstanceOf(ExternalSoftwareSystem);
    });

    it("should create ExternalSoftwareSystem with minimum valid name", () => {
      const externalSystem = new ExternalSoftwareSystem({
        name: "E",
        description: "External",
      });
      expect(externalSystem).toBeInstanceOf(ExternalSoftwareSystem);
    });

    it("should throw error for empty name", () => {
      expect(() => {
        new ExternalSoftwareSystem({
          name: "",
          description: "External",
        });
      }).toThrow();
    });

    it("should throw error for name longer than 100 characters", () => {
      expect(() => {
        new ExternalSoftwareSystem({
          name: "a".repeat(101),
          description: "External",
        });
      }).toThrow();
    });
  });

  describe("Container", () => {
    it("should create a Container", () => {
      const container = new Container({
        name: "Web App",
        description: "A web application",
        technology: "React",
      });
      expect(container).toBeInstanceOf(Container);
    });

    it("should throw error for missing technology", () => {
      expect(() => {
        new Container({
          name: "Web App",
          description: "A web application",
        } as any);
      }).toThrow();
    });

    it("should create Container with minimum valid technology", () => {
      const container = new Container({
        name: "Web App",
        description: "Application",
        technology: "A",
      });
      expect(container).toBeInstanceOf(Container);
    });

    it("should create Container with maximum valid technology length", () => {
      const container = new Container({
        name: "Web App",
        description: "Application",
        technology: "a".repeat(100),
      });
      expect(container).toBeInstanceOf(Container);
    });

    it("should throw error for empty name", () => {
      expect(() => {
        new Container({
          name: "",
          description: "Application",
          technology: "React",
        });
      }).toThrow();
    });

    it("should throw error for technology longer than 100 characters", () => {
      expect(() => {
        new Container({
          name: "Web App",
          description: "Application",
          technology: "a".repeat(101),
        });
      }).toThrow();
    });

    it("should throw error for empty technology", () => {
      expect(() => {
        new Container({
          name: "Web App",
          description: "Application",
          technology: "",
        });
      }).toThrow();
    });
  });

  describe("Component", () => {
    it("should create a Component", () => {
      const component = new Component({
        name: "Auth Service",
        description: "Handles authentication",
        technology: "Node.js",
      });
      expect(component).toBeInstanceOf(Component);
    });

    it("should throw error for missing technology", () => {
      expect(() => {
        new Component({
          name: "Auth Service",
          description: "Handles authentication",
        } as any);
      }).toThrow();
    });

    it("should create Component with minimum valid technology", () => {
      const component = new Component({
        name: "Service",
        description: "Service",
        technology: "T",
      });
      expect(component).toBeInstanceOf(Component);
    });

    it("should create Component with maximum valid technology length", () => {
      const component = new Component({
        name: "Service",
        description: "Service",
        technology: "a".repeat(100),
      });
      expect(component).toBeInstanceOf(Component);
    });

    it("should throw error for empty name", () => {
      expect(() => {
        new Component({
          name: "",
          description: "Service",
          technology: "Node.js",
        });
      }).toThrow();
    });

    it("should throw error for technology longer than 100 characters", () => {
      expect(() => {
        new Component({
          name: "Service",
          description: "Service",
          technology: "a".repeat(101),
        });
      }).toThrow();
    });

    it("should throw error for empty technology", () => {
      expect(() => {
        new Component({
          name: "Service",
          description: "Service",
          technology: "",
        });
      }).toThrow();
    });
  });
});
