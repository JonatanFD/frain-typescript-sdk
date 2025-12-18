import z from "zod";
import { ElementShape } from "./types";

// Hex color validator - matches #RRGGBB or #RRGGBBAA format
const hexColorValidator = z
  .string()
  .regex(/^#[0-9a-fA-F]{6}$/, "Must be a valid hex color in format #RRGGBB")
  .toLowerCase();

export const frainConfigValidator = z.object({
  apiKey: z.uuidv4(),
  apiSecret: z.uuidv4(),
  workspaceId: z.uuidv4(),
});

export const elementValidator = z.object({
  name: z.string().min(1).max(100),
  description: z.string().min(1).max(100),
  technology: z.string().min(1).max(100).optional(),
});

export const elementWithTechnologyValidator = z.object({
  name: z.string().min(1).max(100),
  description: z.string().min(1).max(100),
  technology: z.string().min(1).max(100),
});

export const stylesConfigValidator = z.object({
  shape: z.enum(ElementShape),
  color: hexColorValidator,
  backgroundColor: hexColorValidator,
});

export type StylesConfig = z.infer<typeof stylesConfigValidator>;
