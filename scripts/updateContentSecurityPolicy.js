const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const contentSecurityPolicy = {
  'default-src': [
    `'self'`,
    process.env.REACT_APP_API_ORIGIN
  ],
  'font-src': [
    `'self'`,
    `https:`,
    `http:`,
    `file:`
  ],
  'img-src': [
    `'self'`,
    `https:`,
    `http:`,
    `data:`,
    `file:`
  ],
  'style-src': [
    `'self'`,
    `'unsafe-inline'`
  ],
  'script-src': [
    `'self'`
  ],
  'frame-src': [
    `'self'`
  ]
}

const indexFilename = path.join(__dirname, '../build/index.html')
let indexHtml = fs.readFileSync(indexFilename, `utf8`)

// Dirty way to allow the stylesheet to load with our Content Security Policy.
indexHtml = indexHtml.replace(
  ` onload="this.rel='stylesheet'">`,
  ` id="link-onload"><script>document.getElementById('link-onload').onload=function(){this.rel='stylesheet'}</script>`
)

// Find all inline scripts - i.e., <script> and <script type="text/javascript"> tags.
const scriptMatches = indexHtml.match(/<script(| type="text\/javascript")>([\s\S]*?)<\/script>/gmi)

// Determine the base64 encoded sha256 hash for each inline script.
for (const scriptMatch of scriptMatches) {
  const hash = crypto.createHash('sha256')
  hash.update(scriptMatch.replace(/<\/?script(| type="text\/javascript")>/gmi,''))
  contentSecurityPolicy['script-src'].push(`'sha256-${hash.digest('base64')}'`)
}

const cspContent = Object.entries(contentSecurityPolicy)
  .map(([ key, values ]) => `${key} ${values.join(` `)}`)
  .join(`;`)

// Replace the existing <meta http-equiv="Content-Security-Policy"> tag with one using our CSP.
indexHtml = indexHtml.replace(
  /<meta content="default-src(.+)?" http-equiv="Content-Security-Policy">/gmi,
  `<meta content="${cspContent}" http-equiv="Content-Security-Policy">`
)

fs.writeFileSync(indexFilename, indexHtml)

// Update Netlify's _headers file.
const headersFilename = path.join(__dirname, '../build/_headers')
const headersContents = fs.readFileSync(headersFilename, `utf8`).replace(
  /Content-Security-Policy:(.+)?(\r\n|\r|\n)/gmi,
  `Content-Security-Policy: ${cspContent}; frame-ancestors 'none'\n`
)

fs.writeFileSync(headersFilename, headersContents)
