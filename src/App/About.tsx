import React from 'react'
import styled, { css } from 'styled-components'
import { Install } from './Install'
import { PrivacyPolicy } from './PrivacyPolicy'
import { TermsOfService } from './TermsOfService'
import * as UI from '../UI'
import { Store } from './Store/types'

export type ShowModalKey = ``
  | `INSTALL`
  | `PRIVACY_POLICY`
  | `TERMS_OF_SERVICE`

export type AboutProps = React.HTMLProps<HTMLDivElement> & {
  store: Store
  fixed?: boolean
  showAboutLink?: boolean
  showInstallButton?: boolean
}

/**
 * A few links containing information about the app.
 * 
 * The "Privacy Policy" and "Terms of Service" are necessary for the app to be accepted to app stores.
 */
export const About = styled(({ store, fixed, showAboutLink, showInstallButton, ...props }: AboutProps) => {
  const [ showModalKey, setShowModalKey ] = React.useState<ShowModalKey>(``)

  return (
    <>
      <section { ...props }>
        {showAboutLink && (
          <a href='https://www.molecule.dev' target='_blank' rel='noopener noreferrer'>
            About Molecule
          </a>
        )}

        {showInstallButton && (
          <button type='button' className='install-button' onClick={event => {
            event.stopPropagation()
            event.preventDefault()
            setShowModalKey(`INSTALL`)
          }}>
            Install the App
          </button>
        )}

        <button type='button' onClick={event => {
          event.stopPropagation()
          event.preventDefault()
          setShowModalKey(`PRIVACY_POLICY`)
        }}>
          Privacy Policy
        </button>

        <button type='button' onClick={event => {
          event.stopPropagation()
          event.preventDefault()
          setShowModalKey(`TERMS_OF_SERVICE`)
        }}>
          Terms of Service
        </button>

        <button type='button' onClick={event => {
          event.stopPropagation()
          event.preventDefault()
        }}>
          {`v${store.version}${store.buildId ? `-${store.buildId.substring(store.buildId.length - 3)}` : ``}`}
        </button>
      </section>

      {showModalKey === `INSTALL` && (
        <UI.Modal center={true}>
          <Install />
          <UI.ModalCloseButton right={true} onClick={() => setShowModalKey(``)} />
        </UI.Modal>
      )}

      {showModalKey === `PRIVACY_POLICY` && (
        <UI.Modal center={true}>
          <PrivacyPolicy />
          <UI.ModalCloseButton right={true} onClick={() => setShowModalKey(``)} />
        </UI.Modal>
      )}

      {showModalKey === `TERMS_OF_SERVICE` && (
        <UI.Modal center={true}>
          <TermsOfService />
          <UI.ModalCloseButton right={true} onClick={() => setShowModalKey(``)} />
        </UI.Modal>
      )}
    </>
  )
})`
  display: flex;
  align-items: center;
  justify-content: space-around;

  ${({ fixed }) => fixed && css`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
  `}

  > a {
    padding: 5px;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.grayText};
  }

  > button {
    border: 0;
    margin: 0;
    padding: 5px 0;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.grayText};
    background: transparent;
    cursor: pointer;

    &.install-button {
      @media (display-mode: standalone) {
        display: none;
      }
    }
  }
`
