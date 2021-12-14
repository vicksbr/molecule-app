import React, { useEffect } from 'react'
import { Default, DefaultProps } from './Default'
import * as Thing from '../Thing'
import * as UI from '../../UI'
import { usePromise } from '../../hooks/usePromise'
import { query as queryThings } from '../../API/resource/thing'
import { Store } from '../Store/types'

export type ThingsProps = DefaultProps

/**
 * Say hello to the user and render the thing creator.
 */
export const Things = ({ store, match, ...props }: ThingsProps): React.ReactElement => {
  const [ queryThingsRequest, requestQueryThings ] = usePromise(() => queryThings().then(response => response.data))
  const things = queryThingsRequest.value

  useEffect(() => {
    if (store.status === `ready`) {
      // Query user's things once store is ready.
      if (!queryThingsRequest.status) {
        requestQueryThings()
      }
    } else if (queryThingsRequest.value) {
      // Reset things if logged out.
      queryThingsRequest.reset()
    }
  }, [ store.status, queryThingsRequest, requestQueryThings ])

  return (
    <Default store={store} match={match} { ...props }>
      <h2 style={{ textAlign: `center` }}>
        {`Hello!`}
      </h2>

      <Thing.Creator store={store} onCreated={requestQueryThings} />

      {queryThingsRequest.status === `pending` && (
        <UI.Spinner title='Fetching things...' />
      )}

      <UI.Error style={{ textAlign: `center` }}>
        {queryThingsRequest.error}
      </UI.Error>

      <Thing.List store={store} things={things} />
    </Default>
  )
}
