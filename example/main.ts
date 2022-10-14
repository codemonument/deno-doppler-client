import { DopplerService } from "@/mod.ts";
import { DOPPLER_TOKEN } from "@/env.ts";
import { log } from "std_log";
import { VERSION } from "@/version.ts";

try {
  log.info(`Module Version (version.ts): ${VERSION}`);

  const doppler = new DopplerService({ token: DOPPLER_TOKEN });

  const res = await doppler.getEnvironments("deno-doppler-client");
  console.log(res);
} catch (error) {
  console.error(error);
  Deno.exit();
}
