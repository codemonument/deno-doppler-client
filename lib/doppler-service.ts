// deno-lint-ignore-file require-await
// import retrofit from "ts-retrofit";
import {
  BasePath,
  BaseService,
  GET,
  Query,
  Response,
  ServiceBuilder,
} from "npm:ts-retrofit@1.18.0";
import { Project } from "./types/Project.ts";
import { Environment } from "./types/Environment.ts";

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

  @GET("/environments")
  async getEnvironments(
    @Query("project") project: string,
  ): Promise<Response<Environment[]>> {
    return <Response<Environment[]>> {};
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
