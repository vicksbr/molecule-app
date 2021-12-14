/**
 * This creates a static `version.json` file which the app will periodically check
 * so the user can be notified about a new app version if they never refresh the page.
 * 
 * Uses `process.env.BUILD_ID`, if available.
 * 
 * @see https://docs.netlify.com/configure-builds/environment-variables/#build-metadata
 */

const fs = require('fs')
const path = require('path')
const { version } = require('../package.json')
const { version: publicVersion } = require('../public/version.json')

if (version !== publicVersion) {
  const publicFilename = path.join(__dirname, '../public/version.json')
  fs.writeFileSync(publicFilename, JSON.stringify({ version }))
}

if (process.env.BUILD_ID) {
  const buildFilename = path.join(__dirname, '../build/version.json')
  fs.writeFileSync(buildFilename, JSON.stringify({ version, buildId: process.env.BUILD_ID }))
}
