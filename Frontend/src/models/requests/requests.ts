import * as api from "models/requests/api";
import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

/**
 * Defines an axios method for http requests (ie. get, post, put, delete).
 * Define T to be the return data type of the axios request.
 */
type AxiosMethod<T> = <T, R = AxiosResponse<T>>(
  url: string,
  config?: AxiosRequestConfig | undefined
) => Promise<R>;

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

  private httpMethod: AxiosMethod<T>;

  private requestBody: B | undefined;

  private requestParams: P | undefined;

  private token: string | undefined;

  constructor() {
    this.endpoint = api.baseURL;
    this.httpMethod = axios.get;
    this.requestBody = undefined;
    this.requestParams = undefined;
  }

  public setEndpoint(endpoint: string): RequestBuilder<P, B, T> {
    this.endpoint = endpoint;
    return this;
  }

  public setHttpMethod(method: AxiosMethod<T>): RequestBuilder<P, B, T> {
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

  /**
   * If request params are defined then use it, else default to request body.
   */
  public build(): Promise<AxiosResponse<T>> {
    if (this.requestParams) {
      return this.httpMethod<T>(this.endpoint, {
        params: this.requestParams
      });
    }
    return this.httpMethod<T>(this.endpoint, this.requestBody);
  }
}

export default RequestBuilder;
