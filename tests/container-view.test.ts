import { describe, expect, it } from "bun:test";
import { Frain } from "../src/frain";
import { ContainerView } from "../src/container-view";
import { ElementType } from "../src/types";

const validConfig = {
    apiKey: "550e8400-e29b-41d4-a716-446655440000",
    apiSecret: "550e8400-e29b-41d4-a716-446655440001",
    workspaceId: "550e8400-e29b-41d4-a716-446655440002",
};

function createFrain(): Frain {
    return new Frain(validConfig);
}

describe("ContainerView", () => {
    describe("Creation via Frain", () => {
        it("should create a container view for a software system", () => {
            const frain = createFrain();
            const context = frain.getContext();

            const system = context.addSoftwareSystem({
                name: "Banking System",
                description: "Core banking application",
            });

            const view = frain.createContainerView(system, {
                title: "Banking System Containers",
                description: "Shows the internal structure of the banking system",
            });

            expect(view).toBeInstanceOf(ContainerView);
            expect(view.getTitle()).toBe("Banking System Containers");
            expect(view.getDescription()).toBe("Shows the internal structure of the banking system");
            expect(view.getTargetSystemId()).toBe(system.getId());
        });

        it("should store created container views in Frain", () => {
            const frain = createFrain();
            const context = frain.getContext();

            const system = context.addSoftwareSystem({
                name: "E-commerce Platform",
                description: "Online shopping platform",
            });

            expect(frain.getContainerViews()).toHaveLength(0);

            frain.createContainerView(system, {
                title: "E-commerce Containers",
                description: "Platform architecture",
            });

            expect(frain.getContainerViews()).toHaveLength(1);
        });

        it("should allow multiple container views for different systems", () => {
            const frain = createFrain();
            const context = frain.getContext();

            const system1 = context.addSoftwareSystem({
                name: "System A",
                description: "First system",
            });

            const system2 = context.addSoftwareSystem({
                name: "System B",
                description: "Second system",
            });

            frain.createContainerView(system1, {
                title: "System A Containers",
                description: "Architecture of System A",
            });

            frain.createContainerView(system2, {
                title: "System B Containers",
                description: "Architecture of System B",
            });

            const views = frain.getContainerViews();
            expect(views).toHaveLength(2);
            expect(views[0].getTargetSystemId()).toBe(system1.getId());
            expect(views[1].getTargetSystemId()).toBe(system2.getId());
        });

        it("should allow multiple container views for the same system", () => {
            const frain = createFrain();
            const context = frain.getContext();

            const system = context.addSoftwareSystem({
                name: "Complex System",
                description: "A system with multiple view perspectives",
            });

            frain.createContainerView(system, {
                title: "Technical View",
                description: "Shows technical components",
            });

            frain.createContainerView(system, {
                title: "Business View",
                description: "Shows business capabilities",
            });

            const views = frain.getContainerViews();
            expect(views).toHaveLength(2);
            expect(views[0].getTargetSystemId()).toBe(system.getId());
            expect(views[1].getTargetSystemId()).toBe(system.getId());
            expect(views[0].getTitle()).toBe("Technical View");
            expect(views[1].getTitle()).toBe("Business View");
        });
    });

    describe("Container View JSON serialization", () => {
        it("should serialize container view to JSON", () => {
            const frain = createFrain();
            const context = frain.getContext();

            const system = context.addSoftwareSystem({
                name: "API Gateway",
                description: "Central API gateway",
            });

            const view = frain.createContainerView(system, {
                title: "API Gateway Architecture",
                description: "Internal structure of the API gateway",
            });

            const json = view.toJSON();

            expect(json.type).toBe("container-view");
            expect(json.targetSystemId).toBe(system.getId());
            expect(json.title).toBe("API Gateway Architecture");
            expect(json.description).toBe("Internal structure of the API gateway");
        });

        it("should include container views in build payload", () => {
            const frain = createFrain();
            const context = frain.getContext();

            context.setTitle("Test Context");
            context.setDescription("Test description");

            const system = context.addSoftwareSystem({
                name: "Web Application",
                description: "Main web app",
            });

            frain.createContainerView(system, {
                title: "Web App Containers",
                description: "Shows web app internals",
            });

            const payload = frain.build();

            expect(payload.views.containerViews).toHaveLength(1);
            expect(payload.views.containerViews[0]).toEqual({
                type: "container-view",
                targetSystemId: system.getId(),
                title: "Web App Containers",
                description: "Shows web app internals",
            });
        });

        it("should include multiple container views in build payload", () => {
            const frain = createFrain();
            const context = frain.getContext();

            const system1 = context.addSoftwareSystem({
                name: "Frontend",
                description: "User interface",
            });

            const system2 = context.addSoftwareSystem({
                name: "Backend",
                description: "Server application",
            });

            frain.createContainerView(system1, {
                title: "Frontend Architecture",
                description: "UI components",
            });

            frain.createContainerView(system2, {
                title: "Backend Architecture",
                description: "Server components",
            });

            const payload = frain.build();

            expect(payload.views.containerViews).toHaveLength(2);
            expect(payload.views.containerViews[0].title).toBe("Frontend Architecture");
            expect(payload.views.containerViews[1].title).toBe("Backend Architecture");
        });
    });

    describe("Adding containers via Frain", () => {
        it("should add container to software system and register globally", () => {
            const frain = createFrain();
            const context = frain.getContext();

            const system = context.addSoftwareSystem({
                name: "Banking System",
                description: "Core banking",
            });

            const container = frain.addContainer(system, {
                name: "Web Application",
                description: "Browser-based UI",
                technology: "React",
            });

            expect(container.getId()).toBeDefined();
            expect(system.getContainers()).toHaveLength(1);
            expect(system.getContainers()[0]).toBe(container);

            // Container should be registered in global elements
            expect(context.getElements()).toContain(container);
        });

        it("should include containers in build payload nodes", () => {
            const frain = createFrain();
            const context = frain.getContext();

            context.setTitle("Test");
            context.setDescription("Test");

            const system = context.addSoftwareSystem({
                name: "E-commerce",
                description: "Online store",
            });

            const webApp = frain.addContainer(system, {
                name: "Web Application",
                description: "Customer-facing website",
                technology: "Next.js",
            });

            const api = frain.addContainer(system, {
                name: "API Server",
                description: "REST API",
                technology: "Node.js / Express",
            });

            const payload = frain.build();

            expect(Object.keys(payload.nodes)).toHaveLength(3); // 1 system + 2 containers

            const webAppNode = payload.nodes[webApp.getId()];
            expect(webAppNode).toBeDefined();
            expect(webAppNode.name).toBe("Web Application");
            expect(webAppNode.technology).toBe("Next.js");
            expect(webAppNode.elementType).toBe(ElementType.CONTAINER);

            const apiNode = payload.nodes[api.getId()];
            expect(apiNode).toBeDefined();
            expect(apiNode.name).toBe("API Server");
            expect(apiNode.technology).toBe("Node.js / Express");
            expect(apiNode.elementType).toBe(ElementType.CONTAINER);
        });

        it("should allow relations between containers", () => {
            const frain = createFrain();
            const context = frain.getContext();

            const system = context.addSoftwareSystem({
                name: "Microservices Platform",
                description: "Distributed system",
            });

            const frontend = frain.addContainer(system, {
                name: "Frontend",
                description: "User interface",
                technology: "Vue.js",
            });

            const backend = frain.addContainer(system, {
                name: "Backend API",
                description: "Business logic",
                technology: "Go",
            });

            const database = frain.addContainer(system, {
                name: "Database",
                description: "Data storage",
                technology: "PostgreSQL",
            });

            frontend.use(backend, {
                description: "Makes API calls to",
                technology: "HTTPS/JSON",
            });

            backend.use(database, {
                description: "Reads from and writes to",
                technology: "SQL/TCP",
            });

            const payload = frain.build();

            expect(payload.edges).toHaveLength(2);

            const frontendToBackend = payload.edges.find(
                (e) => e.source === frontend.getId() && e.target === backend.getId()
            );
            expect(frontendToBackend).toBeDefined();
            expect(frontendToBackend?.description).toBe("Makes API calls to");

            const backendToDb = payload.edges.find(
                (e) => e.source === backend.getId() && e.target === database.getId()
            );
            expect(backendToDb).toBeDefined();
            expect(backendToDb?.description).toBe("Reads from and writes to");
        });

        it("should allow relations from persons to containers", () => {
            const frain = createFrain();
            const context = frain.getContext();

            const user = context.addPerson({
                name: "End User",
                description: "Uses the application",
            });

            const system = context.addSoftwareSystem({
                name: "Application",
                description: "Main application",
            });

            const webApp = frain.addContainer(system, {
                name: "Web Application",
                description: "Browser app",
                technology: "Angular",
            });

            user.use(webApp, {
                description: "Uses",
                technology: "HTTPS",
            });

            const payload = frain.build();

            const edge = payload.edges.find(
                (e) => e.source === user.getId() && e.target === webApp.getId()
            );
            expect(edge).toBeDefined();
            expect(edge?.description).toBe("Uses");
        });

        it("should allow relations from containers to external systems", () => {
            const frain = createFrain();
            const context = frain.getContext();

            const system = context.addSoftwareSystem({
                name: "Internal System",
                description: "Our system",
            });

            const externalPayment = context.addExternalSoftwareSystem({
                name: "Stripe",
                description: "Payment processor",
            });

            const paymentService = frain.addContainer(system, {
                name: "Payment Service",
                description: "Handles payments",
                technology: "Node.js",
            });

            paymentService.use(externalPayment, {
                description: "Processes payments via",
                technology: "HTTPS/REST",
            });

            const payload = frain.build();

            const edge = payload.edges.find(
                (e) =>
                    e.source === paymentService.getId() &&
                    e.target === externalPayment.getId()
            );
            expect(edge).toBeDefined();
            expect(edge?.description).toBe("Processes payments via");
        });

        it("should preserve parent-child relationship in container", () => {
            const frain = createFrain();
            const context = frain.getContext();

            const system = context.addSoftwareSystem({
                name: "Parent System",
                description: "The parent",
            });

            const container = frain.addContainer(system, {
                name: "Child Container",
                description: "A child container",
                technology: "Docker",
            });

            expect(container.getParentId()).toBe(system.getId());
        });
    });

    describe("Complete C4 Container Diagram Workflow", () => {
        it("should support full container diagram creation workflow", () => {
            const frain = createFrain();
            const context = frain.getContext();

            // Set context metadata
            context.setTitle("Internet Banking System");
            context.setDescription("C4 Context diagram for Internet Banking");

            // Add actors
            const customer = context.addPerson({
                name: "Personal Banking Customer",
                description: "A customer of the bank",
            });

            const admin = context.addPerson({
                name: "Bank Administrator",
                description: "Administers the banking system",
            });

            // Add main system
            const bankingSystem = context.addSoftwareSystem({
                name: "Internet Banking System",
                description: "Allows customers to view their accounts and make payments",
            });

            // Add external systems
            const emailSystem = context.addExternalSoftwareSystem({
                name: "Email System",
                description: "Microsoft Exchange email system",
            });

            const mainframe = context.addExternalSoftwareSystem({
                name: "Mainframe Banking System",
                description: "Stores all core banking information",
            });

            // Add containers to the banking system
            const webApp = frain.addContainer(bankingSystem, {
                name: "Web Application",
                description: "Delivers static content and the Internet banking SPA",
                technology: "Java / Spring MVC",
            });

            const singlePageApp = frain.addContainer(bankingSystem, {
                name: "Single-Page Application",
                description: "Provides Internet banking functionality via web browser",
                technology: "JavaScript / Angular",
            });

            const mobileApp = frain.addContainer(bankingSystem, {
                name: "Mobile App",
                description: "Provides Internet banking functionality via mobile device",
                technology: "Xamarin",
            });

            const apiApp = frain.addContainer(bankingSystem, {
                name: "API Application",
                description: "Provides Internet banking functionality via JSON/HTTPS API",
                technology: "Java / Spring MVC",
            });

            const database = frain.addContainer(bankingSystem, {
                name: "Database",
                description: "Stores user registration, authentication, and access logs",
                technology: "Oracle Database",
            });

            // Context-level relations
            customer.use(bankingSystem, {
                description: "Views account balances and makes payments using",
                technology: "",
            });

            admin.use(bankingSystem, {
                description: "Manages users and system configuration",
                technology: "",
            });

            bankingSystem.use(emailSystem, {
                description: "Sends e-mails using",
                technology: "SMTP",
            });

            bankingSystem.use(mainframe, {
                description: "Gets account information from, makes payments using",
                technology: "XML/HTTPS",
            });

            // Container-level relations
            customer.use(webApp, {
                description: "Visits",
                technology: "HTTPS",
            });

            customer.use(singlePageApp, {
                description: "Views account balances and makes payments using",
                technology: "",
            });

            customer.use(mobileApp, {
                description: "Views account balances and makes payments using",
                technology: "",
            });

            webApp.use(singlePageApp, {
                description: "Delivers to the customer's web browser",
                technology: "",
            });

            singlePageApp.use(apiApp, {
                description: "Makes API calls to",
                technology: "JSON/HTTPS",
            });

            mobileApp.use(apiApp, {
                description: "Makes API calls to",
                technology: "JSON/HTTPS",
            });

            apiApp.use(database, {
                description: "Reads from and writes to",
                technology: "JDBC",
            });

            apiApp.use(emailSystem, {
                description: "Sends e-mails using",
                technology: "SMTP",
            });

            apiApp.use(mainframe, {
                description: "Makes API calls to",
                technology: "XML/HTTPS",
            });

            // Create container view
            frain.createContainerView(bankingSystem, {
                title: "Internet Banking System - Container View",
                description: "The container diagram for the Internet Banking System",
            });

            // Build and verify
            const payload = frain.build();

            // Verify context
            expect(payload.views.systemContext.title).toBe("Internet Banking System");

            // Verify all nodes exist (2 persons + 1 system + 2 external + 5 containers = 10)
            expect(Object.keys(payload.nodes)).toHaveLength(10);

            // Verify container view
            expect(payload.views.containerViews).toHaveLength(1);
            expect(payload.views.containerViews[0].targetSystemId).toBe(bankingSystem.getId());
            expect(payload.views.containerViews[0].title).toBe(
                "Internet Banking System - Container View"
            );

            // Verify some key relations exist
            const edges = payload.edges;
            expect(edges.length).toBeGreaterThan(0);

            // Check customer -> webApp relation
            const customerToWebApp = edges.find(
                (e) => e.source === customer.getId() && e.target === webApp.getId()
            );
            expect(customerToWebApp).toBeDefined();
            expect(customerToWebApp?.description).toBe("Visits");

            // Check apiApp -> database relation
            const apiToDb = edges.find(
                (e) => e.source === apiApp.getId() && e.target === database.getId()
            );
            expect(apiToDb).toBeDefined();
            expect(apiToDb?.technology).toBe("JDBC");

            // Check apiApp -> external system relation
            const apiToMainframe = edges.find(
                (e) => e.source === apiApp.getId() && e.target === mainframe.getId()
            );
            expect(apiToMainframe).toBeDefined();
            expect(apiToMainframe?.technology).toBe("XML/HTTPS");
        });
    });

    describe("Edge cases", () => {
        it("should handle empty title and description", () => {
            const frain = createFrain();
            const context = frain.getContext();

            const system = context.addSoftwareSystem({
                name: "System",
                description: "A system",
            });

            const view = frain.createContainerView(system, {
                title: "",
                description: "",
            });

            expect(view.getTitle()).toBe("");
            expect(view.getDescription()).toBe("");
        });

        it("should handle special characters in title and description", () => {
            const frain = createFrain();
            const context = frain.getContext();

            const system = context.addSoftwareSystem({
                name: "System",
                description: "A system",
            });

            const view = frain.createContainerView(system, {
                title: "Title with <special> & \"characters\"",
                description: "Description with\nnewlines\tand\ttabs",
            });

            expect(view.getTitle()).toBe("Title with <special> & \"characters\"");
            expect(view.getDescription()).toBe("Description with\nnewlines\tand\ttabs");
        });

        it("should return target system reference", () => {
            const frain = createFrain();
            const context = frain.getContext();

            const system = context.addSoftwareSystem({
                name: "Target System",
                description: "The target",
            });

            const view = frain.createContainerView(system, {
                title: "View",
                description: "A view",
            });

            expect(view.getTargetSystem()).toBe(system);
        });

        it("should generate valid JSON that can be stringified", () => {
            const frain = createFrain();
            const context = frain.getContext();

            const system = context.addSoftwareSystem({
                name: "System",
                description: "A system",
            });

            frain.addContainer(system, {
                name: "Container",
                description: "A container",
                technology: "Docker",
            });

            frain.createContainerView(system, {
                title: "View",
                description: "A view",
            });

            const payload = frain.build();
            const jsonString = JSON.stringify(payload);

            expect(() => JSON.parse(jsonString)).not.toThrow();

            const parsed = JSON.parse(jsonString);
            expect(parsed.views.containerViews).toHaveLength(1);
            expect(parsed.views.containerViews[0].type).toBe("container-view");
        });
    });
});
