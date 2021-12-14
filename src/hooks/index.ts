/**
 * Hooks used throughout the app to simplify state management.
 * 
 * @module
 */

export { useAsyncExtendedState } from './useAsyncExtendedState'
export type { AsyncSetState, AsyncExtendState } from './useAsyncExtendedState'

export { useExtendedState } from './useExtendedState'
export type { SetState, ExtendState } from './useExtendedState'

export { usePromise } from './usePromise'
export type { PromiseStatus, CancelPromise, PromiseStateKeys, ResetPromiseState, PromiseState, StateWithReset } from './usePromise'
