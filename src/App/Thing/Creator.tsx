import React from 'react'
import styled from 'styled-components'
import * as UI from '../../UI'
import { useAsyncExtendedState, usePromise } from '../../hooks'
import { create as createThing } from '../../API/resource/thing'
import { types } from '../../API/resource/thing'
import { Store } from '../Store/types'

export type CreatorProps = React.HTMLProps<HTMLDivElement> & {
  store: Store
  autoFocus?: boolean
  onCreated?: (props: Partial<types.Props>) => void
}

/**
 * Update thing properties or delete the thing.
 */
export const Creator = styled(({ store, autoFocus = true, onCreated, ...props }: CreatorProps) => {
  const [ state, setState, extendState ] = useAsyncExtendedState<types.CreateProps>({
    description: ``
  })

  const [ createThingRequest, requestCreateThing ] = usePromise(() => createThing(state).then(response => response.data.props).then(props => {
    // Reset the message state upon successful creation.
    setState({
      description: ``
    })

    if (onCreated) {
      onCreated(props)
    }

    return props
  }))

  if (createThingRequest.status === `pending`) {
    return (
      <div { ...props }>
        <p style={{ fontSize: 20 }}>
          Creating...
        </p>

        <UI.Spinner />
      </div>
    )
  }

  return (
    <div { ...props }>
      <UI.Textarea
        key='text'
        name='text'
        placeholder='Enter a description'
        value={state.description}
        autoFocus={autoFocus}
        onInput={event => {
          extendState({ description: event.currentTarget.value })
        }}
      />

      <UI.Button
        key='createThing'
        type='submit'
        backgroundColor='green'
        onClick={() => {
          requestCreateThing()
        }}
      >
        <span>
          Create thing
        </span>
      </UI.Button>

      <UI.Error>
        {createThingRequest.error}
      </UI.Error>
    </div>
  )
})`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  min-height: 205px;
  text-align: center;
  padding-bottom: 45px;

  > ${UI.Textarea} {
    width: 400px;
    max-width: 100%;
    margin: 15px auto;
    text-align: left;
  }

  > input[type='file'] {
    width: 100%;
    margin: 0 auto 15px;
    cursor: pointer;
  }

  > ${UI.Button} {
    width: 400px;
    max-width: 100%;
    margin: 0 auto;
  }

  > ${UI.Error} {
    margin: 15px auto;
  }
`
