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

    // ===========================================
    // 1. DEFINE THE MODEL (Structure)
    // ===========================================

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
            "A task management application that allows users to create, organize, and track their tasks",
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

    // ===========================================
    // 2. ADD CONTAINERS TO TODO APP (Using Frain as orchestrator)
    // ===========================================

    const webApp = frain.addContainer(todoApp, {
        name: "Web Application",
        description:
            "Single-page application providing the main user interface for task management",
        technology: "React / TypeScript",
    });

    const mobileApp = frain.addContainer(todoApp, {
        name: "Mobile App",
        description:
            "Native mobile application for iOS and Android with offline support",
        technology: "React Native",
    });

    const apiGateway = frain.addContainer(todoApp, {
        name: "API Gateway",
        description:
            "REST API handling authentication, authorization, and request routing",
        technology: "Node.js / Express",
    });

    const taskService = frain.addContainer(todoApp, {
        name: "Task Service",
        description:
            "Microservice responsible for task CRUD operations and business logic",
        technology: "Node.js / TypeScript",
    });

    const notificationService = frain.addContainer(todoApp, {
        name: "Notification Service",
        description:
            "Handles scheduling and sending of reminders and notifications",
        technology: "Node.js / Bull Queue",
    });

    const subscriptionService = frain.addContainer(todoApp, {
        name: "Subscription Service",
        description:
            "Manages user subscriptions, billing cycles, and feature access",
        technology: "Node.js / TypeScript",
    });

    // ===========================================
    // 3. DEFINE RELATIONS
    // ===========================================

    // Context-level relations (Users to Todo App)
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

    // Container-level relations (Users to Containers)
    freeUser.use(webApp, {
        description: "Uses to manage tasks",
        technology: "HTTPS",
    });

    premiumUser.use(webApp, {
        description: "Uses to manage tasks and collaborate",
        technology: "HTTPS",
    });

    premiumUser.use(mobileApp, {
        description: "Uses on mobile devices",
        technology: "HTTPS",
    });

    admin.use(apiGateway, {
        description: "Accesses admin endpoints",
        technology: "HTTPS",
    });

    // Internal container relations
    webApp.use(apiGateway, {
        description: "Makes API calls",
        technology: "JSON/HTTPS",
    });

    mobileApp.use(apiGateway, {
        description: "Makes API calls",
        technology: "JSON/HTTPS",
    });

    apiGateway.use(taskService, {
        description: "Routes task operations",
        technology: "gRPC",
    });

    apiGateway.use(subscriptionService, {
        description: "Routes subscription operations",
        technology: "gRPC",
    });

    taskService.use(notificationService, {
        description: "Schedules reminders for tasks",
        technology: "Message Queue",
    });

    // Container to External System relations
    apiGateway.use(supabase, {
        description: "Authenticates users",
        technology: "HTTPS",
    });

    taskService.use(supabase, {
        description: "Stores and retrieves task data",
        technology: "PostgreSQL",
    });

    notificationService.use(resend, {
        description: "Sends email notifications",
        technology: "HTTPS",
    });

    subscriptionService.use(stripe, {
        description: "Processes payments",
        technology: "HTTPS",
    });

    subscriptionService.use(supabase, {
        description: "Stores subscription data",
        technology: "PostgreSQL",
    });

    // Context-level relations (Todo App to External Systems)
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

    // ===========================================
    // 4. DEFINE VIEWS (Presentation Layer)
    // ===========================================

    // Container View for Todo App (C4 Level 2)
    frain.createContainerView(todoApp, {
        title: "Todo App - Container Diagram",
        description:
            "Shows the internal structure of the Todo App system, including all containers and their interactions",
    });

    // ===========================================
    // 5. BUILD AND OUTPUT
    // ===========================================

    const payload = frain.build();
    console.log(JSON.stringify(payload, null, 2));
}

main();
