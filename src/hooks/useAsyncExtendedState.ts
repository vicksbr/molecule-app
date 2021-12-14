import { useState, useMemo, SetStateAction } from 'react'

export type AsyncSetState<State> = (nextState: SetStateAction<State> | Promise<SetStateAction<State>>) => void

export type AsyncExtendState<State> = (extendState: SetStateAction<Partial<State>> | Promise<SetStateAction<Partial<State>>>) => void

/**
 * A hook similar to React's `useState` which allows you to also pass promises which resolve to the next state.
 * 
 * Also returns an extra method which extends the current state, synchronously and/or asynchronously.
 * For the current state to be extended, it must first be a non-null value.
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
 * // This works as usual.
 * setState({ foo: 'Hello', bar: 'World!' })
 * setState(state => ({ foo: 'Hello', bar: 'World!' }))
 * 
 * // This also works.
 * const fetchState = async (): Promise<State> => {
 *   const response = await API.client.get('data')
 *   const { foo, bar } = response.data as State
 *   const nextState = { foo, bar }
 * 
 *   return nextState
 * 
 *   // or return (state: State) => {
 *     // logger.info({ state, nextState })
 *     // return nextState
 *   // }
 * }
 * 
 * // The state will eventually be set to the asynchronously resolved value.
 * setState(fetchState())
 * 
 * // Or extend the state immediately.
 * extendState({ foo: 'Hello' })
 * extendState(state => ({ bar: 'World!' }))
 * 
 * // Or extend the state asynchronously.
 * const fetchPartialState = async (): Promise<Partial<State>> => {
 *   const response = await API.client.get('data')
 *   const partialState = response.data as Partial<State>
 * 
 *   return partialState
 * 
 *   // or return (state: State) => {
 *     // logger.info({ state, partialState })
 *     // return partialState
 *   // }
 * }
 * 
 * // The state will eventually be extended by the asynchronously resolved value.
 * extendState(fetchPartialState())
 * ```
 */
export const useAsyncExtendedState = <State>(initialState: State | null): [ State | null, AsyncSetState<State | null>, AsyncExtendState<State | null> ] => {
  const [ state, setState ] = useState<State | null>(initialState)

  const asyncSetState: AsyncSetState<State | null> = useMemo(() => async nextState => {
    try {
      if (nextState instanceof Promise) {
        nextState = await nextState
      }

      setState(state => {
        if (typeof nextState === `function`) {
          nextState = (nextState as ((state: State | null) => State | null))(state)
        }

        return nextState as State | null
      })
    } catch (error) {
      setState(null)
    }
  }, [])

  const asyncExtendState: AsyncExtendState<State | null> = useMemo(() => async extendState => {
    try {
      if (extendState instanceof Promise) {
        extendState = await extendState
      }
    } catch (error) {
    }

    if (extendState) {
      setState(state => {
        if (typeof extendState === `function`) {
          extendState = (extendState as ((state: State | null) => Partial<State> | null))(state)
        }

        return state && ({ ...state, ...extendState }) as State | null
      })
    }
  }, [])

  return [ state, asyncSetState, asyncExtendState ]
}
