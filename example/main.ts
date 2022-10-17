import { DopplerService } from "@/mod.ts";
import { DOPPLER_TOKEN } from "@/env.ts";
import { log } from "@/deps/std_log.ts";
import { VERSION } from "@/version.ts";

try {
  log.info(`Module Version (version.ts): ${VERSION}`);

  const doppler = new DopplerService({ token: DOPPLER_TOKEN });

  const configs = await doppler.getConfigs("deno-doppler-client");
  console.log(configs);

  const secrets = await doppler.getSecrets("deno-doppler-client", "dev");
  console.log(secrets);

  const secret = await doppler.getSecret(
    "deno-doppler-client",
    "dev",
    "DEMO_SECRET",
  );
  console.log(secret);
} catch (error) {
  console.error(error);
  Deno.exit();
}
