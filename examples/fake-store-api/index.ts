import { Frain } from "../../src/frain";

// Env variables
const ENVIRONMENT_CONFIG = {
  apiKey: "your_api_key_here",
  apiSecret: "your_api_secret_here",
  workspaceId: "your_workspace_id_here",
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
  
  
}

main();
