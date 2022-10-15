import { assert, assertSnapshot, describe, it } from "@/deps/std_testing.ts";
import { DopplerService } from "@/mod.ts";
import { DOPPLER_TOKEN } from "@/env.ts";

const doppler = new DopplerService({ token: DOPPLER_TOKEN });

describe(`DopplerService`, () => {
  it(`reads configs (per environment)`, async (ctx) => {
    const response = await doppler.getConfigs("deno-doppler-client");
    assert(response.success);

    // remove timestamps which change between test runs
    const sanitizedConfig = {
      success: response.success,
      page: response.page,
      configs: response.configs.map((config) => {
        const { last_fetch_at, ...rest } = config;
        return rest;
      }),
    };

    await assertSnapshot(ctx, sanitizedConfig);
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
