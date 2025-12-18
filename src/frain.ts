import { Context } from "./context";
import type { FrainConfig } from "./types";
import { frainConfigValidator } from "./validations";

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
}
