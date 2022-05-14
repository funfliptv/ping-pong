import { firefox as playwright } from 'playwright-firefox';

export async function startFireFox() {
  const browser = await playwright.launch();
  const context = await browser.newContext({
    deviceScaleFactor: 1,
  });
  return context;
}
