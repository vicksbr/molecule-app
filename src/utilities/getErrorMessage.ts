export type Error = null | string | {
  code?: string | number
  message?: string
  response?: {
    statusText?: string
    data?: {
      errors?: { [key: string]: string }
      error?: string
    }
  }
}

/**
 * Attempts to return a human readable message based on some `Error`.
 */
export const getErrorMessage = (error?: Error): string | null => {
  if (!error) {
    return null
  }

  if (typeof error === `string`) {
    return error
  }

  return (
    ({ ETIMEDOUT: `Timed out`, ECONNABORTED: `Connection aborted` })[error.code || -1]
      || (error.response?.data?.errors && Object.keys(error.response.data.errors).map(key => `${key} ${error.response?.data?.errors?.[key]}`).join(`, `))
      || error.response?.data?.error
      || error.message
      || null
  )
}
