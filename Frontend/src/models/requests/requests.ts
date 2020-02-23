import axios, { AxiosResponse } from "axios";

import HttpMethods from "models/requests/http";
import * as api from "models/requests/api";

/**
 * Generic request builder where:
 *
 * P defines request parameter type.
 *
 * B defines request body type.
 *
 * T defines return data type.
 */
class RequestBuilder<P, B, T> {
  private endpoint: string;

  private httpMethod: HttpMethods;

  private requestBody: B | undefined;

  private requestParams: P | undefined;

  private token: string | undefined;

  constructor() {
    this.endpoint = api.baseURL;
    this.httpMethod = HttpMethods.GET;
    this.requestBody = undefined;
    this.requestParams = undefined;
  }

  public setEndpoint(endpoint: string): RequestBuilder<P, B, T> {
    this.endpoint = endpoint;
    return this;
  }

  public setHttpMethod(method: HttpMethods): RequestBuilder<P, B, T> {
    this.httpMethod = method;
    return this;
  }

  public setAuthrorization(token: string): RequestBuilder<P, B, T> {
    this.token = token;
    return this;
  }

  public setRequestBody(body: B): RequestBuilder<P, B, T> {
    this.requestBody = body;
    return this;
  }

  public setRequestParams(params: P): RequestBuilder<P, B, T> {
    this.requestParams = params;
    return this;
  }

  public async build(): Promise<AxiosResponse<T>> {
    return axios.request<T>({
      url: this.endpoint,
      method: this.httpMethod,
      params: this.requestParams,
      data: this.requestBody,
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }
}

export default RequestBuilder;
