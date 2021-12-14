import { useState } from 'react'
import { DefaultTheme } from 'styled-components'
import * as themes from '../../themes'
import { ThemeKey } from '../../themes'

const defaultTheme = themes.light

/**
 * Saves the theme key as `selectedThemeKey` using `localStorage` and sets the state to the theme object.
 */
export type SetThemeKey = (themeKey: ThemeKey) => void

/**
 * Gets the selected theme key from local storage and returns the selected theme object.
 */
export const getSelectedTheme = (): DefaultTheme => {
  const selectedThemeKey = window.localStorage.getItem(`selectedThemeKey`) as ThemeKey

  if (themes[selectedThemeKey]) {
    return themes[selectedThemeKey]
  }

  if (window.matchMedia?.('(prefers-color-scheme: light)')?.matches) {
    return themes.light
  }

  if (window.matchMedia?.('(prefers-color-scheme: dark)')?.matches) {
    return themes.dark
  }

  return defaultTheme
}

/**
 * If the user's preferred theme does not match the prerendered default theme,
 * the app's HTML will need to be reset instead of hydrating the existing HTML.
 */
export const shouldResetInitialRender = (): boolean => getSelectedTheme() !== defaultTheme

/**
 * A hook which returns the current theme and a method to set the theme by key.
 */
export const useTheme = (initialTheme: DefaultTheme = getSelectedTheme()): [ DefaultTheme, SetThemeKey ] => {
  const [ theme, setTheme ] = useState<DefaultTheme>(initialTheme)

  const setThemeKey: SetThemeKey = themeKey => {
    window.localStorage.setItem(`selectedThemeKey`, themeKey)
    setTheme(themes[themeKey])
  }

  return [ theme, setThemeKey ]
}
