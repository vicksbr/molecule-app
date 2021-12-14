import { useState, useMemo, SetStateAction } from 'react'

export type SetState<State> = (extendState: SetStateAction<State>) => void
export type ExtendState<State> = (extendState: Partial<State> | ((state: State) => Partial<State>)) => void

/**
 * Same as React's `useState` with an extra method which extends the current state.
 * 
 * Example:
 * ```ts
 * interface State {
 *   foo: string
 *   bar: string
 * }
 * 
 * const [ state, setState, extendState ] = useExtendedState<State>({
 *   foo: 'foo',
 *   bar: 'bar'
 * })
 * 
 * // This works as usual.
 * setState({ foo: 'Hello', bar: 'World!' })
 * setState(state => ({ foo: state.foo.toUpperCase(), bar: state.bar.toUpperCase() }))
 * 
 * // Or extend the state.
 * extendState({ foo: 'Hello' })
 * extendState(state => ({ foo: state.foo.toUpperCase() }))
 * ```
 */
export const useExtendedState = <State>(initialState: State): [ State, SetState<State>, ExtendState<State> ] => {
  const [ state, setState ] = useState<State>(initialState)

  const extendState: ExtendState<State> = useMemo(() => extendState => {
    setState(state => {
      if (typeof extendState === `function`) {
        extendState = extendState(state)
      }

      return { ...state, ...extendState }
    })
  }, [])

  return [ state, setState, extendState ]
}
