// deno-lint-ignore-file require-await
// import retrofit from "ts-retrofit";
import ky, { ResponsePromise } from "ky";
import { encode as encodeBase64 } from "std_base64";
import { Project } from "./types/Project.ts";
import { Environment } from "./types/Environment.ts";

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

  async getProjects() {
    const req = this.http.get(`projects`);
    return req;
  }

  async getEnvironments(project: string) {
    return this.http.get(`environments`, { searchParams: { project } });
  }

  async getConfigs(project: string) {
    return this.http.get(`configs`, { searchParams: { project } }).json();
  }
}
