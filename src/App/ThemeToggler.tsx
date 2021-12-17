import React from 'react'
import styled from 'styled-components'
import { SunIcon, MoonIcon } from '@primer/octicons-react'
import { Store } from './Store/types'
import * as UI from '../UI'
import * as themes from '../themes'

export type ThemeTogglerProps = React.HTMLProps<HTMLDivElement> & {
  store: Store
}

/**
 * An icon which toggles the theme.
 * 
 * Updated as necessary for your specific Molecule.
 */
export const ThemeToggler = styled(({ store, ...props }: ThemeTogglerProps) => (
  <div { ...props }>
    {store.theme === themes.light ? (
      <UI.Button
        color='grayText'
        backgroundColor='transparent'
        title='Theme: Light'
        onClick={() => store.setThemeKey(`dark`)}
      >
        <SunIcon size={20} aria-label='Theme: Light' />
      </UI.Button>
    ) : (
      <UI.Button
        color='grayText'
        backgroundColor='transparent'
        title='Theme: Dark'
        onClick={() => store.setThemeKey(`light`)}
      >
        <MoonIcon size={20} aria-label='Theme: Dark' />
      </UI.Button>
    )}
  </div>
))`
  display: inline-block;

  > ${UI.Button} {
    width: 30px;
    padding: 0;
  }
`
