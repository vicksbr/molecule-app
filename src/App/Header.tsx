import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ThemeToggler } from './ThemeToggler'
import * as UI from '../UI'
import { Logo } from './Logo'
import { Store } from './Store/types'

export type AppNameProps = React.HTMLProps<HTMLSpanElement>

/**
 * The name of the application shown at the top left.
 *
 * You will probably want to customize this.
 */
export const AppName = styled((props: AppNameProps) => (
  <span { ...props }>
    Molecule
  </span>
))`
  text-transform: lowercase;
`

export type AppLinkProps = React.HTMLProps<HTMLAnchorElement> & {
  store: Store
  ref?: React.Ref<HTMLAnchorElement>
}

/**
 * A link to the root of the application.
 */
export const AppLink = styled(({ store, onClick, children, ...props }: AppLinkProps) => (
  <Link to='/' role='button' onClick={onClick} { ...props }>
    {children}
  </Link>
))`
  display: inline-block;
  vertical-align: middle;
  max-width: calc(100vw - 120px);
  border: 0;
  padding: 0 5px 0 0;
  margin: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  font-size: 26px;
  line-height: 26px;
  letter-spacing: -1px;
  white-space: nowrap;
  overflow: visible;
  cursor: pointer;

  > * {
    display: inline-block;
    vertical-align: middle;
  }
`

export type AsideProps = React.HTMLProps<HTMLDivElement> & {
  store: Store
}

/**
 * Menu icons at the top right.
 * 
 * Updated as necessary for your specific Molecule.
 */
export const Aside = styled(({ store, ...props }: AsideProps) => (
  <aside { ...props }>
    <ThemeToggler store={store} />
  </aside>
))`
  position: relative;
  z-index: 10;
  display: inline-flex;
  justify-content: flex-end;
  width: 100%;
  height: 30px;

  > * {
    display: inline-flex;
    vertical-align: top;
  }
`

export type HeaderProps = Parameters<typeof UI.Header>[0] & {
  store: Store
}

/**
 * The fixed header at the top of the application.
 */
export const Header = styled(({ store, ...props }: HeaderProps) => (
  <UI.Header { ...props }>
    <AppLink store={store}>
      <Logo />
      <AppName />
    </AppLink>

    <Aside store={store} />
  </UI.Header>
))`
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.05);
`
