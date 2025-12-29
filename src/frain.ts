import { Context } from "./context";
import { createScopedLogger } from "./logger";
import type { FrainConfig, FrainPayload } from "./types";
import { frainConfigValidator } from "./validations";

const log = createScopedLogger("frain");

export class Frain {
    private workspaceId: string;
    private apiKey: string;
    private apiSecret: string;

    private context: Context;

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
            context: graphOutput.context,
        };

        log.info(
            {
                workspaceId: this.workspaceId,
                nodeCount,
                edgeCount,
                durationMs: Date.now() - startedAt,
            },
            "Frain payload build complete",
        );

        return payload;
    }
}
