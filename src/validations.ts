import z from "zod";

export const frainConfigValidator = z.object({
  apiKey: z.uuidv4(),
  apiSecret: z.uuidv4(),
  workspaceId: z.uuidv4(),
});

export const elementValidator = z.object({
  name: z.string().min(1).max(100),
  description: z.string().min(1).max(100),
  technology: z.string().min(1).max(100),
});
