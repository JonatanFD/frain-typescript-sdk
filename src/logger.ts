import pino, { type LoggerOptions } from "pino";

const isProduction = process.env.NODE_ENV === "production";

const level =
    process.env.FRAIN_LOG_LEVEL ??
    (isProduction ? "info" : "debug");

const defaultOptions: LoggerOptions = {
    level,
    timestamp: pino.stdTimeFunctions.isoTime,
    base: isProduction
        ? undefined
        : {
              environment: process.env.NODE_ENV ?? "development",
          },
};

export const logger = pino(defaultOptions);

export function createScopedLogger(scope: string) {
    return logger.child({ scope });
}
