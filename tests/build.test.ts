import { describe, expect, it } from "bun:test";
import { Frain } from "../src/frain";
import {
    ElementShape,
    ElementType,
    type EdgeJSON,
    type FrainPayload,
} from "../src/types";

const validConfig = {
    apiKey: "550e8400-e29b-41d4-a716-446655440000",
    apiSecret: "550e8400-e29b-41d4-a716-446655440001",
    workspaceId: "550e8400-e29b-41d4-a716-446655440002",
};

function createFrain(): Frain {
    return new Frain(validConfig);
}

function getNode(payload: FrainPayload, id: string) {
    return payload.nodes[id];
}

function findEdge(edges: EdgeJSON[], source: string, target: string) {
    return edges.find(
        (edge) => edge.source === source && edge.target === target,
    );
}

describe("Frain.build graph payload", () => {
    describe("Empty context", () => {
        it("should build payload with empty graph", () => {
            const frain = createFrain();
            const payload = frain.build();

            expect(payload.workspaceId).toBe(validConfig.workspaceId);
            expect(payload.views.systemContext.title).toBe("");
            expect(payload.views.systemContext.description).toBe("");
            expect(payload.views.containerViews).toEqual([]);
            expect(payload.nodes).toEqual({});
            expect(payload.edges).toEqual([]);
        });
    });

    describe("Context metadata", () => {
        it("should include title and description", () => {
            const frain = createFrain();
            const context = frain.getContext();
            context.setTitle("Test System");
            context.setDescription("A test system description");

            const payload = frain.build();

            expect(payload.views.systemContext.title).toBe("Test System");
            expect(payload.views.systemContext.description).toBe(
                "A test system description",
            );
        });
    });

    describe("Node serialization", () => {
        it("should create a node for a Person element with styles", () => {
            const frain = createFrain();
            const context = frain.getContext();
            context.setTitle("Test");
            context.setDescription("Test");

            const person = context.addPerson({
                name: "Customer",
                description: "A customer of the system",
            });

            const payload = frain.build();
            const personNode = getNode(payload, person.getId());

            expect(personNode).toBeDefined();
            expect(personNode.name).toBe("Customer");
            expect(personNode.description).toBe("A customer of the system");
            expect(personNode.technology).toBe("Person");
            expect(personNode.elementType).toBe(ElementType.PERSON);
            expect(personNode.styles.shape).toBe(ElementShape.PERSON);
            expect(personNode.styles.color).toBe("#ffffff");
            expect(personNode.styles.backgroundColor).toBe("#003668");
            expect(
                Object.prototype.hasOwnProperty.call(personNode, "relations"),
            ).toBeFalsy();
        });

        it("should create nodes for different element types", () => {
            const frain = createFrain();
            const context = frain.getContext();
            context.setTitle("Test");
            context.setDescription("Test");

            const system = context.addSoftwareSystem({
                name: "Web Application",
                description: "Main web application",
            });

            const external = context.addExternalSoftwareSystem({
                name: "Stripe",
                description: "Payment processing service",
            });

            const payload = frain.build();
            const systemNode = getNode(payload, system.getId());
            const externalNode = getNode(payload, external.getId());

            expect(systemNode).toMatchObject({
                id: system.getId(),
                name: "Web Application",
                description: "Main web application",
                technology: "Software System",
                elementType: ElementType.SOFTWARE_SYSTEM,
            });

            expect(systemNode.styles).toMatchObject({
                shape: ElementShape.RECTANGLE,

                color: "#ffffff",

                backgroundColor: "#0055a4",
            });

            expect(externalNode).toMatchObject({
                id: external.getId(),
                name: "Stripe",
                description: "Payment processing service",
                technology: "External Software System",
                elementType: ElementType.EXTERNAL_SOFTWARE_SYSTEM,
            });
            expect(externalNode.styles).toMatchObject({
                shape: ElementShape.RECTANGLE,
                color: "#ffffff",
                backgroundColor: "#81788a",
            });
        });
    });

    describe("Edge serialization", () => {
        it("should create an edge for a single relation", () => {
            const frain = createFrain();
            const context = frain.getContext();

            const customer = context.addPerson({
                name: "Customer",
                description: "End user",
            });
            const webApp = context.addSoftwareSystem({
                name: "Web App",
                description: "Main application",
            });

            customer.use(webApp, { description: "Uses", technology: "HTTPS" });

            const payload = frain.build();
            const edges = payload.edges;

            expect(edges).toHaveLength(1);
            expect(edges[0]).toEqual({
                source: customer.getId(),
                target: webApp.getId(),
                description: "Uses",
                technology: "HTTPS",
            });
        });

        it("should create multiple edges preserving relation order", () => {
            const frain = createFrain();
            const context = frain.getContext();

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
            const edges = payload.edges;

            expect(edges).toHaveLength(2);
            expect(edges[0]).toEqual({
                source: system.getId(),
                target: database.getId(),
                description: "Reads/writes data",
                technology: "SQL",
            });
            expect(edges[1]).toEqual({
                source: system.getId(),
                target: cache.getId(),
                description: "Caches data",
                technology: "Redis",
            });
        });

        it("should allow bidirectional relations between systems", () => {
            const frain = createFrain();
            const context = frain.getContext();

            const serviceA = context.addSoftwareSystem({
                name: "Service A",
                description: "First microservice",
            });
            const serviceB = context.addSoftwareSystem({
                name: "Service B",
                description: "Second microservice",
            });

            serviceA.use(serviceB, {
                description: "Publishes events to",
                technology: "Kafka",
            });
            serviceB.use(serviceA, {
                description: "Consumes events from",
                technology: "Kafka",
            });

            const payload = frain.build();
            const edges = payload.edges;

            const edgeAB = findEdge(edges, serviceA.getId(), serviceB.getId());
            const edgeBA = findEdge(edges, serviceB.getId(), serviceA.getId());

            expect(edges).toHaveLength(2);
            expect(edgeAB).toMatchObject({
                description: "Publishes events to",
                technology: "Kafka",
            });
            expect(edgeBA).toMatchObject({
                description: "Consumes events from",
                technology: "Kafka",
            });
        });

        it("should include self-referential relations", () => {
            const frain = createFrain();
            const context = frain.getContext();

            const processor = context.addSoftwareSystem({
                name: "Task Processor",
                description: "Processes tasks recursively",
            });

            processor.use(processor, {
                description: "Spawns child tasks",
                technology: "Internal queue",
            });

            const payload = frain.build();
            const edges = payload.edges;

            expect(edges).toHaveLength(1);
            expect(edges[0]).toEqual({
                source: processor.getId(),
                target: processor.getId(),
                description: "Spawns child tasks",
                technology: "Internal queue",
            });
        });
    });

    describe("Fake Store API example", () => {
        it("should build the graph expected for the example", () => {
            const frain = createFrain();
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

            expect(payload.workspaceId).toBe(validConfig.workspaceId);
            expect(payload.views.systemContext.title).toBe("Fake Store API");
            expect(payload.views.systemContext.description).toBe(
                "A fake store API for testing purposes",
            );
            expect(Object.keys(payload.nodes)).toHaveLength(3);
            expect(payload.edges).toHaveLength(2);

            const customerNode = getNode(payload, customer.getId());
            const fakeStoreNode = getNode(payload, fakeStore.getId());
            const stripeNode = getNode(payload, stripe.getId());

            expect(customerNode.elementType).toBe(ElementType.PERSON);
            expect(fakeStoreNode.elementType).toBe(ElementType.SOFTWARE_SYSTEM);
            expect(stripeNode.elementType).toBe(
                ElementType.EXTERNAL_SOFTWARE_SYSTEM,
            );

            const customerEdge = findEdge(
                payload.edges,
                customer.getId(),
                fakeStore.getId(),
            );
            const fakeStoreEdge = findEdge(
                payload.edges,
                fakeStore.getId(),
                stripe.getId(),
            );

            expect(customerEdge).toEqual({
                source: customer.getId(),
                target: fakeStore.getId(),
                description: "Use",
                technology: "",
            });
            expect(fakeStoreEdge).toEqual({
                source: fakeStore.getId(),
                target: stripe.getId(),
                description: "Use",
                technology: "https",
            });
        });
    });

    describe("Build immutability and snapshots", () => {
        it("should return new payload instances on each build call", () => {
            const frain = createFrain();

            const payload1 = frain.build();
            const payload2 = frain.build();

            expect(payload1).not.toBe(payload2);
            expect(payload1.views).not.toBe(payload2.views);
            expect(payload1.views.systemContext).not.toBe(
                payload2.views.systemContext,
            );
            expect(payload1.nodes).not.toBe(payload2.nodes);
            expect(payload1.edges).not.toBe(payload2.edges);
        });

        it("should reflect context mutations in subsequent builds", () => {
            const frain = createFrain();
            const context = frain.getContext();

            context.setTitle("Initial");
            const payload1 = frain.build();
            expect(payload1.views.systemContext.title).toBe("Initial");

            context.setTitle("Updated");
            const payload2 = frain.build();
            expect(payload2.views.systemContext.title).toBe("Updated");
            expect(payload1.views.systemContext.title).toBe("Initial");
        });

        it("should provide a snapshot independent from external mutations", () => {
            const frain = createFrain();
            const context = frain.getContext();

            const person = context.addPerson({
                name: "Customer",
                description: "Uses the system",
            });

            const payload1 = frain.build();
            const node = getNode(payload1, person.getId());
            node.name = "Mutated";

            const payload2 = frain.build();
            const freshNode = getNode(payload2, person.getId());

            expect(freshNode.name).toBe("Customer");
        });
    });

    describe("JSON serialization", () => {
        it("should produce valid JSON", () => {
            const frain = createFrain();
            const context = frain.getContext();

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
            expect(Object.keys(parsed.nodes)).toHaveLength(2);
            expect(parsed.edges).toHaveLength(1);
        });
    });
});
