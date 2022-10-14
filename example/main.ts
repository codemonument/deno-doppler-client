import { DopplerService } from "@/mod.ts";
import { DOPPLER_TOKEN } from "@/env.ts";
import { log } from "std_log";
import { VERSION } from "@/version.ts";

try {
  log.info(`Module Version (version.ts): ${VERSION}`);

  const service = DopplerService.create({ token: DOPPLER_TOKEN });
  const projects = await service.getProjects();

  console.log(projects);
} catch (error) {
  console.error(error);
  Deno.exit();
}
