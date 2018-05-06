"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer = require("puppeteer");
let browser;
function getBrowser() {
    return __awaiter(this, void 0, void 0, function* () {
        let opts = {
            headless: true,
        };
        browser = browser || (yield puppeteer.launch(opts));
        return browser;
    });
}
exports.getBrowser = getBrowser;
function getPage(browser, url) {
    return __awaiter(this, void 0, void 0, function* () {
        let page = yield browser.newPage();
        yield page.goto(url, {
            waitUntil: 'domcontentloaded',
            timeout: 0,
        });
        return page;
    });
}
exports.getPage = getPage;
