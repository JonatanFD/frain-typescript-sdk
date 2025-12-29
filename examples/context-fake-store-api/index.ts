import { Frain } from "../../src/frain";

// Env variables - Replace with your actual credentials or use environment variables
const ENVIRONMENT_CONFIG = {
    apiKey: process.env.FRAIN_API_KEY || "550e8400-e29b-41d4-a716-446655440000",
    apiSecret:
        process.env.FRAIN_API_SECRET || "550e8400-e29b-41d4-a716-446655440001",
    workspaceId:
        process.env.FRAIN_WORKSPACE_ID ||
        "550e8400-e29b-41d4-a716-446655440002",
};

function main() {
    const frain = new Frain(ENVIRONMENT_CONFIG);

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
    console.log(JSON.stringify(payload, null, 2));
}

main();
