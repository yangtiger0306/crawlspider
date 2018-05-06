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
const mongodb = require("mongodb");
let dbConn;
let db;
function getDb() {
    return __awaiter(this, void 0, void 0, function* () {
        let connectStr = 'mongodb://118.31.11.181:27017/vike';
        dbConn = dbConn || (yield mongodb.MongoClient.connect(connectStr));
        db = db || dbConn.db('vike');
        return db;
    });
}
exports.getDb = getDb;
function closeDb() {
    return __awaiter(this, void 0, void 0, function* () {
        if (dbConn) {
            yield dbConn.close();
        }
    });
}
exports.closeDb = closeDb;
