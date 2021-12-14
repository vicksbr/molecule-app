import React, { useState, useEffect } from 'react'
import { useVersion } from './useVersion'
import { useTheme } from './useTheme'
import * as types from './types'

export * as types from './types'

export type StoreProps = {
  children: (store: types.Store) => React.ReactElement
}

/**
 * Provides application state as a composition of various stateful hooks.
 * 
 * Updated as necessary for your specific Molecule.
 */
export const Store = ({ children }: StoreProps): React.ReactElement => {
  const [ status, setStatus ] = useState<types.Store['status']>(`ready`)
  const [ versionState, versionActions ] = useVersion()
  const [ theme, setThemeKey ] = useTheme()

  const store: types.Store = React.useMemo(() => ({
    status,

    ...versionState,
    ...versionActions,

    theme,
    setThemeKey
  }), [
    status,

    versionState,
    versionActions,

    theme,
    setThemeKey
  ])

  return children(store)
}
