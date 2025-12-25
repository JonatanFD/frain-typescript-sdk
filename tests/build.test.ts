import { describe, expect, it } from "bun:test";
import { Frain } from "../src/frain";
import { ElementType, ElementShape } from "../src/types";

describe("Build method", () => {
    const validConfig = {
        apiKey: "550e8400-e29b-41d4-a716-446655440000",
        apiSecret: "550e8400-e29b-41d4-a716-446655440001",
        workspaceId: "550e8400-e29b-41d4-a716-446655440002",
    };

    describe("Empty context", () => {
        it("should build payload with empty context", () => {
            const frain = new Frain(validConfig);
            const payload = frain.build();

            expect(payload).toBeDefined();
            expect(payload.workspaceId).toBe(validConfig.workspaceId);
            expect(payload.context).toBeDefined();
            expect(payload.context.title).toBe("");
            expect(payload.context.description).toBe("");
            expect(payload.context.elements).toEqual([]);
        });
    });

    describe("Context with title and description", () => {
        it("should build payload with title and description", () => {
            const frain = new Frain(validConfig);
            const context = frain.getContext();
            context.setTitle("Test System");
            context.setDescription("A test system description");

            const payload = frain.build();

            expect(payload.context.title).toBe("Test System");
            expect(payload.context.description).toBe(
                "A test system description",
            );
        });
    });

    describe("Context with elements", () => {
        it("should build payload with Person element", () => {
            const frain = new Frain(validConfig);
            const context = frain.getContext();
            context.setTitle("Test");
            context.setDescription("Test");

            const person = context.addPerson({
                name: "Customer",
                description: "A customer of the system",
            });

            const payload = frain.build();

            expect(payload.context.elements).toHaveLength(1);
            expect(payload.context.elements[0].id).toBe(person.getId());
            expect(payload.context.elements[0].name).toBe("Customer");
            expect(payload.context.elements[0].description).toBe(
                "A customer of the system",
            );
            expect(payload.context.elements[0].technology).toBe("Person");
            expect(payload.context.elements[0].elementType).toBe(
                ElementType.PERSON,
            );
        });

        it("should build payload with SoftwareSystem element", () => {
            const frain = new Frain(validConfig);
            const context = frain.getContext();
            context.setTitle("Test");
            context.setDescription("Test");

            const system = context.addSoftwareSystem({
                name: "Web Application",
                description: "Main web application",
            });

            const payload = frain.build();

            expect(payload.context.elements).toHaveLength(1);
            expect(payload.context.elements[0].id).toBe(system.getId());
            expect(payload.context.elements[0].name).toBe("Web Application");
            expect(payload.context.elements[0].description).toBe(
                "Main web application",
            );
            expect(payload.context.elements[0].technology).toBe(
                "Software System",
            );
            expect(payload.context.elements[0].elementType).toBe(
                ElementType.SOFTWARE_SYSTEM,
            );
        });

        it("should build payload with ExternalSoftwareSystem element", () => {
            const frain = new Frain(validConfig);
            const context = frain.getContext();
            context.setTitle("Test");
            context.setDescription("Test");

            const external = context.addExternalSoftwareSystem({
                name: "Stripe",
                description: "Payment processing service",
            });

            const payload = frain.build();

            expect(payload.context.elements).toHaveLength(1);
            expect(payload.context.elements[0].id).toBe(external.getId());
            expect(payload.context.elements[0].name).toBe("Stripe");
            expect(payload.context.elements[0].description).toBe(
                "Payment processing service",
            );
            expect(payload.context.elements[0].technology).toBe(
                "External Software System",
            );
            expect(payload.context.elements[0].elementType).toBe(
                ElementType.EXTERNAL_SOFTWARE_SYSTEM,
            );
        });

        it("should build payload with multiple elements", () => {
            const frain = new Frain(validConfig);
            const context = frain.getContext();
            context.setTitle("E-commerce System");
            context.setDescription("Online store platform");

            context.addPerson({
                name: "Customer",
                description: "Online shopper",
            });
            context.addSoftwareSystem({
                name: "Store",
                description: "E-commerce platform",
            });
            context.addExternalSoftwareSystem({
                name: "PayPal",
                description: "Payment gateway",
            });

            const payload = frain.build();

            expect(payload.context.elements).toHaveLength(3);
            expect(payload.context.elements[0].name).toBe("Customer");
            expect(payload.context.elements[1].name).toBe("Store");
            expect(payload.context.elements[2].name).toBe("PayPal");
        });
    });

    describe("Element styles in payload", () => {
        it("should include Person styles in payload", () => {
            const frain = new Frain(validConfig);
            const context = frain.getContext();
            context.setTitle("Test");
            context.setDescription("Test");
            context.addPerson({
                name: "User",
                description: "System user",
            });

            const payload = frain.build();

            expect(payload.context.elements[0].styles).toBeDefined();
            expect(payload.context.elements[0].styles.shape).toBe(
                ElementShape.PERSON,
            );
            expect(payload.context.elements[0].styles.color).toBe("#ffffff");
            expect(payload.context.elements[0].styles.backgroundColor).toBe(
                "#003668",
            );
        });

        it("should include SoftwareSystem styles in payload", () => {
            const frain = new Frain(validConfig);
            const context = frain.getContext();
            context.setTitle("Test");
            context.setDescription("Test");
            context.addSoftwareSystem({
                name: "App",
                description: "Application",
            });

            const payload = frain.build();

            expect(payload.context.elements[0].styles).toBeDefined();
            expect(payload.context.elements[0].styles.shape).toBe(
                ElementShape.RECTANGLE,
            );
            expect(payload.context.elements[0].styles.color).toBe("#ffffff");
            expect(payload.context.elements[0].styles.backgroundColor).toBe(
                "#0055a4",
            );
        });

        it("should include ExternalSoftwareSystem styles in payload", () => {
            const frain = new Frain(validConfig);
            const context = frain.getContext();
            context.setTitle("Test");
            context.setDescription("Test");
            context.addExternalSoftwareSystem({
                name: "External",
                description: "External service",
            });

            const payload = frain.build();

            expect(payload.context.elements[0].styles).toBeDefined();
            expect(payload.context.elements[0].styles.shape).toBe(
                ElementShape.RECTANGLE,
            );
            expect(payload.context.elements[0].styles.color).toBe("#ffffff");
            expect(payload.context.elements[0].styles.backgroundColor).toBe(
                "#81788a",
            );
        });
    });

    describe("Relations in payload", () => {
        it("should include empty relations array for element without relations", () => {
            const frain = new Frain(validConfig);
            const context = frain.getContext();
            context.setTitle("Test");
            context.setDescription("Test");
            context.addPerson({
                name: "User",
                description: "System user",
            });

            const payload = frain.build();

            expect(payload.context.elements[0].relations).toBeDefined();
            expect(payload.context.elements[0].relations).toEqual([]);
        });

        it("should include relations in payload", () => {
            const frain = new Frain(validConfig);
            const context = frain.getContext();
            context.setTitle("Test");
            context.setDescription("Test");

            const customer = context.addPerson({
                name: "Customer",
                description: "End user",
            });
            const webApp = context.addSoftwareSystem({
                name: "Web App",
                description: "Main application",
            });

            customer.use(webApp, {
                description: "Uses",
                technology: "HTTPS",
            });

            const payload = frain.build();

            expect(payload.context.elements[0].relations).toHaveLength(1);
            expect(payload.context.elements[0].relations[0].targetId).toBe(
                webApp.getId(),
            );
            expect(payload.context.elements[0].relations[0].description).toBe(
                "Uses",
            );
            expect(payload.context.elements[0].relations[0].technology).toBe(
                "HTTPS",
            );
        });

        it("should include multiple relations in payload", () => {
            const frain = new Frain(validConfig);
            const context = frain.getContext();
            context.setTitle("Test");
            context.setDescription("Test");

            const system = context.addSoftwareSystem({
                name: "Main System",
                description: "Core system",
            });
            const database = context.addExternalSoftwareSystem({
                name: "Database",
                description: "Data storage",
            });
            const cache = context.addExternalSoftwareSystem({
                name: "Cache",
                description: "Caching layer",
            });

            system.use(database, {
                description: "Reads/writes data",
                technology: "SQL",
            });
            system.use(cache, {
                description: "Caches data",
                technology: "Redis",
            });

            const payload = frain.build();

            expect(payload.context.elements[0].relations).toHaveLength(2);
            expect(payload.context.elements[0].relations[0].targetId).toBe(
                database.getId(),
            );
            expect(payload.context.elements[0].relations[0].description).toBe(
                "Reads/writes data",
            );
            expect(payload.context.elements[0].relations[1].targetId).toBe(
                cache.getId(),
            );
            expect(payload.context.elements[0].relations[1].description).toBe(
                "Caches data",
            );
        });
    });

    describe("Fake Store API example payload", () => {
        it("should build correct payload for Fake Store API example", () => {
            const frain = new Frain(validConfig);
            const context = frain.getContext();

            context.setTitle("Fake Store API");
            context.setDescription("A fake store API for testing purposes");

            const customer = context.addPerson({
                name: "Customers",
                description: "A customer",
            });

            const fakeStore = context.addSoftwareSystem({
                name: "Fake Store",
                description: "A fake store for testing purposes",
            });

            const stripe = context.addExternalSoftwareSystem({
                name: "Stripe",
                description: "A payment processing service",
            });

            fakeStore.use(stripe, { description: "Use", technology: "https" });
            customer.use(fakeStore, { description: "Use", technology: "" });

            const payload = frain.build();

            // Verify structure
            expect(payload.workspaceId).toBe(validConfig.workspaceId);
            expect(payload.context.title).toBe("Fake Store API");
            expect(payload.context.description).toBe(
                "A fake store API for testing purposes",
            );
            expect(payload.context.elements).toHaveLength(3);

            // Verify customer element
            const customerElement = payload.context.elements[0];
            expect(customerElement.name).toBe("Customers");
            expect(customerElement.elementType).toBe(ElementType.PERSON);
            expect(customerElement.relations).toHaveLength(1);
            expect(customerElement.relations[0].targetId).toBe(
                fakeStore.getId(),
            );
            expect(customerElement.relations[0].description).toBe("Use");
            expect(customerElement.relations[0].technology).toBe("");

            // Verify fakeStore element
            const fakeStoreElement = payload.context.elements[1];
            expect(fakeStoreElement.name).toBe("Fake Store");
            expect(fakeStoreElement.elementType).toBe(
                ElementType.SOFTWARE_SYSTEM,
            );
            expect(fakeStoreElement.relations).toHaveLength(1);
            expect(fakeStoreElement.relations[0].targetId).toBe(stripe.getId());
            expect(fakeStoreElement.relations[0].description).toBe("Use");
            expect(fakeStoreElement.relations[0].technology).toBe("https");

            // Verify stripe element
            const stripeElement = payload.context.elements[2];
            expect(stripeElement.name).toBe("Stripe");
            expect(stripeElement.elementType).toBe(
                ElementType.EXTERNAL_SOFTWARE_SYSTEM,
            );
            expect(stripeElement.relations).toHaveLength(0);
        });
    });

    describe("Payload JSON serialization", () => {
        it("should produce valid JSON", () => {
            const frain = new Frain(validConfig);
            const context = frain.getContext();
            context.setTitle("Test System");
            context.setDescription("Test description");

            const person = context.addPerson({
                name: "User",
                description: "System user",
            });
            const system = context.addSoftwareSystem({
                name: "App",
                description: "Application",
            });
            person.use(system, { description: "Uses", technology: "HTTPS" });

            const payload = frain.build();
            const jsonString = JSON.stringify(payload);

            expect(() => JSON.parse(jsonString)).not.toThrow();

            const parsed = JSON.parse(jsonString);
            expect(parsed.workspaceId).toBe(validConfig.workspaceId);
            expect(parsed.context.title).toBe("Test System");
            expect(parsed.context.elements).toHaveLength(2);
        });

        it("should maintain element order in JSON", () => {
            const frain = new Frain(validConfig);
            const context = frain.getContext();
            context.setTitle("Test");
            context.setDescription("Test");

            context.addPerson({ name: "First", description: "First element" });
            context.addSoftwareSystem({
                name: "Second",
                description: "Second element",
            });
            context.addExternalSoftwareSystem({
                name: "Third",
                description: "Third element",
            });

            const payload = frain.build();
            const parsed = JSON.parse(JSON.stringify(payload));

            expect(parsed.context.elements[0].name).toBe("First");
            expect(parsed.context.elements[1].name).toBe("Second");
            expect(parsed.context.elements[2].name).toBe("Third");
        });
    });

    describe("Build immutability", () => {
        it("should return new payload object on each build call", () => {
            const frain = new Frain(validConfig);
            const context = frain.getContext();
            context.setTitle("Test");
            context.setDescription("Test");

            const payload1 = frain.build();
            const payload2 = frain.build();

            expect(payload1).not.toBe(payload2);
            expect(payload1.context).not.toBe(payload2.context);
        });

        it("should reflect context changes in subsequent builds", () => {
            const frain = new Frain(validConfig);
            const context = frain.getContext();
            context.setTitle("Initial Title");
            context.setDescription("Test");

            const payload1 = frain.build();
            expect(payload1.context.title).toBe("Initial Title");

            context.setTitle("Updated Title");
            const payload2 = frain.build();
            expect(payload2.context.title).toBe("Updated Title");

            // First payload should still have old value (it's a snapshot)
            expect(payload1.context.title).toBe("Initial Title");
        });

        it("should reflect new elements in subsequent builds", () => {
            const frain = new Frain(validConfig);
            const context = frain.getContext();
            context.setTitle("Test");
            context.setDescription("Test");

            const payload1 = frain.build();
            expect(payload1.context.elements).toHaveLength(0);

            context.addPerson({ name: "User", description: "User" });
            const payload2 = frain.build();
            expect(payload2.context.elements).toHaveLength(1);
        });
    });
});
