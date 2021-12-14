/**
 * Global type definitions.
 * 
 * @module
 */

/**
 * The network connection type.
 */
export type ConnectionType = `bluetooth`
  | `cellular`
  | `ethernet`
  | `mixed`
  | `none`
  | `other`
  | `unknown`
  | `wifi`

declare global {
  /**
   * Useful when specifying that some type is a JSON value. 
   */
  export type JSONValue = string | number | boolean | JSONObject | JSONArray | null | undefined

  /**
   * Useful when specifying that some type is a JSON object. 
   */
  export interface JSONObject {
    [key: string]: JSONValue
  }

  /**
   * Useful when specifying that some type is a JSON array. 
   */
  export type JSONArray = Array<JSONValue>

  /**
   * We use `NetworkInformation` as `navigator.connection`, if available.
   * 
   * @see https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation
   */
  export interface NetworkInformation {
    /**
     * The effective bandwidth estimate in megabits per second, rounded to the nearest multiple of 25 kilobits per seconds.
     */
    downlink?: number
    /**
     * The maximum downlink speed, in megabits per second (Mbps), for the underlying connection technology.
     */
    downlinkMax?: number
    /**
     * The effective type of the connection, determined using a combination of recently observed round-trip time and downlink values.
     */
    effectiveType?: `slow-2g`
      | `2g`
      | `3g`
      | `4g`
    /**
     * The estimated effective round-trip time of the current connection, rounded to the nearest multiple of 25 milliseconds.
     */
    rtt?: number
    /**
     * This will be `true` if the user has set a reduced data usage option on the user agent.
     */
    saveData?: boolean
    /**
     * The type of connection a device is using to communicate with the network.
     */
    readonly type: ConnectionType

    addEventListener?: (type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean) => void
    removeEventListener?: (type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean) => void
  }

  export interface Navigator {
    /**
     * We use `navigator.connection`, if available.
     * 
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Navigator/connection
     */
    connection?: NetworkInformation
  }
}

export {}
