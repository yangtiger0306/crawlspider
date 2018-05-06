"use strict";
// http://www.taskcity.com/projects/skills/%E5%B0%8F%E7%A8%8B%E5%BA%8F%20%E4%B8%8A%E6%B5%B7?commit=%E6%90%9C%E7%B4%A2&enter=%E9%A1%B9%E7%9B%AE&page=2
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils = require("../utils");
const fetchOne = (page) => __awaiter(this, void 0, void 0, function* () {
    let ret = [];
    // let list = await page.$$('.line_h');
    let list = yield page.evaluate(() => {
        let list = [...document.querySelectorAll('.line_h')];
        return list.map(el => {
            let ret = {};
            let aList = [...el.querySelectorAll('a')];
            let first = aList[0];
            ret.title = first.getAttribute('title');
            ret.money = first.querySelector('.money').innerHTML;
            ret.url = first.getAttribute('href');
            ret.status = el.querySelector('a.zhao') ? '招募中' :
                el.querySelector('a.guy') ? '招募完毕' :
                    '官方托管';
            ret.id = 'vikencn.com/' + ret.url.match(/\d+/)[0];
            return ret;
        });
    });
    ret.push(...list);
    return ret;
});
// pageIndex从1开始数
function getUrl(pageIndex) {
    return `http://www.taskcity.com/projects/skills/%E5%B0%8F%E7%A8%8B%E5%BA%8F%20%E4%B8%8A%E6%B5%B7?commit=%E6%90%9C%E7%B4%A2&enter=%E9%A1%B9%E7%9B%AE&page=${pageIndex}`;
}
const fetch = () => __awaiter(this, void 0, void 0, function* () {
    let ret = { data: [], };
    // 最多查找页数
    let count = 5;
    let browser = yield utils.getBrowser();
    let page;
    let url;
    let data;
    let pageIndex = 1;
    while (count--) {
        url = getUrl(pageIndex);
        page = yield utils.getPage(browser, url);
        data = yield fetchOne(page);
        if (data.length) {
            ret.data.push(...data);
            pageIndex++;
        }
        else {
            break;
        }
    }
    return ret;
});
exports.default = fetch;
