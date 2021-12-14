/**
 * The thing API resource.
 * 
 * @module
 */

import { client } from '../../client'
import * as types from './types'

export * as types from './types'

export const query = (): Promise<types.QueryResponse> => (
  client.get(`things`)
)

export const create = (props: types.CreateProps): Promise<types.SuccessResponse> => (
  client.post(`things`, props)
)

export const read = (id: string): Promise<types.SuccessResponse> => (
  client.get(`things/${id}`)
)

export const update = (id: string, props: types.UpdateProps): Promise<types.SuccessPartialResponse> => (
  client.patch(`things/${id}`, props)
)

export const del = (id: string): Promise<types.SuccessPartialResponse> => (
  client.delete(`things/${id}`)
)
