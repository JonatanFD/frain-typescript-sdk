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

    context.setTitle("Todo App - Context Diagram");
    context.setDescription(
        "C4 Context diagram for a Todo application with premium features",
    );

    // Persons
    const freeUser = context.addPerson({
        name: "Free User",
        description:
            "A user with limited access to basic todo features (up to 10 tasks)",
    });

    const premiumUser = context.addPerson({
        name: "Premium User",
        description:
            "A paying user with unlimited tasks, reminders, and collaboration features",
    });

    const admin = context.addPerson({
        name: "Administrator",
        description:
            "System administrator who manages users, subscriptions, and system health",
    });

    // Main Software System
    const todoApp = context.addSoftwareSystem({
        name: "Todo App",
        description:
            "A task management application that allows users to create, organize, and track their",
    });

    // External Software Systems
    const supabase = context.addExternalSoftwareSystem({
        name: "Supabase",
        description:
            "Backend-as-a-Service providing PostgreSQL database, authentication, and real-time subscriptions",
    });

    const stripe = context.addExternalSoftwareSystem({
        name: "Stripe",
        description:
            "Payment processing platform for handling premium subscriptions and billing",
    });

    const resend = context.addExternalSoftwareSystem({
        name: "Resend",
        description:
            "Email delivery service for sending transactional emails, reminders, and notifications",
    });

    // Relations - Users to Todo App
    freeUser.use(todoApp, {
        description: "Creates and manages basic tasks",
        technology: "HTTPS",
    });

    premiumUser.use(todoApp, {
        description: "Creates unlimited tasks, sets reminders, collaborates",
        technology: "HTTPS",
    });

    admin.use(todoApp, {
        description: "Manages users, monitors system, handles support",
        technology: "HTTPS",
    });

    // Relations - Todo App to External Systems
    todoApp.use(supabase, {
        description:
            "Stores user data, tasks, and authentication; real-time sync",
        technology: "HTTPS/WebSocket",
    });

    todoApp.use(stripe, {
        description: "Processes subscription payments and manages billing",
        technology: "HTTPS",
    });

    todoApp.use(resend, {
        description: "Sends task reminders, welcome emails, and notifications",
        technology: "HTTPS",
    });

    // Build and output the payload
    const payload = frain.build();
    console.log(JSON.stringify(payload, null, 2));
}

main();
