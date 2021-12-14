import { DefaultTheme } from 'styled-components'

/**
 * The dark application theme.
 */
export const dark: DefaultTheme = {
  colors: {
    text: `#e0e0e0`,
    grayText: `#aaaaaa`,
    background: `#222222`,
    layerBackground: `#292929`,
    inputBackground: `#191919`,
    primary: `#4070e0`,
    red: `#d02000`,
    green: `#309000`,
    blue: `#4070e0`,
    yellow: `#e0e040`,
    brown: `#bf5100`,
    gray: `#808080`,
    highlight: `#3e3e00`
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
