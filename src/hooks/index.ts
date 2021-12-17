/**
 * Hooks used throughout the app to simplify state management.
 * 
 * @module
 */

export { useAsyncExtendedState } from './useAsyncExtendedState'
export type { AsyncSetState, AsyncExtendState } from './useAsyncExtendedState'

export { usePromise } from './usePromise'
export type { PromiseStatus, CancelPromise, ResetPromiseState, PromiseState, PromiseStateWithReset } from './usePromise'
