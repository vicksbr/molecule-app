import React from 'react'
import styled from 'styled-components'

export type HeaderProps = React.HTMLProps<HTMLDivElement>

/**
 * A styled `header` element.
 * 
 * Pass `fixed` as `true` to stick this `header` element to the top.
 * 
 * This is a simple wrapper around the native `header` element,
 * so you can replace `<header { ...props } />` with `<UI.Header { ...props } />`
 * for better looking, easily stylable headers for your application.
 * 
 * Example usage:
 * ```tsx
 * import React from 'react'
 * import * as UI from '../../UI'
 * 
 * export type ExampleProps = React.HTMLProps<HTMLDivElement>
 * 
 * export const Example = (props: ExampleProps): React.ReactElement => {
 *   return (
 *     <div { ...props }>
 *       <UI.Header>
 *         <span>
 *           Hello, World!
 *         </span>
 *       </UI.Header>
 *     </div>
 *   )
 * }
 * ```
 */
export const Header = styled(({ role = `banner`, ...props }: HeaderProps) => (
  <header role={role} { ...props } />
))`
  z-index: 1001;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 40px;
  padding: 5px;
  background: ${({ theme }) => theme.colors.layerBackground};
`
