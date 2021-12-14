/**
 * Thing type definitions.
 * 
 * @module
 */

import * as resourceTypes from '../types'

/**
 * The thing's properties returned by the API.
 */
export interface Props extends resourceTypes.Props {
  /**
   * The thing description.
   */
  description?: string
}

/**
 * The properties sent when creating a thing. 
 */
export interface CreateProps {
  description?: Props['description']
}

/**
 * The properties sent when updating a thing. 
 */
export interface UpdateProps {
  description?: Props['description']
}

/**
 * The successful thing resource response.
 */
export type SuccessResponse<P extends Props = Props> = resourceTypes.SuccessResponse<P>

/**
 * The successful thing resource response returning partial props.
 */
export type SuccessPartialResponse<P extends Props = Props> = resourceTypes.SuccessPartialResponse<P>

/**
 * The response when querying things.
 */
export type QueryResponse<P extends Props = Props> = resourceTypes.QueryResponse<P>

/**
 * Generic response with an optional body.
 */
export type GenericResponse = resourceTypes.GenericResponse

/**
 * The response containing a message.
 */
export type MessageResponse = resourceTypes.MessageResponse

/**
 * The response when a generic error has occurred when handling a thing resource request.
 */
export type ErrorResponse = resourceTypes.ErrorResponse

/**
 * When properties fail validation, the API may return a map of property keys to error messages describing what's wrong.
 */
export type PropErrors<P extends Props = Props> = resourceTypes.PropErrors<P>

/**
 * The response when a thing failed prop validation.
 */
export type PropErrorsResponse<P extends Props = Props> = resourceTypes.PropErrorsResponse<P>
