import { describe, expect, it } from "bun:test";
import { Frain } from "../src/frain";
import { ComponentView } from "../src/component-view";
import { ElementType } from "../src/types";

const validConfig = {
    apiKey: "550e8400-e29b-41d4-a716-446655440000",
    apiSecret: "550e8400-e29b-41d4-a716-446655440001",
    workspaceId: "550e8400-e29b-41d4-a716-446655440002",
};

function createFrain(): Frain {
    return new Frain(validConfig);
}

describe("ComponentView", () => {
    describe("Creation via Frain", () => {
        it("should create a component view for a container", () => {
            const frain = createFrain();
            const context = frain.getContext();

            const system = context.addSoftwareSystem({
                name: "Banking System",
                description: "Core banking application",
            });

            const apiContainer = frain.addContainer(system, {
                name: "API Application",
                description: "REST API backend",
                technology: "Java / Spring Boot",
            });

            const view = frain.createComponentView(apiContainer, {
                title: "API Application Components",
                description:
                    "Shows the internal structure of the API Application",
            });

            expect(view).toBeInstanceOf(ComponentView);
            expect(view.getTitle()).toBe("API Application Components");
            expect(view.getDescription()).toBe(
                "Shows the internal structure of the API Application",
            );
            expect(view.getTargetContainerId()).toBe(apiContainer.getId());
        });

        it("should store created component views in Frain", () => {
            const frain = createFrain();
            const context = frain.getContext();

            const system = context.addSoftwareSystem({
                name: "E-commerce Platform",
                description: "Online shopping platform",
            });

            const webApp = frain.addContainer(system, {
                name: "Web Application",
                description: "Frontend application",
                technology: "React",
            });

            expect(frain.getComponentViews()).toHaveLength(0);

            frain.createComponentView(webApp, {
                title: "Web App Components",
                description: "Frontend architecture",
            });

            expect(frain.getComponentViews()).toHaveLength(1);
        });

        it("should allow multiple component views for different containers", () => {
            const frain = createFrain();
            const context = frain.getContext();

            const system = context.addSoftwareSystem({
                name: "Microservices Platform",
                description: "Distributed system",
            });

            const container1 = frain.addContainer(system, {
                name: "User Service",
                description: "Handles user management",
                technology: "Node.js",
            });

            const container2 = frain.addContainer(system, {
                name: "Order Service",
                description: "Handles order processing",
                technology: "Go",
            });

            frain.createComponentView(container1, {
                title: "User Service Components",
                description: "Architecture of User Service",
            });

            frain.createComponentView(container2, {
                title: "Order Service Components",
                description: "Architecture of Order Service",
            });

            const views = frain.getComponentViews();
            expect(views).toHaveLength(2);
            expect(views[0].getTargetContainerId()).toBe(container1.getId());
            expect(views[1].getTargetContainerId()).toBe(container2.getId());
        });

        it("should allow multiple component views for the same container", () => {
            const frain = createFrain();
            const context = frain.getContext();

            const system = context.addSoftwareSystem({
                name: "Complex System",
                description: "A system with multiple perspectives",
            });

            const container = frain.addContainer(system, {
                name: "Core Service",
                description: "Main business logic",
                technology: "Java",
            });

            frain.createComponentView(container, {
                title: "Technical View",
                description: "Shows technical components",
            });

            frain.createComponentView(container, {
                title: "Domain View",
                description: "Shows domain components",
            });

            const views = frain.getComponentViews();
            expect(views).toHaveLength(2);
            expect(views[0].getTargetContainerId()).toBe(container.getId());
            expect(views[1].getTargetContainerId()).toBe(container.getId());
            expect(views[0].getTitle()).toBe("Technical View");
            expect(views[1].getTitle()).toBe("Domain View");
        });

        it("should not require a component view for every container", () => {
            const frain = createFrain();
            const context = frain.getContext();

            const system = context.addSoftwareSystem({
                name: "System",
                description: "A system",
            });

            const containerWithView = frain.addContainer(system, {
                name: "Complex Container",
                description: "Has internal components worth documenting",
                technology: "Java",
            });

            // This container won't have a component view
            frain.addContainer(system, {
                name: "Simple Container",
                description: "Too simple to need a component diagram",
                technology: "Redis",
            });

            frain.createComponentView(containerWithView, {
                title: "Complex Container Components",
                description: "Internal structure",
            });

            const views = frain.getComponentViews();
            expect(views).toHaveLength(1);
            expect(views[0].getTargetContainerId()).toBe(
                containerWithView.getId(),
            );
        });
    });

    describe("Component View JSON serialization", () => {
        it("should serialize component view to JSON", () => {
            const frain = createFrain();
            const context = frain.getContext();

            const system = context.addSoftwareSystem({
                name: "API Gateway",
                description: "Central API gateway",
            });

            const container = frain.addContainer(system, {
                name: "Gateway Service",
                description: "Routes and authenticates requests",
                technology: "Kong",
            });

            const view = frain.createComponentView(container, {
                title: "Gateway Architecture",
                description: "Internal structure of the gateway",
            });

            const json = view.toJSON();

            expect(json.type).toBe("component-view");
            expect(json.targetContainerId).toBe(container.getId());
            expect(json.title).toBe("Gateway Architecture");
            expect(json.description).toBe("Internal structure of the gateway");
        });

        it("should include component views in build payload", () => {
            const frain = createFrain();
            const context = frain.getContext();

            context.setTitle("Test Context");
            context.setDescription("Test description");

            const system = context.addSoftwareSystem({
                name: "Web Application",
                description: "Main web app",
            });

            const container = frain.addContainer(system, {
                name: "Backend API",
                description: "REST API",
                technology: "Express.js",
            });

            frain.createComponentView(container, {
                title: "Backend API Components",
                description: "Shows API internals",
            });

            const payload = frain.build();

            expect(payload.views.componentViews).toHaveLength(1);
            expect(payload.views.componentViews[0]).toEqual({
                type: "component-view",
                targetContainerId: container.getId(),
                title: "Backend API Components",
                description: "Shows API internals",
            });
        });

        it("should include multiple component views in build payload", () => {
            const frain = createFrain();
            const context = frain.getContext();

            const system = context.addSoftwareSystem({
                name: "Platform",
                description: "Platform system",
            });

            const container1 = frain.addContainer(system, {
                name: "Service A",
                description: "First service",
                technology: "Python",
            });

            const container2 = frain.addContainer(system, {
                name: "Service B",
                description: "Second service",
                technology: "Rust",
            });

            frain.createComponentView(container1, {
                title: "Service A Architecture",
                description: "Service A components",
            });

            frain.createComponentView(container2, {
                title: "Service B Architecture",
                description: "Service B components",
            });

            const payload = frain.build();

            expect(payload.views.componentViews).toHaveLength(2);
            expect(payload.views.componentViews[0].title).toBe(
                "Service A Architecture",
            );
            expect(payload.views.componentViews[1].title).toBe(
                "Service B Architecture",
            );
        });
    });

    describe("Adding components via Frain", () => {
        it("should add component to container and register globally", () => {
            const frain = createFrain();
            const context = frain.getContext();

            const system = context.addSoftwareSystem({
                name: "Banking System",
                description: "Core banking",
            });

            const container = frain.addContainer(system, {
                name: "API Application",
                description: "REST API",
                technology: "Spring Boot",
            });

            const component = frain.addComponent(container, {
                name: "Security Component",
                description: "Handles authentication and authorization",
                technology: "Spring Security",
            });

            expect(component.getId()).toBeDefined();
            expect(container.getComponents()).toHaveLength(1);
            expect(container.getComponents()[0]).toBe(component);

            // Component should be registered in global elements
            expect(context.getElements()).toContain(component);
        });

        it("should include components in build payload nodes", () => {
            const frain = createFrain();
            const context = frain.getContext();

            context.setTitle("Test");
            context.setDescription("Test");

            const system = context.addSoftwareSystem({
                name: "E-commerce",
                description: "Online store",
            });

            const apiContainer = frain.addContainer(system, {
                name: "API Application",
                description: "REST API backend",
                technology: "Node.js",
            });

            const authComponent = frain.addComponent(apiContainer, {
                name: "Authentication Controller",
                description: "Handles user authentication",
                technology: "Express.js / Passport",
            });

            const orderComponent = frain.addComponent(apiContainer, {
                name: "Order Controller",
                description: "Handles order operations",
                technology: "Express.js",
            });

            const payload = frain.build();

            // 1 system + 1 container + 2 components = 4
            expect(Object.keys(payload.nodes)).toHaveLength(4);

            const authNode = payload.nodes[authComponent.getId()];
            expect(authNode).toBeDefined();
            expect(authNode.name).toBe("Authentication Controller");
            expect(authNode.technology).toBe("Express.js / Passport");
            expect(authNode.elementType).toBe(ElementType.COMPONENT);

            const orderNode = payload.nodes[orderComponent.getId()];
            expect(orderNode).toBeDefined();
            expect(orderNode.name).toBe("Order Controller");
            expect(orderNode.technology).toBe("Express.js");
            expect(orderNode.elementType).toBe(ElementType.COMPONENT);
        });

        it("should allow relations between components", () => {
            const frain = createFrain();
            const context = frain.getContext();

            const system = context.addSoftwareSystem({
                name: "Application",
                description: "Main app",
            });

            const container = frain.addContainer(system, {
                name: "Backend",
                description: "Server",
                technology: "Java",
            });

            const controller = frain.addComponent(container, {
                name: "User Controller",
                description: "REST endpoints for users",
                technology: "Spring MVC",
            });

            const service = frain.addComponent(container, {
                name: "User Service",
                description: "Business logic for users",
                technology: "Spring",
            });

            const repository = frain.addComponent(container, {
                name: "User Repository",
                description: "Data access for users",
                technology: "Spring Data JPA",
            });

            controller.use(service, {
                description: "Calls",
                technology: "Method call",
            });

            service.use(repository, {
                description: "Uses",
                technology: "Method call",
            });

            const payload = frain.build();

            expect(payload.edges).toHaveLength(2);

            const controllerToService = payload.edges.find(
                (e) =>
                    e.source === controller.getId() &&
                    e.target === service.getId(),
            );
            expect(controllerToService).toBeDefined();
            expect(controllerToService?.description).toBe("Calls");

            const serviceToRepo = payload.edges.find(
                (e) =>
                    e.source === service.getId() &&
                    e.target === repository.getId(),
            );
            expect(serviceToRepo).toBeDefined();
            expect(serviceToRepo?.description).toBe("Uses");
        });

        it("should allow relations from components to external systems", () => {
            const frain = createFrain();
            const context = frain.getContext();

            const system = context.addSoftwareSystem({
                name: "Internal System",
                description: "Our system",
            });

            const externalDb = context.addExternalSoftwareSystem({
                name: "Legacy Database",
                description: "Old database system",
            });

            const container = frain.addContainer(system, {
                name: "Data Service",
                description: "Data access layer",
                technology: "Java",
            });

            const repository = frain.addComponent(container, {
                name: "Legacy Repository",
                description: "Accesses legacy data",
                technology: "JDBC",
            });

            repository.use(externalDb, {
                description: "Reads from",
                technology: "SQL/JDBC",
            });

            const payload = frain.build();

            const edge = payload.edges.find(
                (e) =>
                    e.source === repository.getId() &&
                    e.target === externalDb.getId(),
            );
            expect(edge).toBeDefined();
            expect(edge?.description).toBe("Reads from");
        });

        it("should allow relations between components in different containers", () => {
            const frain = createFrain();
            const context = frain.getContext();

            const system = context.addSoftwareSystem({
                name: "Microservices",
                description: "Distributed system",
            });

            const userService = frain.addContainer(system, {
                name: "User Service",
                description: "User management",
                technology: "Node.js",
            });

            const orderService = frain.addContainer(system, {
                name: "Order Service",
                description: "Order processing",
                technology: "Go",
            });

            const userController = frain.addComponent(userService, {
                name: "User API",
                description: "User REST API",
                technology: "Express",
            });

            const orderController = frain.addComponent(orderService, {
                name: "Order API",
                description: "Order REST API",
                technology: "Gin",
            });

            orderController.use(userController, {
                description: "Fetches user data from",
                technology: "gRPC",
            });

            const payload = frain.build();

            const edge = payload.edges.find(
                (e) =>
                    e.source === orderController.getId() &&
                    e.target === userController.getId(),
            );
            expect(edge).toBeDefined();
            expect(edge?.technology).toBe("gRPC");
        });

        it("should preserve parent-child relationship in component", () => {
            const frain = createFrain();
            const context = frain.getContext();

            const system = context.addSoftwareSystem({
                name: "System",
                description: "Parent system",
            });

            const container = frain.addContainer(system, {
                name: "Parent Container",
                description: "The container",
                technology: "Docker",
            });

            const component = frain.addComponent(container, {
                name: "Child Component",
                description: "A child component",
                technology: "Java",
            });

            expect(component.getParentId()).toBe(container.getId());
        });
    });

    describe("Complete C4 Component Diagram Workflow", () => {
        it("should support full component diagram creation workflow", () => {
            const frain = createFrain();
            const context = frain.getContext();

            // Set context metadata
            context.setTitle("Internet Banking System");
            context.setDescription("C4 diagrams for Internet Banking");

            // Add actors
            const customer = context.addPerson({
                name: "Personal Banking Customer",
                description: "A customer of the bank",
            });

            // Add main system
            const bankingSystem = context.addSoftwareSystem({
                name: "Internet Banking System",
                description: "Allows customers to manage their accounts",
            });

            // Add external systems
            const emailSystem = context.addExternalSoftwareSystem({
                name: "Email System",
                description: "Sends emails to customers",
            });

            const mainframe = context.addExternalSoftwareSystem({
                name: "Mainframe",
                description: "Core banking system",
            });

            // Add containers
            const webApp = frain.addContainer(bankingSystem, {
                name: "Single-Page Application",
                description: "Provides banking UI",
                technology: "Angular",
            });

            const apiApplication = frain.addContainer(bankingSystem, {
                name: "API Application",
                description: "Provides banking functionality via API",
                technology: "Java / Spring MVC",
            });

            const database = frain.addContainer(bankingSystem, {
                name: "Database",
                description: "Stores user data",
                technology: "PostgreSQL",
            });

            // Add components to API Application
            const signinController = frain.addComponent(apiApplication, {
                name: "Sign In Controller",
                description: "Allows users to sign in",
                technology: "Spring MVC REST Controller",
            });

            const accountsController = frain.addComponent(apiApplication, {
                name: "Accounts Controller",
                description: "Provides account information",
                technology: "Spring MVC REST Controller",
            });

            const securityComponent = frain.addComponent(apiApplication, {
                name: "Security Component",
                description: "Provides authentication functionality",
                technology: "Spring Security",
            });

            const emailComponent = frain.addComponent(apiApplication, {
                name: "Email Component",
                description: "Sends emails to users",
                technology: "Spring Email",
            });

            const mainframeFacade = frain.addComponent(apiApplication, {
                name: "Mainframe Facade",
                description: "Facade to the mainframe banking system",
                technology: "Spring Bean",
            });

            // Context-level relations
            customer.use(bankingSystem, {
                description: "Views account balances and makes payments using",
                technology: "",
            });

            bankingSystem.use(emailSystem, {
                description: "Sends e-mails using",
                technology: "SMTP",
            });

            bankingSystem.use(mainframe, {
                description: "Gets account information from",
                technology: "XML/HTTPS",
            });

            // Container-level relations
            customer.use(webApp, {
                description: "Uses",
                technology: "HTTPS",
            });

            webApp.use(apiApplication, {
                description: "Makes API calls to",
                technology: "JSON/HTTPS",
            });

            apiApplication.use(database, {
                description: "Reads from and writes to",
                technology: "JDBC",
            });

            // Component-level relations
            webApp.use(signinController, {
                description: "Makes API calls to",
                technology: "JSON/HTTPS",
            });

            webApp.use(accountsController, {
                description: "Makes API calls to",
                technology: "JSON/HTTPS",
            });

            signinController.use(securityComponent, {
                description: "Uses",
                technology: "",
            });

            accountsController.use(mainframeFacade, {
                description: "Uses",
                technology: "",
            });

            securityComponent.use(database, {
                description: "Reads from and writes to",
                technology: "JDBC",
            });

            emailComponent.use(emailSystem, {
                description: "Sends emails using",
                technology: "SMTP",
            });

            mainframeFacade.use(mainframe, {
                description: "Uses",
                technology: "XML/HTTPS",
            });

            // Create container view for the system
            frain.createContainerView(bankingSystem, {
                title: "Internet Banking System - Containers",
                description:
                    "Container diagram for the Internet Banking System",
            });

            // Create component view for the API Application
            frain.createComponentView(apiApplication, {
                title: "API Application - Components",
                description: "Component diagram for the API Application",
            });

            // Build and verify
            const payload = frain.build();

            // Verify context
            expect(payload.views.systemContext.title).toBe(
                "Internet Banking System",
            );

            // Verify all nodes exist:
            // 1 person + 1 system + 2 external + 3 containers + 5 components = 12
            expect(Object.keys(payload.nodes)).toHaveLength(12);

            // Verify container view
            expect(payload.views.containerViews).toHaveLength(1);
            expect(payload.views.containerViews[0].targetSystemId).toBe(
                bankingSystem.getId(),
            );

            // Verify component view
            expect(payload.views.componentViews).toHaveLength(1);
            expect(payload.views.componentViews[0].targetContainerId).toBe(
                apiApplication.getId(),
            );
            expect(payload.views.componentViews[0].title).toBe(
                "API Application - Components",
            );

            // Verify some key relations
            const edges = payload.edges;
            expect(edges.length).toBeGreaterThan(0);

            // Check signinController -> securityComponent relation
            const signinToSecurity = edges.find(
                (e) =>
                    e.source === signinController.getId() &&
                    e.target === securityComponent.getId(),
            );
            expect(signinToSecurity).toBeDefined();
            expect(signinToSecurity?.description).toBe("Uses");

            // Check mainframeFacade -> mainframe relation
            const facadeToMainframe = edges.find(
                (e) =>
                    e.source === mainframeFacade.getId() &&
                    e.target === mainframe.getId(),
            );
            expect(facadeToMainframe).toBeDefined();
            expect(facadeToMainframe?.technology).toBe("XML/HTTPS");

            // Check emailComponent -> emailSystem relation
            const emailToExternal = edges.find(
                (e) =>
                    e.source === emailComponent.getId() &&
                    e.target === emailSystem.getId(),
            );
            expect(emailToExternal).toBeDefined();
            expect(emailToExternal?.technology).toBe("SMTP");
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

            const container = frain.addContainer(system, {
                name: "Container",
                description: "A container",
                technology: "Docker",
            });

            const view = frain.createComponentView(container, {
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

            const container = frain.addContainer(system, {
                name: "Container",
                description: "A container",
                technology: "Docker",
            });

            const view = frain.createComponentView(container, {
                title: 'Title with <special> & "characters"',
                description: "Description with\nnewlines\tand\ttabs",
            });

            expect(view.getTitle()).toBe('Title with <special> & "characters"');
            expect(view.getDescription()).toBe(
                "Description with\nnewlines\tand\ttabs",
            );
        });

        it("should return target container reference", () => {
            const frain = createFrain();
            const context = frain.getContext();

            const system = context.addSoftwareSystem({
                name: "System",
                description: "A system",
            });

            const container = frain.addContainer(system, {
                name: "Target Container",
                description: "The target",
                technology: "Java",
            });

            const view = frain.createComponentView(container, {
                title: "View",
                description: "A view",
            });

            expect(view.getTargetContainer()).toBe(container);
        });

        it("should generate valid JSON that can be stringified", () => {
            const frain = createFrain();
            const context = frain.getContext();

            const system = context.addSoftwareSystem({
                name: "System",
                description: "A system",
            });

            const container = frain.addContainer(system, {
                name: "Container",
                description: "A container",
                technology: "Docker",
            });

            frain.addComponent(container, {
                name: "Component",
                description: "A component",
                technology: "Java",
            });

            frain.createComponentView(container, {
                title: "View",
                description: "A view",
            });

            const payload = frain.build();
            const jsonString = JSON.stringify(payload);

            expect(() => JSON.parse(jsonString)).not.toThrow();

            const parsed = JSON.parse(jsonString);
            expect(parsed.views.componentViews).toHaveLength(1);
            expect(parsed.views.componentViews[0].type).toBe("component-view");
        });

        it("should handle container with components but no component view", () => {
            const frain = createFrain();
            const context = frain.getContext();

            const system = context.addSoftwareSystem({
                name: "System",
                description: "A system",
            });

            const container = frain.addContainer(system, {
                name: "Container",
                description: "Has components",
                technology: "Java",
            });

            // Add components but don't create a view
            frain.addComponent(container, {
                name: "Component A",
                description: "First component",
                technology: "Spring",
            });

            frain.addComponent(container, {
                name: "Component B",
                description: "Second component",
                technology: "Spring",
            });

            const payload = frain.build();

            // Components should still be in nodes
            expect(Object.keys(payload.nodes)).toHaveLength(4); // 1 system + 1 container + 2 components

            // But no component view
            expect(payload.views.componentViews).toHaveLength(0);
        });

        it("should handle multiple containers with mixed component view coverage", () => {
            const frain = createFrain();
            const context = frain.getContext();

            const system = context.addSoftwareSystem({
                name: "System",
                description: "A system",
            });

            const containerWithView = frain.addContainer(system, {
                name: "Container With View",
                description: "Has a component view",
                technology: "Java",
            });

            const containerWithoutView = frain.addContainer(system, {
                name: "Container Without View",
                description: "No component view",
                technology: "Redis",
            });

            frain.addComponent(containerWithView, {
                name: "Component A",
                description: "In container with view",
                technology: "Spring",
            });

            frain.addComponent(containerWithoutView, {
                name: "Component B",
                description: "In container without view",
                technology: "Jedis",
            });

            // Only create view for one container
            frain.createComponentView(containerWithView, {
                title: "Container With View - Components",
                description: "Only this container has a view",
            });

            const payload = frain.build();

            // All elements should be in nodes
            expect(Object.keys(payload.nodes)).toHaveLength(5); // 1 system + 2 containers + 2 components

            // Only one component view
            expect(payload.views.componentViews).toHaveLength(1);
            expect(payload.views.componentViews[0].targetContainerId).toBe(
                containerWithView.getId(),
            );
        });
    });

    describe("Parent ID in payload nodes", () => {
        it("should include parentId for components in payload nodes", () => {
            const frain = createFrain();
            const context = frain.getContext();

            const system = context.addSoftwareSystem({
                name: "Banking System",
                description: "Core banking",
            });

            const apiContainer = frain.addContainer(system, {
                name: "API Application",
                description: "REST API",
                technology: "Spring Boot",
            });

            const controller = frain.addComponent(apiContainer, {
                name: "User Controller",
                description: "Handles user requests",
                technology: "Spring MVC",
            });

            const service = frain.addComponent(apiContainer, {
                name: "User Service",
                description: "Business logic",
                technology: "Spring",
            });

            const payload = frain.build();

            // Components should have parentId pointing to the container
            const controllerNode = payload.nodes[controller.getId()];
            expect(controllerNode.parentId).toBe(apiContainer.getId());

            const serviceNode = payload.nodes[service.getId()];
            expect(serviceNode.parentId).toBe(apiContainer.getId());

            // Container should have parentId pointing to the system
            const containerNode = payload.nodes[apiContainer.getId()];
            expect(containerNode.parentId).toBe(system.getId());

            // System should not have parentId
            const systemNode = payload.nodes[system.getId()];
            expect(systemNode.parentId).toBeUndefined();
        });

        it("should preserve full hierarchy chain in JSON", () => {
            const frain = createFrain();
            const context = frain.getContext();

            const system = context.addSoftwareSystem({
                name: "Platform",
                description: "Main platform",
            });

            const container = frain.addContainer(system, {
                name: "Backend Service",
                description: "Main service",
                technology: "Go",
            });

            const component = frain.addComponent(container, {
                name: "Repository",
                description: "Data access",
                technology: "GORM",
            });

            const payload = frain.build();
            const jsonString = JSON.stringify(payload);
            const parsed = JSON.parse(jsonString);

            // Verify hierarchy survives JSON serialization
            const componentNode = parsed.nodes[component.getId()];
            expect(componentNode.parentId).toBe(container.getId());

            const containerNode = parsed.nodes[container.getId()];
            expect(containerNode.parentId).toBe(system.getId());

            const systemNode = parsed.nodes[system.getId()];
            expect(systemNode.parentId).toBeUndefined();
        });

        it("should allow frontend to reconstruct component hierarchy from parentId", () => {
            const frain = createFrain();
            const context = frain.getContext();

            const system = context.addSoftwareSystem({
                name: "System",
                description: "A system",
            });

            const container = frain.addContainer(system, {
                name: "Service",
                description: "A service",
                technology: "Java",
            });

            const component1 = frain.addComponent(container, {
                name: "Controller",
                description: "REST endpoints",
                technology: "Spring MVC",
            });

            const component2 = frain.addComponent(container, {
                name: "Service Layer",
                description: "Business logic",
                technology: "Spring",
            });

            const component3 = frain.addComponent(container, {
                name: "Repository",
                description: "Data access",
                technology: "JPA",
            });

            const payload = frain.build();

            // Simulate frontend logic to find all components of a container
            const containerId = container.getId();
            const componentsOfContainer = Object.values(payload.nodes).filter(
                (node) => node.parentId === containerId,
            );

            expect(componentsOfContainer).toHaveLength(3);
            expect(componentsOfContainer.map((n) => n.name).sort()).toEqual([
                "Controller",
                "Repository",
                "Service Layer",
            ]);
        });

        it("should support multi-level hierarchy traversal", () => {
            const frain = createFrain();
            const context = frain.getContext();

            const system = context.addSoftwareSystem({
                name: "E-commerce",
                description: "Online store",
            });

            const orderService = frain.addContainer(system, {
                name: "Order Service",
                description: "Handles orders",
                technology: "Node.js",
            });

            const userService = frain.addContainer(system, {
                name: "User Service",
                description: "Handles users",
                technology: "Go",
            });

            frain.addComponent(orderService, {
                name: "Order Controller",
                description: "Order endpoints",
                technology: "Express",
            });

            frain.addComponent(orderService, {
                name: "Order Repository",
                description: "Order data",
                technology: "Prisma",
            });

            frain.addComponent(userService, {
                name: "User Controller",
                description: "User endpoints",
                technology: "Gin",
            });

            const payload = frain.build();

            // Find all containers of the system
            const containers = Object.values(payload.nodes).filter(
                (node) => node.parentId === system.getId(),
            );
            expect(containers).toHaveLength(2);

            // Find all components of orderService
            const orderComponents = Object.values(payload.nodes).filter(
                (node) => node.parentId === orderService.getId(),
            );
            expect(orderComponents).toHaveLength(2);

            // Find all components of userService
            const userComponents = Object.values(payload.nodes).filter(
                (node) => node.parentId === userService.getId(),
            );
            expect(userComponents).toHaveLength(1);
        });
    });
});
