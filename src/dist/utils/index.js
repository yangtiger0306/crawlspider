"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const browser = require("./browser");
const db = require("./db");
exports.getBrowser = browser.getBrowser;
exports.getPage = browser.getPage;
exports.getDb = db.getDb;
exports.closeDb = db.closeDb;
