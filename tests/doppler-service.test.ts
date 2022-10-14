import { assertSnapshot, describe, it } from "std_testing";
import { DopplerService } from "@/mod.ts";
import { DOPPLER_TOKEN } from "@/env.ts";

const doppler = new DopplerService({ token: DOPPLER_TOKEN });

describe(`DopplerService`, () => {
  it(`reads configs (per environment)`, async (ctx) => {
    const configs = await doppler.getConfigs("deno-doppler-client");
    await assertSnapshot(ctx, configs);
  });

  it(`reads secrets from one config`, async (ctx) => {
    const secrets = await doppler.getSecrets("deno-doppler-client", "dev");
    await assertSnapshot(ctx, secrets);
  });

  it(`reads one secret from one config`, async (ctx) => {
    const secret = await doppler.retrieveSecret(
      "deno-doppler-client",
      "dev",
      "DEMO_SECRET",
    );
    await assertSnapshot(ctx, secret);
  });
});
