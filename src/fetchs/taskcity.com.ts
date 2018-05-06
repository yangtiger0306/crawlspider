// http://www.taskcity.com/projects/skills/%E5%B0%8F%E7%A8%8B%E5%BA%8F%20%E4%B8%8A%E6%B5%B7?commit=%E6%90%9C%E7%B4%A2&enter=%E9%A1%B9%E7%9B%AE&page=2

// 时间财富
import * as puppeteer from 'puppeteer';
import * as utils from '../utils';
import * as types from '../types';

interface IItem {
  id: string,
  status: '招募中' | '招募完毕' | '官方托管',
  url: string,
  money: string,
  title: string,

}

interface IRst {
  data?: Partial<IItem>[],
}

const fetchOne: types.fetchInfo<IItem[]> = async (page) => {
  let ret: IItem[] = [];
  // let list = await page.$$('.line_h');
  let list = await page.evaluate(() => {
    let list = [...document.querySelectorAll('.line_h')];
    return list.map(el => {
      let ret: Partial<IItem> = {};
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
};

// pageIndex从1开始数
function getUrl(pageIndex: number): string {
  return `http://www.taskcity.com/projects/skills/%E5%B0%8F%E7%A8%8B%E5%BA%8F%20%E4%B8%8A%E6%B5%B7?commit=%E6%90%9C%E7%B4%A2&enter=%E9%A1%B9%E7%9B%AE&page=${pageIndex}`;
}

const fetch = async (): Promise<IRst> => {

  let ret: IRst = { data: [], };
  // 最多查找页数
  let count = 5;


  let browser: puppeteer.Browser = await utils.getBrowser();
  let page: puppeteer.Page;
  let url: string;
  let data: IItem[];
  let pageIndex = 1;

  while (count--) {
    url = getUrl(pageIndex);

    page = await utils.getPage(browser, url);
    data = await fetchOne(page);
    if (data.length) {
      ret.data.push(...data);
      pageIndex++;
    } else {
      break;
    }
  }

  return ret;
}


export default fetch;