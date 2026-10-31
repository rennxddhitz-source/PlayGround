import { chromium } from 'playwright';
import { readFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const homeDir = process.env.HOME || '';
const runtimeDir = join(homeDir, '.local/share/omgithub-playwright');

// Determine platform-specific config file
const configFile = process.platform === 'darwin' ? 'metal.json' : 'linux.json';
const configPath = join(runtimeDir, configFile);
const runtimeConfig = JSON.parse(readFileSync(configPath, 'utf8'));

// Set DISPLAY for Linux if not set
if (process.platform === 'linux') {
  const displayFile = join(runtimeDir, 'display');
  const displayValue = readFileSync(displayFile, 'utf8').trim();
  if (displayValue && !process.env.DISPLAY) {
    process.env.DISPLAY = ':' + displayValue;
  }
}

const url = process.argv[2];
const output = process.argv[3];
const startTime = Number(process.argv[4] || '0');

if (!url || !output) {
  console.error('Usage: node capture-runner.mjs <CAPTURE_URL> <CAPTURE_DIR> [start_time_ns]');
  process.exit(1);
}

mkdirSync(output, { recursive: true });

const transient = error => {
  console.error(error.message);
  throw Object.assign(error, { exitCode: 75 });
};

let browser;
try {
  browser = await chromium.launch({ ...runtimeConfig.browser.launchOptions, timeout: 30000 }).catch(transient);
  
  for (const [name, width, height] of [['desktop', 1440, 900], ['mobile', 390, 844]]) {
    const page = await browser.newPage({ viewport: { width, height } }).catch(transient);
    page.setDefaultTimeout(30000);
    const failures = [];
    
    page.on('pageerror', error => { 
      console.error(`Page error [${name}]: ${error.message}`); 
      failures.push(error.message); 
    });
    
    page.on('response', response => { 
      if (response.status() >= 400 && new URL(response.url()).origin === new URL(url).origin) {
        console.error(`HTTP error [${name}]: ${response.status()}`);
        failures.push(`HTTP ${response.status()}: ${response.url()}`); 
      } 
    });
    
    const navigationStart = Date.now();
    const response = await page.goto(url, { waitUntil: 'load', timeout: 45000 }).catch(transient);
    const navigationTime = Date.now() - navigationStart;
    console.log(`Navigation [${name}]: ${navigationTime}ms`);
    
    if (!response?.ok()) {
      const status = response?.status || 0;
      throw Object.assign(new Error(`HTTP ${status} loading preview`), { exitCode: [408, 429, 500, 502, 503, 504].includes(status) ? 75 : 1 });
    }
    
    await page.locator('body').waitFor({ state: 'visible' });
    await page.waitForFunction(() => document.fonts.status === 'loaded');
    
    await page.waitForTimeout(1000);
    
    const captureStart = Date.now();
    await page.screenshot({ path: join(output, `final-${name}.png`), timeout: 30000 }).catch(error => {
      if (error.name === 'TimeoutError' || !browser.isConnected()) transient(error);
      throw error;
    });
    const captureTime = Date.now() - captureStart;
    console.log(`Screenshot [${name}]: ${captureTime}ms`);
  }
  
  const totalTime = Date.now() - startTime;
  console.log(`Total capture time: ${totalTime}ms`);
  
} catch (error) {
  console.error(`Capture failed: ${error.message}`);
  const exitCode = error.exitCode || 1;
  process.exitCode = exitCode;
} finally {
  await browser?.close().catch(error => { console.error(`Browser close error: ${error.message}`); process.exitCode ||= 75 });
}