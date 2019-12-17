import { useEffect, useState } from 'react'
import { parse, stringify } from 'qs'
import * as History from 'history'

// Type Deps
import {
  UseQueryParamsOptonsT,
  GenericObject,
  UseQueryParamsReturnT,
  UpdateQueryParams
} from './types'

const history = History.createBrowserHistory()

/**
 * Use Query Params
 * stores current querystring, queryParams object containing key,value pairs
 * @param options default key, value object of params to set if querystring doesn't already exist
 * @return {Object}
 */
function useQueryParams<
  P = GenericObject
>(
  defaultParams: P,
  options: UseQueryParamsOptonsT<P> = {},
): UseQueryParamsReturnT<P> {
  const [queryParams, setQueryParams] = useState<P>(
    parse(
      buildDefaultQueryString<P>(defaultParams)
    )
  )

  useEffect(() => {
    const { urlUpdateType = "push", onQueryParamsChange = () => {} } = options;
    switch(urlUpdateType) {
      case 'replace':
        history.replace(`${window.location.pathname}?${stringify(queryParams)}`)
        break;
      case 'push':
        history.push(`${window.location.pathname}?${stringify(queryParams)}`)
        break;
      default:
        break;
    }
    onQueryParamsChange(queryParams)
  }, [queryParams, JSON.stringify(options)])

  function updateQueryParams(params?: P): void {
    if(stringify(queryParams) === stringify(params)) { return }

    if(params && Object.keys(params).length > 0) {
      setQueryParams(
        mergeQueryParams<P>(queryParams, params)
      )
    } else if (!params) {
      setQueryParams(
        mergeQueryParams<any>(defaultParams, {})
      )
    } else {
      setQueryParams(
        mergeQueryParams<any>({}, {})
      )
    }
  }

  return { queryParams, updateQueryParams }
}

/**
 * Build Default Query String
 * Checks for initialized querystring, fallsback to defaultparams
 * @param defaultParams object containing { paramName: paramValue }
 * @return {String} default query string to set in url
 */
function buildDefaultQueryString<
  P = GenericObject
>(
  defaultParams?: Partial<P>
): string {
  const qp = parse(window.location.search, { ignoreQueryPrefix: true, plainObjects: true })
  if (Object.keys(qp).length > 0) {
    return stringify(qp)
  } else {
    return stringify(defaultParams ? defaultParams : {})
  }
}

/**
 * Merge Query Params
 * Merges previous query params with updated query params
 * @param currentParams 
 * @param params 
 * @return {Object}
 */
function mergeQueryParams<
  P = GenericObject
>(
  currentParams: any,
  params: UpdateQueryParams<P>
): P {
  return parse({
    ...currentParams,
    ...params
  })
}

export { useQueryParams }