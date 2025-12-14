import z from "zod";

export const frainConfigValidator = z.object({
  apiKey: z.uuidv4(),
  apiSecret: z.uuidv4(),
  workspaceId: z.uuidv4(),
});
