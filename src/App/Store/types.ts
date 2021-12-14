/**
 * Store type definitions.
 * 
 * @module
 */

import { DefaultTheme } from 'styled-components'
import { SetThemeKey } from './useTheme'
import { VersionState, VersionActions } from './useVersion'

/**
 * The shape of the store.
 * 
 * Updated as necessary for your specific Molecule.
 */
export type Store = VersionState & VersionActions & {
  status: `initializing` | `ready`

  theme: DefaultTheme
  setThemeKey: SetThemeKey
}
