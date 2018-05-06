import * as puppeteer from 'puppeteer';


export interface fetchInfo<T> {
  (page: puppeteer.Page): Promise<T>,
}