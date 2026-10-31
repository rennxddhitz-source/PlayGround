#!/usr/bin/env bash
# capture.sh — open the exact CAPTURE_URL in a browser, wait for rendered
# content, and save final-desktop.png + final-mobile.png into CAPTURE_DIR.
# The web app keeps running; this script only closes its own browser.
#
# Exit codes:
#   0  success
#   75 temporary navigation/browser infrastructure failure (safe to retry)
#   1  script or rendering defect (bad args, app errors, missing content)
set -euo pipefail
cd "$(dirname "$0")"

: "${CAPTURE_URL:?CAPTURE_URL is required (e.g. https://live-<worker>.omgithub.com)}"
: "${CAPTURE_DIR:?CAPTURE_DIR is required (directory for captured evidence)}"

echo "[capture] url: $CAPTURE_URL"
echo "[capture] dir: $CAPTURE_DIR"
/usr/bin/time -p bash -n "$0"              # script sanity
/usr/bin/time -p mkdir -p "$CAPTURE_DIR"

SCRIPT="$(/usr/bin/time -p mktemp /tmp/omgithub-capture-XXXXXX.mjs)"
trap '/usr/bin/time -p rm -f "$SCRIPT"' EXIT
export PROJECT_DIR="$PWD" PROJECT_DIR_EXPORTED=1

/usr/bin/time -p cat > "$SCRIPT" <<'NODE'
/* Capture runner (.mjs): desktop + mobile screenshots of the deployed preview. */
import { createRequire } from 'node:module'
import { mkdirSync } from 'node:fs'
const url = process.env.CAPTURE_URL
const out = process.env.CAPTURE_DIR
const pwRoot = process.env.PW_ROOT || process.env.HOME + '/.local/share/omgithub-playwright'
const now = () => performance.now()
const tmp = (label, t) => console.log(`[capture] timing ${label}: real ${((now() - t) / 1000).toFixed(2)}s`)
const asTransient = e => Object.assign(e instanceof Error ? e : new Error(String(e)), { exitCode: 75 })
const asDefect = e => Object.assign(e instanceof Error ? e : new Error(String(e)), { exitCode: 1 })

if (!/^https?:\/\//.test(url)) { console.error('CAPTURE_URL must be an absolute http(s) URL: ' + url); process.exit(1) }
if (!/^\/[A-Za-z0-9_./ ~+:\-@=,\\-]+$/.test(out)) {
  console.error('CAPTURE_DIR must be an absolute writable evidence directory: ' + out); process.exit(1)
}
const projectDir = process.env.PROJECT_DIR || process.cwd()
if (out.startsWith(projectDir + '/') || out === projectDir) {
  console.error('CAPTURE_DIR must be outside the source project (' + projectDir + '): ' + out); process.exit(1)
}
let chromium
const req = createRequire(pwRoot + '/package.json')
try {
  chromium = req('playwright').chromium
} catch (error) {
  console.error(`Playwright not available at ${pwRoot}: ${error.message}`); process.exit(1)
}
mkdirSync(out, { recursive: true })

let browser
const pageErrors = []
try {
  // deterministic headless launch (works in CI/Xvfb-free workers; GPU configs stall)
  const args = ['--no-sandbox', '--hide-scrollbars', '--disable-dev-shm-usage']
  const t = now()
  browser = await chromium.launch({ headless: true, args, timeout: 30000 }).catch(asTransient)
  tmp('browser-launch', t)

  for (const [name, width, height] of [['desktop', 1440, 900], ['mobile', 390, 844]]) {
    const tv = now()
    const page = await browser.newPage({ viewport: { width, height } }).catch(asTransient)
    page.setDefaultTimeout(30000)
    const sameOrigin = new URL(url).origin
    const httpFailures = []
    page.on('pageerror', e => pageErrors.push(e.message))
    page.on('response', r => {
      try { if (r.status() >= 400 && new URL(r.url()).origin === sameOrigin) httpFailures.push(`HTTP ${r.status()} ${r.url()}`) } catch {}
    })

    // 1. open the exact URL
    const resp = await page.goto(url, { waitUntil: 'load', timeout: 45000 }).catch(e => { throw asTransient(e) })
    tmp(`goto:${name}`, tv)
    const status = resp ? resp.status() : 0
    if (!resp) throw asDefect(new Error(`No response loading ${url}`))
    if (status >= 400) {
      const message = `HTTP ${status} loading ${url}`
      throw ([408, 429, 500, 502, 503, 504].includes(status) ? asTransient(new Error(message)) : asDefect(new Error(message)))
    }

    // 2. wait for rendered content: menu headline visible + game canvas attached
    const readySel = process.env.CAPTURE_READY_SELECTOR || '#scr-menu.on h1'
    await page.locator(readySel).waitFor({ state: 'visible', timeout: 30000 })
      .catch(e => { throw asDefect(new Error(`Rendered content did not appear (selector ${readySel}): ${e.message}`)) })
    if (await page.locator('#cv').count() < 1)
      throw asDefect(new Error('Game canvas (#cv) missing from the page — app assets did not load.'))
    await page.waitForTimeout(1500) // first frames paint + menu settles

    // 3. capture
    const shot = `${out}/final-${name}.png`
    await page.screenshot({ path: shot, timeout: 30000 }).catch(e => {
      if (e.name === 'TimeoutError' || !browser.isConnected()) throw asTransient(e)
      throw asDefect(e)
    })
    tmp(`screenshot:${name}`, tv)
    console.log(`[capture] saved ${shot}`)
    await page.close()

    if (pageErrors.length) throw asDefect(new Error(`App page errors during ${name} capture: ${pageErrors.join('; ')}`))
    if (process.env.CAPTURE_STRICT === '1' && httpFailures.length)
      throw asDefect(new Error(`Same-origin HTTP failures during ${name} capture: ${httpFailures.join('; ')}`))
  }
} catch (error) {
  const code = error.exitCode !== undefined ? error.exitCode : 1
  console.error(`[capture] failed (exit ${code}): ${error.message}`)
  if (browser) { try { await browser.close({ timeout: 10000 }) } catch (e) { console.error(`[capture] browser close also failed: ${e.message}`) } }
  process.exit(code === 75 ? 75 : 1)
} finally {
  if (browser) await browser.close({ timeout: 10000 }).catch(e => console.error(`[capture] browser close: ${e.message}`))
}
console.log('[capture] done')
NODE

/usr/bin/time -p node "$SCRIPT"
[[ -s "$CAPTURE_DIR/final-desktop.png" && -s "$CAPTURE_DIR/final-mobile.png" ]] || {
  echo "[capture] FATAL: expected screenshots not produced in $CAPTURE_DIR" >&2
  exit 1
}
echo "[capture] ok: $CAPTURE_DIR/final-desktop.png, $CAPTURE_DIR/final-mobile.png"
