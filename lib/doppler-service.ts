// deno-lint-ignore-file require-await
// import retrofit from "ts-retrofit";
import axios from "redaxios";
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
    this.http = axios.create({
      baseURL: BASE_URL,
      // auth: encodeBase64(`${token}:dummy_password`),
      auth: encodeBase64(`${token}:dummy_password`),
    });
  }

  async getProjects() {
    return this.http.get(`/projects`);
  }

  async getEnvironments(project: string) {
    return this.http.get(`/environments`, { params: { project } });
  }
}
