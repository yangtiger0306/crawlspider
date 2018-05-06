import * as puppeteer from "puppeteer";
import * as utils from './utils';
import fetch from './fetchs/vikecn.com';
import * as fs from 'fs';

async function main() {
  let browser = await utils.getBrowser();

  let data = await fetch();
  // console.log(data);
  // fs.writeFileSync('info.json', JSON.stringify(data, undefined, 4), 'utf-8');

  let db = await utils.getDb();
  let coll = db.collection('records');
  await Promise.all(data.data.map(async(n) => { 
    let item = await coll.findOne({ id: n.id });
    if(!item){
      await coll.insertOne(n);
    }
  }));
 
  await utils.closeDb();

  browser.close();
}


main();