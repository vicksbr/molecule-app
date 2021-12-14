import { renderHook, act } from '@testing-library/react-hooks'
import { useExtendedState } from '../useExtendedState'

interface State {
  foo: string
  bar: string
}

it(`sets and extends the state`, () => {
  const { result } = renderHook(() => useExtendedState<State>({
    foo: `foo`,
    bar: `bar`
  }))

  let state = result.current[0]
  const setState = result.current[1]
  const extendState = result.current[2]

  // confirm initial state
  expect(state).toMatchObject({
    foo: `foo`,
    bar: `bar`
  })

  // set the state
  act(() => {
    setState({ foo: 'Hello', bar: 'World!' })
  })

  // confirm the state was set
  state = result.current[0]
  expect(state).toMatchObject({
    foo: `Hello`,
    bar: `World!`
  })

  // set the state as a function of previous state
  act(() => {
    setState(state => ({ foo: state.foo.toUpperCase(), bar: state.bar.toUpperCase() }))
  })

  // confirm the state was set
  state = result.current[0]
  expect(state).toMatchObject({
    foo: `HELLO`,
    bar: `WORLD!`
  })

  // extend the state
  act(() => {
    extendState({ foo: 'Hello' })
  })

  // confirm the state was extended
  state = result.current[0]
  expect(state).toMatchObject({
    foo: `Hello`,
    bar: `WORLD!`
  })

  // extend the state as a function of previous state
  act(() => {
    extendState(state => ({ foo: state.foo.toUpperCase() }))
  })

  // confirm the state was extended
  state = result.current[0]
  expect(state).toMatchObject({
    foo: `HELLO`,
    bar: `WORLD!`
  })
})
