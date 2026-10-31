import { chromium } from 'playwright';
const url = process.argv[1];
const output = process.argv[2];
const startTime = Number(process.argv[3] || '0');
console.log('URL:', url);
console.log('Output:', output);
console.log('Start Time:', startTime);
mkdirSync(output, { recursive: true });
await chromium.launch().then(browser => {
  return browser.newPage().then(page => {
    return page.goto(url).then(() => {
      console.log(' navigated OK');
      return page.screenshot({path: join(output, 'test.png')});
    }).then(() => {
      console.log(' screenshot OK');
      browser.close();
    });
  });
});
