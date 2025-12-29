import { Context } from "./context";
import { ComponentView, type ComponentViewConfig } from "./component-view";
import { ContainerView, type ContainerViewConfig } from "./container-view";
import {
    Component,
    Container,
    SoftwareSystem,
    type ComponentCreationConfig,
    type ContainerCreationConfig,
} from "./element";
import { createScopedLogger } from "./logger";
import type { FrainConfig, FrainPayload } from "./types";
import { frainConfigValidator } from "./validations";

const log = createScopedLogger("frain");

export class Frain {
    private workspaceId: string;
    private apiKey: string;
    private apiSecret: string;

    private context: Context;
    private containerViews: ContainerView[] = [];
    private componentViews: ComponentView[] = [];

    constructor(config: FrainConfig) {
        const validation = frainConfigValidator.safeParse(config);

        if (!validation.success) {
            throw new Error(
                "Invalid Frain Configuration, check your credentials. Message: " +
                    validation.error.message,
            );
        }

        this.workspaceId = config.workspaceId;
        this.apiKey = config.apiKey;
        this.apiSecret = config.apiSecret;
        this.context = new Context();
    }

    public getContext(): Context {
        return this.context;
    }

    /**
     * Creates a Container within a SoftwareSystem and registers it in the global element list.
     * This is a convenience method that handles both creation and registration.
     */
    public addContainer(
        system: SoftwareSystem,
        config: ContainerCreationConfig,
    ): Container {
        const container = system.addContainer(config);

        // Register the container in the global element list so it appears in the JSON output
        this.context.getElements().push(container);

        log.debug(
            { containerId: container.getId(), systemId: system.getId() },
            "Container added to system and registered globally",
        );

        return container;
    }

    /**
     * Creates a ContainerView for a specific SoftwareSystem.
     * The view represents a C4 Container diagram showing the internal structure of the system.
     */
    public createContainerView(
        system: SoftwareSystem,
        config: ContainerViewConfig,
    ): ContainerView {
        const view = new ContainerView(system, config);
        this.containerViews.push(view);

        log.debug(
            { systemId: system.getId(), title: config.title },
            "Container view created",
        );

        return view;
    }

    public getContainerViews(): ContainerView[] {
        return this.containerViews;
    }

    /**
     * Creates a Component within a Container and registers it in the global element list.
     * This is a convenience method that handles both creation and registration.
     */
    public addComponent(
        container: Container,
        config: ComponentCreationConfig,
    ): Component {
        const component = container.addComponent(config);

        // Register the component in the global element list so it appears in the JSON output
        this.context.getElements().push(component);

        log.debug(
            { componentId: component.getId(), containerId: container.getId() },
            "Component added to container and registered globally",
        );

        return component;
    }

    /**
     * Creates a ComponentView for a specific Container.
     * The view represents a C4 Component diagram showing the internal structure of the container.
     */
    public createComponentView(
        container: Container,
        config: ComponentViewConfig,
    ): ComponentView {
        const view = new ComponentView(container, config);
        this.componentViews.push(view);

        log.debug(
            { containerId: container.getId(), title: config.title },
            "Component view created",
        );

        return view;
    }

    public getComponentViews(): ComponentView[] {
        return this.componentViews;
    }

    public build(): FrainPayload {
        const startedAt = Date.now();

        log.info({ workspaceId: this.workspaceId }, "Starting build process");

        const graphOutput = this.context.toJSON();
        const nodeCount = Object.keys(graphOutput.nodes).length;
        const edgeCount = graphOutput.edges.length;

        log.debug({ nodeCount, edgeCount }, "Context graph prepared");

        const payload: FrainPayload = {
            workspaceId: this.workspaceId,
            nodes: graphOutput.nodes,
            edges: graphOutput.edges,
            views: {
                systemContext: graphOutput.context,
                containerViews: this.containerViews.map((v) => v.toJSON()),
                componentViews: this.componentViews.map((v) => v.toJSON()),
            },
        };

        log.info(
            {
                workspaceId: this.workspaceId,
                nodeCount,
                edgeCount,
                containerViewCount: this.containerViews.length,
                componentViewCount: this.componentViews.length,
                durationMs: Date.now() - startedAt,
            },
            "Frain payload build complete",
        );

        return payload;
    }
}
