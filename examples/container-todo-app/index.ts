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

    // 1. DEFINE THE MODEL (Structure)

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

    // 2. ADD CONTAINERS TO TODO APP (Using Frain as orchestrator)

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

    // 3. ADD COMPONENTS TO TASK SERVICE (C4 Level 3)

    const taskController = frain.addComponent(taskService, {
        name: "Task Controller",
        description: "REST API endpoints for task operations",
        technology: "Express.js Router",
    });

    const taskBusinessLogic = frain.addComponent(taskService, {
        name: "Task Business Logic",
        description: "Core business rules for task management",
        technology: "TypeScript",
    });

    const taskRepository = frain.addComponent(taskService, {
        name: "Task Repository",
        description: "Data access layer for task persistence",
        technology: "Prisma ORM",
    });

    const taskValidator = frain.addComponent(taskService, {
        name: "Task Validator",
        description: "Input validation and sanitization for task data",
        technology: "Zod",
    });

    // Add components to Notification Service
    const notificationScheduler = frain.addComponent(notificationService, {
        name: "Notification Scheduler",
        description: "Schedules notifications based on task due dates",
        technology: "Bull Queue",
    });

    const emailSender = frain.addComponent(notificationService, {
        name: "Email Sender",
        description: "Sends email notifications to users",
        technology: "Nodemailer",
    });

    const pushNotifier = frain.addComponent(notificationService, {
        name: "Push Notifier",
        description: "Sends push notifications to mobile devices",
        technology: "Firebase Cloud Messaging",
    });

    // 4. DEFINE RELATIONS

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

    // Component-level relations (within Task Service)
    taskController.use(taskValidator, {
        description: "Validates input using",
        technology: "Method call",
    });

    taskController.use(taskBusinessLogic, {
        description: "Delegates to",
        technology: "Method call",
    });

    taskBusinessLogic.use(taskRepository, {
        description: "Persists data via",
        technology: "Method call",
    });

    taskBusinessLogic.use(notificationScheduler, {
        description: "Schedules reminders via",
        technology: "Message Queue",
    });

    // Component-level relations (within Notification Service)
    notificationScheduler.use(emailSender, {
        description: "Triggers",
        technology: "Event",
    });

    notificationScheduler.use(pushNotifier, {
        description: "Triggers",
        technology: "Event",
    });

    // Component to external system relations
    taskRepository.use(supabase, {
        description: "Stores task data in",
        technology: "PostgreSQL",
    });

    emailSender.use(resend, {
        description: "Sends emails via",
        technology: "HTTPS",
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

    // 5. DEFINE VIEWS (Presentation Layer)

    // Container View for Todo App (C4 Level 2)
    frain.createContainerView(todoApp, {
        title: "Todo App - Container Diagram",
        description:
            "Shows the internal structure of the Todo App system, including all containers and their interactions",
    });

    // Component View for Task Service (C4 Level 3)
    // Note: Not all containers need a component view - only those with significant internal structure
    frain.createComponentView(taskService, {
        title: "Task Service - Component Diagram",
        description:
            "Shows the internal components of the Task Service and how they collaborate to manage tasks",
    });

    // Component View for Notification Service (C4 Level 3)
    frain.createComponentView(notificationService, {
        title: "Notification Service - Component Diagram",
        description:
            "Shows how the Notification Service processes and sends reminders through different channels",
    });

    const payload = frain.build();
    console.log(JSON.stringify(payload, null, 2));
}

main();
