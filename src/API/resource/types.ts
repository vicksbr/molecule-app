/**
 * Resource type definitions.
 * 
 * @module
 */

/**
 * The resource's properties.
 */
export interface Props {
  /**
   * Usually a UUID.
   */
  id: string
  /**
   * When the resource was created.
   * 
   * Usually an ISO 8601 timestamp.
   */
  createdAt: string
  /**
   * When the resource was last updated.
   * 
   * Usually an ISO 8601 timestamp.
   */
  updatedAt: string
}

/**
 * The state of a resource within components can be either `null` or `Props`.
 */
export type State<P extends Props = Props> = null | P

/**
 * The successful resource response.
 */
export interface SuccessResponse<P extends Props = Props> {
  /**
   * HTTP status code.
   */
  statusCode: 200 | 201
  /**
   * The response body.
   */
  data: {
    /**
     * The resource's props.
     */
    props: P
  }
}

/**
 * The successful resource response returning partial props.
 */
export interface SuccessPartialResponse<P extends Props = Props> {
  /**
   * HTTP status code.
   */
  statusCode: 200 | 201
  /**
   * The response body.
   */
  data: {
    /**
     * The resource's partial props.
     */
    props: Partial<P>
  }
}

/**
 * Options used when querying resources.
 */
export interface QueryOptions {
  /**
   * Usually derived from a URL like '/messages?before[updatedAt]=2021-01-01T00:00:00.000Z'.
   */
  before: {
    createdAt?: string
    updatedAt?: string
  }
  /**
   * Usually derived from a URL like '/messages?after[updatedAt]=2021-01-01T00:00:00.000Z'.
   */
  after: {
    createdAt?: string
    updatedAt?: string
  }
  /**
   * You should limit this to indexed property keys.
   * 
   * Usually derived from a URL like '/messages?orderBy=updatedAt'.
   * 
   * @default updatedAt
   */
  orderBy: `createdAt` | `updatedAt`
  /**
   * Usually derived from a URL like '/messages?orderDirection=updatedAt'.
   * 
   * @default desc
   */
  orderDirection: 'desc' | 'asc'
  /**
   * Usually derived from a URL like '/messages?limit=100'.
   * 
   * @default 100
   */
  limit: number
}

/**
 * The response when querying resources.
 */
export interface QueryResponse<P extends Props = Props> {
  /**
   * HTTP status code.
   */
  statusCode: 200
  /**
   * The response body containing the query results.
   */
  data: P[]
}

/**
 * Generic response with an optional body.
 */
export interface GenericResponse {
  /**
   * HTTP status code.
   */
  statusCode: number
  /**
   * The optional response body.
   */
  data?: JSONValue
}

/**
 * The response containing a message.
 */
export interface MessageResponse {
  /**
   * HTTP status code.
   */
  statusCode: number
  /**
   * The response body.
   */
  data: {
    /**
     * The message.
     */
    message: string
  }
}

/**
 * The response when a generic error has occurred when handling a resource request.
 */
export interface ErrorResponse {
  /**
   * HTTP status code.
   */
  statusCode: number
  /**
   * The response body containing an error message.
   */
  data: { error: string }
}

/**
 * When properties fail validation, the API may return a map of property keys to error messages describing what's wrong.
 */
export type PropErrors<P extends Props = Props> = {
  [K in keyof P]?: Error | string;
}

/**
 * The response when a resource failed prop validation.
 */
export interface PropErrorsResponse<P extends Props = Props> {
  /**
   * HTTP status code.
   */
  statusCode: 400 | 403
  /**
   * The response body containing a map of property keys to error messages describing what's wrong.
   */
  data: { errors: PropErrors<P> }
}
