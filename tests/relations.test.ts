import { describe, expect, it } from "bun:test";
import {
    Person,
    SoftwareSystem,
    ExternalSoftwareSystem,
    Container,
    Component,
} from "../src/element";
import { Context } from "../src/context";

describe("Relations", () => {
    describe("Person relations", () => {
        it("should create a relation from Person to SoftwareSystem", () => {
            const person = new Person({
                name: "Customer",
                description: "A customer of the system",
            });
            const system = new SoftwareSystem({
                name: "Web App",
                description: "Main web application",
            });

            person.use(system, { description: "Uses", technology: "HTTPS" });

            const relations = person.getRelations();
            expect(relations).toHaveLength(1);
            expect(relations[0].getTargetId()).toBe(system.getId());
            expect(relations[0].getDescription()).toBe("Uses");
            expect(relations[0].getTechnology()).toBe("HTTPS");
        });

        it("should create a relation from Person to ExternalSoftwareSystem", () => {
            const person = new Person({
                name: "Customer",
                description: "A customer of the system",
            });
            const externalSystem = new ExternalSoftwareSystem({
                name: "Payment Gateway",
                description: "External payment service",
            });

            person.use(externalSystem, {
                description: "Makes payments via",
                technology: "HTTPS",
            });

            const relations = person.getRelations();
            expect(relations).toHaveLength(1);
            expect(relations[0].getTargetId()).toBe(externalSystem.getId());
            expect(relations[0].getDescription()).toBe("Makes payments via");
            expect(relations[0].getTechnology()).toBe("HTTPS");
        });

        it("should create multiple relations from Person to different systems", () => {
            const person = new Person({
                name: "Admin",
                description: "System administrator",
            });
            const system1 = new SoftwareSystem({
                name: "Admin Panel",
                description: "Administration panel",
            });
            const system2 = new SoftwareSystem({
                name: "Monitoring",
                description: "Monitoring dashboard",
            });

            person.use(system1, {
                description: "Manages via",
                technology: "HTTPS",
            });
            person.use(system2, {
                description: "Monitors via",
                technology: "HTTPS",
            });

            const relations = person.getRelations();
            expect(relations).toHaveLength(2);
            expect(relations[0].getTargetId()).toBe(system1.getId());
            expect(relations[0].getDescription()).toBe("Manages via");
            expect(relations[1].getTargetId()).toBe(system2.getId());
            expect(relations[1].getDescription()).toBe("Monitors via");
        });

        it("should create a relation from Person to Person", () => {
            const person1 = new Person({
                name: "Manager",
                description: "Team manager",
            });
            const person2 = new Person({
                name: "Developer",
                description: "Software developer",
            });

            person1.use(person2, { description: "Manages", technology: "" });

            const relations = person1.getRelations();
            expect(relations).toHaveLength(1);
            expect(relations[0].getTargetId()).toBe(person2.getId());
            expect(relations[0].getDescription()).toBe("Manages");
            expect(relations[0].getTechnology()).toBe("");
        });
    });

    describe("SoftwareSystem relations", () => {
        it("should create a relation from SoftwareSystem to ExternalSoftwareSystem", () => {
            const system = new SoftwareSystem({
                name: "E-commerce Platform",
                description: "Online store",
            });
            const externalSystem = new ExternalSoftwareSystem({
                name: "Stripe",
                description: "Payment processing",
            });

            system.use(externalSystem, {
                description: "Processes payments via",
                technology: "HTTPS/REST",
            });

            const relations = system.getRelations();
            expect(relations).toHaveLength(1);
            expect(relations[0].getTargetId()).toBe(externalSystem.getId());
            expect(relations[0].getDescription()).toBe(
                "Processes payments via",
            );
            expect(relations[0].getTechnology()).toBe("HTTPS/REST");
        });

        it("should create a relation from SoftwareSystem to SoftwareSystem", () => {
            const system1 = new SoftwareSystem({
                name: "Frontend",
                description: "Frontend application",
            });
            const system2 = new SoftwareSystem({
                name: "Backend API",
                description: "Backend services",
            });

            system1.use(system2, {
                description: "Makes API calls to",
                technology: "JSON/HTTPS",
            });

            const relations = system1.getRelations();
            expect(relations).toHaveLength(1);
            expect(relations[0].getTargetId()).toBe(system2.getId());
            expect(relations[0].getDescription()).toBe("Makes API calls to");
            expect(relations[0].getTechnology()).toBe("JSON/HTTPS");
        });

        it("should create multiple relations from SoftwareSystem", () => {
            const mainSystem = new SoftwareSystem({
                name: "Main Application",
                description: "Core system",
            });
            const database = new SoftwareSystem({
                name: "Database",
                description: "Data storage",
            });
            const cache = new SoftwareSystem({
                name: "Cache",
                description: "Caching layer",
            });
            const externalApi = new ExternalSoftwareSystem({
                name: "External API",
                description: "Third-party service",
            });

            mainSystem.use(database, {
                description: "Reads/writes data",
                technology: "SQL",
            });
            mainSystem.use(cache, {
                description: "Caches data in",
                technology: "Redis protocol",
            });
            mainSystem.use(externalApi, {
                description: "Fetches data from",
                technology: "REST/HTTPS",
            });

            const relations = mainSystem.getRelations();
            expect(relations).toHaveLength(3);
            expect(relations[0].getTargetId()).toBe(database.getId());
            expect(relations[0].getDescription()).toBe("Reads/writes data");
            expect(relations[0].getTechnology()).toBe("SQL");
            expect(relations[1].getTargetId()).toBe(cache.getId());
            expect(relations[1].getDescription()).toBe("Caches data in");
            expect(relations[1].getTechnology()).toBe("Redis protocol");
            expect(relations[2].getTargetId()).toBe(externalApi.getId());
            expect(relations[2].getDescription()).toBe("Fetches data from");
            expect(relations[2].getTechnology()).toBe("REST/HTTPS");
        });
    });

    describe("ExternalSoftwareSystem relations", () => {
        it("should create a relation from ExternalSoftwareSystem to SoftwareSystem", () => {
            const externalSystem = new ExternalSoftwareSystem({
                name: "Webhook Provider",
                description: "External webhook service",
            });
            const system = new SoftwareSystem({
                name: "Webhook Handler",
                description: "Handles incoming webhooks",
            });

            externalSystem.use(system, {
                description: "Sends webhooks to",
                technology: "HTTPS/JSON",
            });

            const relations = externalSystem.getRelations();
            expect(relations).toHaveLength(1);
            expect(relations[0].getTargetId()).toBe(system.getId());
            expect(relations[0].getDescription()).toBe("Sends webhooks to");
            expect(relations[0].getTechnology()).toBe("HTTPS/JSON");
        });

        it("should create a relation from ExternalSoftwareSystem to ExternalSoftwareSystem", () => {
            const external1 = new ExternalSoftwareSystem({
                name: "AWS Lambda",
                description: "Serverless compute",
            });
            const external2 = new ExternalSoftwareSystem({
                name: "AWS S3",
                description: "Object storage",
            });

            external1.use(external2, {
                description: "Stores files in",
                technology: "AWS SDK",
            });

            const relations = external1.getRelations();
            expect(relations).toHaveLength(1);
            expect(relations[0].getTargetId()).toBe(external2.getId());
            expect(relations[0].getDescription()).toBe("Stores files in");
            expect(relations[0].getTechnology()).toBe("AWS SDK");
        });
    });

    describe("Container relations", () => {
        it("should create a relation from Container to Container", () => {
            const webApp = new Container({
                name: "Web Application",
                description: "Frontend container",
                technology: "React",
            });
            const apiServer = new Container({
                name: "API Server",
                description: "Backend container",
                technology: "Node.js",
            });

            webApp.use(apiServer, {
                description: "Makes API calls to",
                technology: "REST/JSON",
            });

            const relations = webApp.getRelations();
            expect(relations).toHaveLength(1);
            expect(relations[0].getTargetId()).toBe(apiServer.getId());
            expect(relations[0].getDescription()).toBe("Makes API calls to");
            expect(relations[0].getTechnology()).toBe("REST/JSON");
        });

        it("should create a relation from Container to SoftwareSystem", () => {
            const container = new Container({
                name: "Mobile App",
                description: "Mobile application",
                technology: "React Native",
            });
            const system = new SoftwareSystem({
                name: "Backend Services",
                description: "Backend system",
            });

            container.use(system, {
                description: "Communicates with",
                technology: "GraphQL",
            });

            const relations = container.getRelations();
            expect(relations).toHaveLength(1);
            expect(relations[0].getTargetId()).toBe(system.getId());
            expect(relations[0].getDescription()).toBe("Communicates with");
            expect(relations[0].getTechnology()).toBe("GraphQL");
        });

        it("should create a relation from Container to ExternalSoftwareSystem", () => {
            const container = new Container({
                name: "Payment Service",
                description: "Handles payments",
                technology: "Java",
            });
            const external = new ExternalSoftwareSystem({
                name: "PayPal",
                description: "Payment provider",
            });

            container.use(external, {
                description: "Processes payments via",
                technology: "REST API",
            });

            const relations = container.getRelations();
            expect(relations).toHaveLength(1);
            expect(relations[0].getTargetId()).toBe(external.getId());
            expect(relations[0].getDescription()).toBe(
                "Processes payments via",
            );
            expect(relations[0].getTechnology()).toBe("REST API");
        });
    });

    describe("Component relations", () => {
        it("should create a relation from Component to Component", () => {
            const authComponent = new Component({
                name: "Auth Controller",
                description: "Handles authentication",
                technology: "TypeScript",
            });
            const userService = new Component({
                name: "User Service",
                description: "User management",
                technology: "TypeScript",
            });

            authComponent.use(userService, {
                description: "Validates users via",
                technology: "Internal call",
            });

            const relations = authComponent.getRelations();
            expect(relations).toHaveLength(1);
            expect(relations[0].getTargetId()).toBe(userService.getId());
            expect(relations[0].getDescription()).toBe("Validates users via");
            expect(relations[0].getTechnology()).toBe("Internal call");
        });

        it("should create a relation from Component to Container", () => {
            const component = new Component({
                name: "Data Access Layer",
                description: "Database access",
                technology: "TypeORM",
            });
            const container = new Container({
                name: "PostgreSQL",
                description: "Database container",
                technology: "PostgreSQL 15",
            });

            component.use(container, {
                description: "Reads/writes data",
                technology: "SQL/TCP",
            });

            const relations = component.getRelations();
            expect(relations).toHaveLength(1);
            expect(relations[0].getTargetId()).toBe(container.getId());
            expect(relations[0].getDescription()).toBe("Reads/writes data");
            expect(relations[0].getTechnology()).toBe("SQL/TCP");
        });

        it("should create a relation from Component to ExternalSoftwareSystem", () => {
            const component = new Component({
                name: "Email Service",
                description: "Sends emails",
                technology: "Node.js",
            });
            const external = new ExternalSoftwareSystem({
                name: "SendGrid",
                description: "Email delivery service",
            });

            component.use(external, {
                description: "Sends emails via",
                technology: "SMTP",
            });

            const relations = component.getRelations();
            expect(relations).toHaveLength(1);
            expect(relations[0].getTargetId()).toBe(external.getId());
            expect(relations[0].getDescription()).toBe("Sends emails via");
            expect(relations[0].getTechnology()).toBe("SMTP");
        });
    });

    describe("Relation configuration", () => {
        it("should accept empty technology string", () => {
            const person = new Person({
                name: "User",
                description: "System user",
            });
            const system = new SoftwareSystem({
                name: "App",
                description: "Application",
            });

            person.use(system, { description: "Uses", technology: "" });

            const relations = person.getRelations();
            expect(relations).toHaveLength(1);
            expect(relations[0].getTechnology()).toBe("");
        });

        it("should accept description with special characters", () => {
            const system1 = new SoftwareSystem({
                name: "System A",
                description: "First system",
            });
            const system2 = new SoftwareSystem({
                name: "System B",
                description: "Second system",
            });

            system1.use(system2, {
                description: "Sends data (JSON) via API @v2",
                technology: "REST/HTTPS",
            });

            const relations = system1.getRelations();
            expect(relations).toHaveLength(1);
            expect(relations[0].getDescription()).toBe(
                "Sends data (JSON) via API @v2",
            );
        });

        it("should accept technology with special characters", () => {
            const container1 = new Container({
                name: "Service A",
                description: "Service A",
                technology: "Node.js",
            });
            const container2 = new Container({
                name: "Service B",
                description: "Service B",
                technology: "Python",
            });

            container1.use(container2, {
                description: "Communicates",
                technology: "gRPC/HTTP/2 (protobuf)",
            });

            const relations = container1.getRelations();
            expect(relations).toHaveLength(1);
            expect(relations[0].getTechnology()).toBe("gRPC/HTTP/2 (protobuf)");
        });

        it("should accept long description", () => {
            const person = new Person({
                name: "Developer",
                description: "Software developer",
            });
            const system = new SoftwareSystem({
                name: "IDE",
                description: "Development environment",
            });

            const longDescription =
                "Writes code, debugs applications, and deploys to production using CI/CD pipelines";

            person.use(system, {
                description: longDescription,
                technology: "Various",
            });

            const relations = person.getRelations();
            expect(relations).toHaveLength(1);
            expect(relations[0].getDescription()).toBe(longDescription);
        });

        it("should accept long technology string", () => {
            const system1 = new SoftwareSystem({
                name: "Gateway",
                description: "API Gateway",
            });
            const system2 = new SoftwareSystem({
                name: "Backend",
                description: "Backend services",
            });

            const longTechnology =
                "HTTPS/TLS 1.3 with mutual authentication and OAuth 2.0 bearer tokens";

            system1.use(system2, {
                description: "Routes requests to",
                technology: longTechnology,
            });

            const relations = system1.getRelations();
            expect(relations).toHaveLength(1);
            expect(relations[0].getTechnology()).toBe(longTechnology);
        });
    });

    describe("Relations through Context", () => {
        it("should create relations between elements added to Context", () => {
            const context = new Context();
            context.setTitle("Test System");
            context.setDescription("A test system");

            const customer = context.addPerson({
                name: "Customer",
                description: "End user",
            });
            const webApp = context.addSoftwareSystem({
                name: "Web Application",
                description: "Main web app",
            });
            const paymentService = context.addExternalSoftwareSystem({
                name: "Payment Service",
                description: "External payment",
            });

            customer.use(webApp, { description: "Uses", technology: "HTTPS" });
            webApp.use(paymentService, {
                description: "Processes payments via",
                technology: "REST API",
            });

            const customerRelations = customer.getRelations();
            expect(customerRelations).toHaveLength(1);
            expect(customerRelations[0].getTargetId()).toBe(webApp.getId());
            expect(customerRelations[0].getDescription()).toBe("Uses");
            expect(customerRelations[0].getTechnology()).toBe("HTTPS");

            const webAppRelations = webApp.getRelations();
            expect(webAppRelations).toHaveLength(1);
            expect(webAppRelations[0].getTargetId()).toBe(
                paymentService.getId(),
            );
            expect(webAppRelations[0].getDescription()).toBe(
                "Processes payments via",
            );
            expect(webAppRelations[0].getTechnology()).toBe("REST API");
        });

        it("should create complex relation chain through Context", () => {
            const context = new Context();
            context.setTitle("E-commerce System");
            context.setDescription("Online store system");

            const customer = context.addPerson({
                name: "Customer",
                description: "Online shopper",
            });
            const admin = context.addPerson({
                name: "Admin",
                description: "Store administrator",
            });
            const storefront = context.addSoftwareSystem({
                name: "Storefront",
                description: "Customer-facing store",
            });
            const adminPanel = context.addSoftwareSystem({
                name: "Admin Panel",
                description: "Administration interface",
            });
            const inventory = context.addSoftwareSystem({
                name: "Inventory System",
                description: "Stock management",
            });
            const stripe = context.addExternalSoftwareSystem({
                name: "Stripe",
                description: "Payment processing",
            });
            const shipping = context.addExternalSoftwareSystem({
                name: "Shipping Provider",
                description: "Delivery service",
            });

            // Customer relations
            customer.use(storefront, {
                description: "Browses and purchases via",
                technology: "HTTPS",
            });

            // Admin relations
            admin.use(adminPanel, {
                description: "Manages store via",
                technology: "HTTPS",
            });

            // Storefront relations
            storefront.use(inventory, {
                description: "Checks stock in",
                technology: "REST/JSON",
            });
            storefront.use(stripe, {
                description: "Processes payments via",
                technology: "Stripe API",
            });
            storefront.use(shipping, {
                description: "Creates shipments via",
                technology: "REST API",
            });

            // Admin panel relations
            adminPanel.use(inventory, {
                description: "Updates stock in",
                technology: "REST/JSON",
            });

            // Inventory relations
            inventory.use(shipping, {
                description: "Notifies about stock via",
                technology: "Webhooks",
            });

            // Verify customer relations
            const customerRelations = customer.getRelations();
            expect(customerRelations).toHaveLength(1);
            expect(customerRelations[0].getTargetId()).toBe(storefront.getId());

            // Verify admin relations
            const adminRelations = admin.getRelations();
            expect(adminRelations).toHaveLength(1);
            expect(adminRelations[0].getTargetId()).toBe(adminPanel.getId());

            // Verify storefront relations
            const storefrontRelations = storefront.getRelations();
            expect(storefrontRelations).toHaveLength(3);
            expect(storefrontRelations[0].getTargetId()).toBe(
                inventory.getId(),
            );
            expect(storefrontRelations[1].getTargetId()).toBe(stripe.getId());
            expect(storefrontRelations[2].getTargetId()).toBe(shipping.getId());

            // Verify admin panel relations
            const adminPanelRelations = adminPanel.getRelations();
            expect(adminPanelRelations).toHaveLength(1);
            expect(adminPanelRelations[0].getTargetId()).toBe(
                inventory.getId(),
            );

            // Verify inventory relations
            const inventoryRelations = inventory.getRelations();
            expect(inventoryRelations).toHaveLength(1);
            expect(inventoryRelations[0].getTargetId()).toBe(shipping.getId());
        });

        it("should allow bidirectional relations between systems", () => {
            const context = new Context();
            context.setTitle("Microservices");
            context.setDescription("Microservices architecture");

            const serviceA = context.addSoftwareSystem({
                name: "Service A",
                description: "First microservice",
            });
            const serviceB = context.addSoftwareSystem({
                name: "Service B",
                description: "Second microservice",
            });

            serviceA.use(serviceB, {
                description: "Sends events to",
                technology: "Kafka",
            });
            serviceB.use(serviceA, {
                description: "Responds to",
                technology: "Kafka",
            });

            const serviceARelations = serviceA.getRelations();
            expect(serviceARelations).toHaveLength(1);
            expect(serviceARelations[0].getTargetId()).toBe(serviceB.getId());
            expect(serviceARelations[0].getDescription()).toBe(
                "Sends events to",
            );

            const serviceBRelations = serviceB.getRelations();
            expect(serviceBRelations).toHaveLength(1);
            expect(serviceBRelations[0].getTargetId()).toBe(serviceA.getId());
            expect(serviceBRelations[0].getDescription()).toBe("Responds to");
        });

        it("should allow self-referential relations", () => {
            const context = new Context();
            context.setTitle("Recursive System");
            context.setDescription("System with self-reference");

            const processor = context.addSoftwareSystem({
                name: "Task Processor",
                description: "Processes tasks recursively",
            });

            processor.use(processor, {
                description: "Spawns child tasks in",
                technology: "Internal queue",
            });

            const relations = processor.getRelations();
            expect(relations).toHaveLength(1);
            expect(relations[0].getTargetId()).toBe(processor.getId());
            expect(relations[0].getDescription()).toBe("Spawns child tasks in");
            expect(relations[0].getTechnology()).toBe("Internal queue");
        });
    });

    describe("Fake Store API example relations", () => {
        it("should replicate the Fake Store API example relations", () => {
            const context = new Context();
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

            // Test the exact relations from the example
            fakeStore.use(stripe, { description: "Use", technology: "https" });
            customer.use(fakeStore, { description: "Use", technology: "" });

            // Verify fakeStore -> stripe relation
            const fakeStoreRelations = fakeStore.getRelations();
            expect(fakeStoreRelations).toHaveLength(1);
            expect(fakeStoreRelations[0].getTargetId()).toBe(stripe.getId());
            expect(fakeStoreRelations[0].getDescription()).toBe("Use");
            expect(fakeStoreRelations[0].getTechnology()).toBe("https");

            // Verify customer -> fakeStore relation
            const customerRelations = customer.getRelations();
            expect(customerRelations).toHaveLength(1);
            expect(customerRelations[0].getTargetId()).toBe(fakeStore.getId());
            expect(customerRelations[0].getDescription()).toBe("Use");
            expect(customerRelations[0].getTechnology()).toBe("");
        });
    });

    describe("Multiple relations to same target", () => {
        it("should allow multiple relations from same source to same target", () => {
            const system1 = new SoftwareSystem({
                name: "Client App",
                description: "Client application",
            });
            const system2 = new SoftwareSystem({
                name: "Server",
                description: "Server application",
            });

            system1.use(system2, {
                description: "Fetches data from",
                technology: "REST/HTTPS",
            });
            system1.use(system2, {
                description: "Sends analytics to",
                technology: "WebSocket",
            });
            system1.use(system2, {
                description: "Uploads files to",
                technology: "HTTP Multipart",
            });

            const relations = system1.getRelations();
            expect(relations).toHaveLength(3);

            // All relations should point to the same target
            expect(relations[0].getTargetId()).toBe(system2.getId());
            expect(relations[1].getTargetId()).toBe(system2.getId());
            expect(relations[2].getTargetId()).toBe(system2.getId());

            // But with different descriptions and technologies
            expect(relations[0].getDescription()).toBe("Fetches data from");
            expect(relations[0].getTechnology()).toBe("REST/HTTPS");
            expect(relations[1].getDescription()).toBe("Sends analytics to");
            expect(relations[1].getTechnology()).toBe("WebSocket");
            expect(relations[2].getDescription()).toBe("Uploads files to");
            expect(relations[2].getTechnology()).toBe("HTTP Multipart");
        });
    });

    describe("Relation isolation between elements", () => {
        it("should not share relations between different elements", () => {
            const person1 = new Person({
                name: "User 1",
                description: "First user",
            });
            const person2 = new Person({
                name: "User 2",
                description: "Second user",
            });
            const system = new SoftwareSystem({
                name: "Shared System",
                description: "System used by both",
            });

            person1.use(system, {
                description: "Uses daily",
                technology: "HTTPS",
            });
            person2.use(system, {
                description: "Uses weekly",
                technology: "HTTPS",
            });

            const person1Relations = person1.getRelations();
            const person2Relations = person2.getRelations();

            expect(person1Relations).toHaveLength(1);
            expect(person2Relations).toHaveLength(1);

            expect(person1Relations[0].getDescription()).toBe("Uses daily");
            expect(person2Relations[0].getDescription()).toBe("Uses weekly");

            // Both should target the same system
            expect(person1Relations[0].getTargetId()).toBe(system.getId());
            expect(person2Relations[0].getTargetId()).toBe(system.getId());
        });

        it("should have empty relations array for new elements", () => {
            const person = new Person({
                name: "New User",
                description: "A new user",
            });
            const system = new SoftwareSystem({
                name: "New System",
                description: "A new system",
            });
            const external = new ExternalSoftwareSystem({
                name: "New External",
                description: "A new external system",
            });

            expect(person.getRelations()).toHaveLength(0);
            expect(system.getRelations()).toHaveLength(0);
            expect(external.getRelations()).toHaveLength(0);
        });
    });

    describe("Element ID uniqueness", () => {
        it("should generate unique IDs for each element", () => {
            const elements = [];
            for (let i = 0; i < 10; i++) {
                elements.push(
                    new SoftwareSystem({
                        name: `System ${i}`,
                        description: `System number ${i}`,
                    }),
                );
            }

            const ids = elements.map((el) => el.getId());
            const uniqueIds = new Set(ids);

            expect(uniqueIds.size).toBe(elements.length);
        });

        it("should have valid UUID format for element IDs", () => {
            const person = new Person({
                name: "Test User",
                description: "Test description",
            });

            const uuidRegex =
                /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
            expect(person.getId()).toMatch(uuidRegex);
        });
    });
});
