/**
 * A map of theme keys to every available theme as the `styled-components` `DefaultTheme` interface.
 * 
 * Updated as necessary for your specific Molecule.
 * 
 * @module
 */

import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      text: string
      grayText: string
      background: string
      layerBackground: string
      inputBackground: string
      primary: string
      red: string
      green: string
      blue: string
      yellow: string
      brown: string
      gray: string
      highlight: string
    }
    /**
     * The same breakpoints used within (Chromium-based) DevTools.
     */
    breakpoints: {
      mobileS: {
        width: string
      }
      mobileM: {
        width: string
      }
      mobileL: {
        width: string
      }
      tablet: {
        width: string
      }
      laptop: {
        width: string
      }
      laptopL: {
        width: string
      }
      fourK: {
        width: string
      }
    }
  }
}

export { dark } from './dark'
export { light } from './light'

/**
 * Every available theme key.
 */
export type ThemeKey = `dark` | `light`
