import React from 'react'
import { render } from '@testing-library/react'
import { App } from '../../App'
import { Things, ThingsProps } from '../Things'

it('renders', () => {
  render(
    <App>
      {(store: ThingsProps['store']) => (
        <Things store={store} />
      )}
    </App>
  )
})
