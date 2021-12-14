import { DefaultTheme } from 'styled-components'

/**
 * The light application theme.
 */
export const light: DefaultTheme = {
  colors: {
    text: `#333333`,
    grayText: `#808080`,
    background: `#f6f6f6`,
    layerBackground: `#ffffff`,
    inputBackground: `#ffffff`,
    primary: `#4070e0`,
    red: `#d02000`,
    green: `#309000`,
    blue: `#4070e0`,
    yellow: `#e0e040`,
    brown: `#bf5100`,
    gray: `#808080`,
    highlight: `#ffffa6`
  },
  breakpoints: {
    mobileS: {
      width: `320px`
    },
    mobileM: {
      width: `375px`
    },
    mobileL: {
      width: `425px`
    },
    tablet: {
      width: `768px`
    },
    laptop: {
      width: `1024px`
    },
    laptopL: {
      width: `1440px`
    },
    fourK: {
      width: `2560px`
    }
  }
}
