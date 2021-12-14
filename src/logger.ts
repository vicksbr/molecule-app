/**
 * The logger, using `loglevel`.
 * 
 * Updated as necessary for your specific Molecule.
 * 
 * @see https://www.npmjs.com/package/loglevel
 * 
 * @module
 */

import * as logger from 'loglevel'

if (process.env.REACT_APP_LOG_LEVEL) {
  logger.setLevel(process.env.REACT_APP_LOG_LEVEL)
}

export { logger }
