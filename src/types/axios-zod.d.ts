import type { ZodTypeAny } from "zod";

declare module "axios" {
  export interface AxiosRequestConfig<D = any> {
    schema?: ZodTypeAny;
  }

  export interface InternalAxiosRequestConfig<D = any> {
    retry?: boolean;
  }
}