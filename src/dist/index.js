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
const utils = require("./utils");
const vikecn_com_1 = require("./fetchs/vikecn.com");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let browser = yield utils.getBrowser();
        let data = yield vikecn_com_1.default();
        // console.log(data);
        // fs.writeFileSync('info.json', JSON.stringify(data, undefined, 4), 'utf-8');
        let db = yield utils.getDb();
        let coll = db.collection('records');
        yield Promise.all(data.data.map((n) => __awaiter(this, void 0, void 0, function* () {
            let item = yield coll.findOne({ id: n.id });
            if (!item) {
                yield coll.insertOne(n);
            }
        })));
        yield utils.closeDb();
        browser.close();
    });
}
main();
