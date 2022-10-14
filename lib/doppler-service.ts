// deno-lint-ignore-file require-await
import {
  BasePath,
  BaseService,
  Config,
  GET,
  POST,
  Response,
  ServiceBuilder,
} from "ts-retrofit";
import { Project } from "./types/project.ts";

export type DopplerServiceOptions = {
  token: string;
};

export const BASE_URL = "https://api.doppler.com";

@BasePath("/v3")
export class DopplerService extends BaseService {
  @GET("/projects")
  async getProjects(): Promise<Response<Project[]>> {
    return <Response<Project[]>> {};
  }

  /**
   * @param token The token used for authenticating against doppler => https://docs.doppler.com/reference/auth-token-formats
   * @returns DopplerService
   */
  static create({ token }: DopplerServiceOptions) {
    const dopplerInstance = new ServiceBuilder()
      .setEndpoint(BASE_URL)
      .setStandalone(true)
      .setRequestInterceptors((config) => {
        config.auth = {
          username: token,
          password: "",
        };
        return config;
      })
      // .setResponseInterceptors(ResponseInterceptor)
      .build(DopplerService);

    return dopplerInstance;
  }
}
