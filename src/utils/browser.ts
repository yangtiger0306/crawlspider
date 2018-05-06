import * as puppeteer from "puppeteer";

let browser: puppeteer.Browser;
export async function getBrowser(): Promise<puppeteer.Browser> {
  let opts: puppeteer.LaunchOptions = {
    headless: true,
  };
  browser = browser || await puppeteer.launch(opts);
  return browser;
}


export async function getPage(browser: puppeteer.Browser, url: string, ) {
  let page = await browser.newPage();
  await page.goto(url, {
    waitUntil: 'domcontentloaded',
    timeout: 0,
  });
  return page;
}



