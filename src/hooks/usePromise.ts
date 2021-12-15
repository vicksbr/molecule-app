/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo, useEffect, useRef } from 'react'

export type PromiseStatus = `pending` | `resolved` | `rejected`
export type CancelPromise = () => void

export type PromiseStateKeys = `status` | `promise` | `value` | `error` | `cancel`
export type ResetPromiseState = (keys?: PromiseStateKeys[]) => void

export interface PromiseState<T> {
  status?: PromiseStatus
  promise?: Promise<T>
  value?: Awaited<T>
  error?: Error
  cancel?: CancelPromise
}

export type StateWithReset<T> = PromiseState<T> & { reset: ResetPromiseState }

/**
 * A hook which accepts an asynchronous function (i.e., a function which returns a promise).
 * 
 * Returns a new asynchronous function wrapping the original to be called as necessary,
 * along with the state of the promise as `status`, `promise`, `value`, `error`, `cancel()`,
 * and a `reset()` method to reset the state.
 * 
 * Pairs well with the {@link hooks.useAsyncExtendedState | `useAsyncExtendedState`} hook.
 * 
 * Example:
 * ```ts
 * interface State {
 *   foo: string
 *   bar: string
 * }
 * 
 * const [ state, setState, extendState ] = useAsyncExtendedState<State>({
 *   foo: 'foo',
 *   bar: 'bar'
 * })
 * 
 * const read = (id: string) => API.client.get(`data/${id}`).then(response => {
 *   return response.data as Partial<State>
 * })
 * 
 * const [ readRequest, requestRead ] = usePromise(read)
 * 
 * const isPending = readRequest.status === 'pending'
 * 
 * return (
 *   <>
 *     <div>
 *       foo: {state.foo}
 *     </div>
 * 
 *     <div>
 *       bar: {state.bar}
 *     </div>
 * 
 *     <UI.Button onClick={() => extendState(requestRead('someId'))} disabled={isPending}>
 *       <span>
 *         {isPending
 *           ? 'Requesting data...'
 *           : 'Request data'
 *         }
 *       </span>
 *     </UI.Button>
 * 
 *     <UI.Error>
 *       {readRequest.error}
 *     </UI.Error>
 *   </>
 * )
 * ```
 */
export const usePromise = <T extends (...args: any[]) => any>(asyncFunction: T): [ StateWithReset<ReturnType<T>>, (...asyncFuncArgs: Parameters<T>) => ReturnType<T> ] => {
  const [ state, setState ] = useState<PromiseState<ReturnType<T>>>({})
  const isCancelled = useRef(false)
  const isUnmounted = useRef(false)

  const callAsyncFunction = useMemo(<T extends (...args: any[]) => any>() => (...args: Parameters<T>): ReturnType<T> => {
    const promise = asyncFunction(...args)
    const cancel: CancelPromise = (message = `Cancelled.`) => {
      isCancelled.current = true

      if (!isUnmounted.current) {
        setState(({ value }) => ({ status: `rejected`, value, error: message ? new Error(message) : undefined }))
      }
    }

    isCancelled.current = false

    if (promise instanceof Promise) {
      const fulfillPromise = async () => {
        try {
          const value: Awaited<ReturnType<T>> = await promise

          if (!isCancelled.current && !isUnmounted.current) {
            setState({ status: `resolved`, value })
          }
        } catch (error) {
          if (!isCancelled.current && !isUnmounted.current) {
            setState(({ value }) => ({ status: `rejected`, value, error: error instanceof Error ? error : new Error(error as string) }))
          }
        }
      }

      setState(({ value }) => ({ status: `pending`, value, promise, cancel }))
      fulfillPromise()
    } else {
      setState({ status: `resolved`, value: promise })
    }

    return promise
  }, [ asyncFunction ])

  const reset: ResetPromiseState = useMemo(() => keys => setState(state => {
    if (!keys) {
      return {}
    }

    const nextState = { ...state }

    if (keys) {
      for (const key of keys) {
        delete nextState[key]
      }
    }

    return nextState
  }), [])

  const stateWithReset: StateWithReset<ReturnType<T>> = useMemo(() => ({ ...state, reset }), [ state, reset ])

  useEffect(() => {
    return () => {
      isCancelled.current = true
      isUnmounted.current = true
    }
  }, [])

  return [ stateWithReset, callAsyncFunction ]
}
