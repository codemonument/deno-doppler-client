// deno-lint-ignore-file require-await
// import retrofit from "ts-retrofit";
import ky from "../deps/ky.ts";
import { encode as encodeBase64 } from "../deps/std_base64.ts";
import { Secret } from "../mod.ts";
import { Config } from "./types/Config.ts";
import { DopplerResponse } from "./types/DopplerResponse.ts";

export type DopplerServiceOptions = {
  token: string;
};

export const BASE_URL = "https://api.doppler.com/v3";

export class DopplerService {
  private http;

  constructor({ token }: DopplerServiceOptions) {
    this.http = ky.create({
      prefixUrl: BASE_URL,
      headers: {
        "Authorization": `Basic ${encodeBase64(`${token}:dummy_password`)}`,
      },
    });
  }

  // Deactivated, due to not usable with Service Token
  // async getProjects() {
  //   const req = this.http.get(`projects`);
  //   return req;
  // }

  // Deactivated, due to not usable with Service Token
  // async getEnvironments(project: string) {
  //   return this.http.get(`environments`, { searchParams: { project } });
  // }

  async getConfigs(
    project: string,
  ): Promise<DopplerResponse & { configs: Config[] }> {
    return this.http.get(`configs`, { searchParams: { project } }).json();
  }

  async getSecrets(
    project: string,
    config: string,
  ): Promise<DopplerResponse & { secrets: Record<string, Secret> }> {
    return this.http.get(`configs/config/secrets`, {
      searchParams: { project, config },
    }).json();
  }

  /**
   * This is a shortcut function to `getSecrets`, which converts the
   * nested secret objects, like `DOPPLER_CONFIG: { raw: "", computed: "dev" },`
   * into a flat Map<string, string>.
   *
   * Raw values will be added as "original key + '_RAW'" entries,
   * and computed values will be added with the original key as name
   */
  async getSecretsMap(
    project: string,
    config: string,
  ): Promise<Map<string, string>> {
    const { secrets } = await this.getSecrets(project, config);
    const secretsMap: Map<string, string> = new Map();
    Object.entries(secrets).forEach(
      ([key, val]: [string, Secret]) => {
        secretsMap.set(`${key}`, val.computed);
        secretsMap.set(`${key}_RAW`, val.raw);
      },
    );
    return secretsMap;
  }

  /**
   * Simply an alias for DopplerService.retrieveSecret
   */
  async getSecret(
    project: string,
    config: string,
    secret: string,
  ): Promise<DopplerResponse & { value: Secret }> {
    return this.retrieveSecret(project, config, secret);
  }

  async retrieveSecret(
    project: string,
    config: string,
    secret: string,
  ): Promise<DopplerResponse & { value: Secret }> {
    return this.http.get(`configs/config/secret`, {
      searchParams: { project, config, name: secret },
    }).json();
  }
}
