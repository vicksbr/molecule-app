import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'
import { XIcon } from '@primer/octicons-react'

export type ModalCloseButtonProps = React.HTMLProps<HTMLButtonElement> & {
  type?: `button` | `reset` | `submit`
  fixed?: boolean
  right?: boolean
}

/**
 * A button icon which can be rendered within your `Modal` with an `onClick` handler to close it.
 *
 * Pass `fixed` as `false` to use relative positioning instead.
 */
export const ModalCloseButton = styled(({ type = `button`, title = `Close`, fixed, right, ...props }: ModalCloseButtonProps) => (
  <button type={type} title={title} { ...props }>
    <XIcon size={20} aria-label={title} />
  </button>
))`
  z-index: 1002;

  ${({ theme, fixed = true, right }) => fixed ? `
    position: fixed;
    top: 5px;
    right: 5px;

    @media (min-width: ${theme.breakpoints.laptop.width}) {
      right: ${right ? `5px` : `50%`};
      margin-right: ${right ? `0` : `calc(-0.5 * ${theme.breakpoints.laptop.width} + 5px)`};
    }
  ` : `
    position: relative;
  `}

  width: 30px;
  height: 30px;
  padding: 4px;
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: color 0.25s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

export type ModalCloseUnderlayProps = React.HTMLProps<HTMLButtonElement> & {
  type?: `button` | `reset` | `submit`
}

/**
 * A full-sized, semi-transparent underlay which can be rendered before your `Modal`
 * with an `onClick` handler to close it.
 */
export const ModalCloseUnderlay = styled(({ type = `button`, title = `Close`, ...props }: ModalCloseUnderlayProps): React.ReactElement => (
  <button type={type} title={title} { ...props } />
))`
  &&& {
    z-index: 1999;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    padding: 0;
    border: 0;
    cursor: pointer;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(2px);
  }
`

export type ModalProps = React.HTMLProps<HTMLDivElement> & {
  center?: boolean
  left?: boolean
  right?: boolean
  onClose?: () => void
  useUnderlay?: boolean
}

/**
 * A custom modal component with the option to position it either center, left, or right.
 *
 * If an `onClose` handler is provided, the corresponding `ModalCloseButton` will be added,
 * plus the `ModalCloseUnderlay` unless `useUnderlay` is set to `false`.
 *
 * Example usage:
 * ```tsx
 * import React, { useState } from 'react'
 * import * as UI from '../../UI'
 *
 * export type ExampleProps = React.HTMLProps<HTMLDivElement>
 *
 * export const Example = (props: ExampleProps): React.ReactElement => {
 *   const [ visible, setVisible ] = useState(false)
 *
 *   return (
 *     <div { ...props }>
 *       <p>
 *         Click the button to show the modal.
 *       </p>
 *
 *       <UI.Button onClick={() => setVisible(true)}>
 *         <span>
 *           Click me
 *         </span>
 *       </UI.Button>
 *
 *       {visible && (
 *         <UI.Modal center={true} onClose={() => setVisible(false)}>
 *           <p>
 *             This is a centered modal.
 *           </p>
 *
 *           <p>
 *             Click the X at the top right to hide it.
 *           </p>
 *         </UI.Modal>
 *       )}
 *     </div>
 *   )
 * }
 * ```
 */
export const Modal = styled(({ center, left, right, onClose, useUnderlay = true, children, ...props }: ModalProps) => {
  const rootElement = document.getElementById(`root`)
  const { current: modalElement } = useRef(document.createElement(`div`))

  useEffect(() => {
    if (rootElement) {
      rootElement.appendChild(modalElement)
    }

    return () => {
      if (rootElement) {
        rootElement.removeChild(modalElement)
      }
    }
  }, [ rootElement, modalElement ])

  const modalFragment = (
    <>
      {onClose && useUnderlay && (
        <ModalCloseUnderlay onClick={onClose} />
      )}

      {center ? (
        <div { ...props }>
          <div>
            <div>
              <div>
                {children}

                {onClose && (
                  <ModalCloseButton right={right} onClick={onClose} />
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div { ...props }>
          <div>
            {children}

            {onClose && (
              <ModalCloseButton right={right} onClick={onClose} />
            )}
          </div>
        </div>
      )}
    </>
  )

  return rootElement ? createPortal(modalFragment, modalElement) : modalFragment
})`
  z-index: 2000;
  position: fixed;
  top: 0px;
  bottom: 0;
  left: ${({ right }) => right ? `auto` : `0`};
  right: ${({ left }) => left ? `auto` : `0`};
  width: ${({ left, right }) => (left || right) ? `380px` : `100%`};
  max-width: 100%;
  background: ${({ theme }) => theme.colors.layerBackground};
  overflow: auto;
  overscroll-behavior: contain;
  box-shadow: ${({ left, right }) => (left || right) ? `0 0 3px 3px rgba(0, 0, 0, 0.05)` : `none`};

  > div {
    position: relative;
    width: ${({ theme }) => theme.breakpoints.laptop.width};
    max-width: 100%;
    min-height: 100vh;
    margin: 0 auto;

    ${({ theme, center }) => center ? `
      > div {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        padding: 10px;
        margin: 0 auto;
        width: ${theme.breakpoints.laptop.width};
        max-width: 100%;
        min-height: 100vh;
      }
    ` : `
      padding: 10px;
    `}
  }
`
