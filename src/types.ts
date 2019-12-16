export interface GenericObject {
  [key: string]: any;
}

export interface UseQueryParamsOptonsT<P> {
  urlUpdateType?: URLUpdateType,
  onQueryParamsChange?: onQueryChangeCallbackT<P> | NoOp,
}

export interface UseQueryParamsReturnT<P> {
  queryParams: P;
  updateQueryParams(params?: P): void;
}

export type UpdateQueryParams<P> = P;
export type URLUpdateType = "replace" | "push";
export type onQueryChangeCallbackT<P> = (queryparams: P) => void;
export type NoOp = () => void;