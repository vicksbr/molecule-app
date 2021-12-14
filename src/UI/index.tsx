/**
 * Basic user interface components designed to simplify custom styling of the application.
 * 
 * Most UI components are drop-in replacements for their native counterparts,
 * as they are mostly wrappers around their native counterparts using [`styled-components`](https://www.npmjs.com/package/styled-components).
 * 
 * For example, `<input />` can be replaced with `<UI.Input />` using all of the same `props`.
 * 
 * Other components (e.g., `Modal`, `Spinner`, etc.) don't typically have native counterparts
 * but are common and generic enough to be considered a user interface component.
 * 
 * @module
 */

export { Button } from './Button'
export type { ButtonProps } from './Button'

export { Center } from './Center'

export { Combo, ComboArrow, ComboInput, ComboPlaceholder, ComboOptions } from './Combo'
export type { ComboProps, ComboState, ComboSetState } from './Combo'

export { Error } from './Error'
export type { ErrorProps } from './Error'

export { Form, getDeepObject, getFormData } from './Form'
export type { FormProps } from './Form'

export { Header } from './Header'
export type { HeaderProps } from './Header'

export { Iframe, setHeight, initIframe } from './Iframe'
export type { IframeProps, IframeWrapperElement } from './Iframe'

export { Input, InputDateTime, InputPlaceholder } from './Input'
export type { InputProps, InputValue, InputState, InputSetState, InputDateTimeProps } from './Input'

export { Modal, ModalCloseButton, ModalCloseUnderlay } from './Modal'
export type { ModalProps, ModalCloseButtonProps, ModalCloseUnderlayProps } from './Modal'

export { RTE, RTEPlaceholder, defaultToolbars } from './RTE'
export type { RTEProps, RTEValue, RTEState, RTESetState, RTEFormEvent, RTEFormEventHandler, RTEWrapperElement, RTEQuillInstance, RTEToolbars } from './RTE'

export { Select, SelectSelectedText, SelectPlaceholder, SelectArrow } from './Select'
export type { SelectProps, SelectValue, SelectState, SelectSetState } from './Select'

export { Spinner } from './Spinner'
export type { SpinnerProps } from './Spinner'

export { StatusIcon, defaultStatusIconColors, defaultStatusIcons } from './StatusIcon'
export type { StatusIconProps, StatusIconColors, StatusIcons } from './StatusIcon'

export { Text } from './Text'

export { Textarea, TextareaPlaceholder } from './Textarea'
export type { TextareaProps, TextareaValue, TextareaState, TextareaSetState } from './Textarea'
