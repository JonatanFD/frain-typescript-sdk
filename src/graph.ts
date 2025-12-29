import { createScopedLogger } from "./logger";
import type {
    ContextJSON,
    EdgeJSON,
    ElementJSON,
    GraphNodesIndex,
} from "./types";

export interface GraphBuildInput {
    title: string;
    description: string;
    elements: ElementJSON[];
}

export interface GraphBuildOutput {
    nodes: GraphNodesIndex;
    edges: EdgeJSON[];
    context: ContextJSON;
}

const log = createScopedLogger("graph-builder");

export class GraphBuilder {
    public static build(input: GraphBuildInput): GraphBuildOutput {
        const { title, description, elements } = input;

        log.info(
            { title, elementCount: elements.length },
            "Building graph payload",
        );

        const nodes: GraphNodesIndex = {};
        for (const element of elements) {
            if (!element?.id) {
                log.warn({ element }, "Skipping element without identifier");
                continue;
            }

            nodes[element.id] = {
                id: element.id,
                name: element.name,
                description: element.description,
                technology: element.technology,
                elementType: element.elementType,
                styles: element.styles,
                ...(element.parentId && { parentId: element.parentId }),
            };
        }

        const edges: EdgeJSON[] = [];
        for (const element of elements) {
            if (!element?.id) {
                continue;
            }

            const relations = element.relations ?? [];
            for (const relation of relations) {
                const targetId = relation?.targetId;
                if (typeof targetId !== "string" || targetId.length === 0) {
                    log.warn(
                        { sourceId: element.id, relation },
                        "Skipping relation without valid target",
                    );
                    continue;
                }

                edges.push({
                    source: element.id,
                    target: targetId,
                    description: relation.description,
                    technology: relation.technology,
                });
            }
        }

        log.debug(
            {
                nodeCount: Object.keys(nodes).length,
                edgeCount: edges.length,
            },
            "Graph payload prepared",
        );

        return {
            nodes,
            edges,
            context: {
                title,
                description,
            },
        };
    }
}

export function buildGraph(input: GraphBuildInput): GraphBuildOutput {
    return GraphBuilder.build(input);
}
