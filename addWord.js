"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var uuid_1 = require("uuid");
var mongodb_1 = require("mongodb");
// import dotenv from 'dotenv';
var dotenv = require("dotenv");
dotenv.config();
var MONGO_URI = process.env.MONGO_URI;
var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
var addWord = function (newWord) { return __awaiter(void 0, void 0, void 0, function () {
    var newWordFormatted, client, dbName, collectionName, db, foundWord, resultOfInsert, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                newWordFormatted = newWord.toUpperCase();
                console.log('Adding word to wordlist: ' + newWordFormatted);
                client = new mongodb_1.MongoClient(MONGO_URI, options);
                dbName = 'frankle';
                collectionName = 'wordlist';
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, 8, 9]);
                return [4 /*yield*/, client.connect()];
            case 2:
                _a.sent();
                db = client.db(dbName);
                console.log('Connected to DB:' + dbName);
                return [4 /*yield*/, db
                        .collection(collectionName)
                        .findOne({ word: newWordFormatted })];
            case 3:
                foundWord = _a.sent();
                if (!foundWord) return [3 /*break*/, 4];
                throw new Error('Word already in wordlist');
            case 4: return [4 /*yield*/, db
                    .collection(collectionName)
                    .insertOne({
                    _id: new mongodb_1.ObjectId((0, uuid_1.v4)().substring(28, 37)),
                    word: newWordFormatted
                })];
            case 5:
                resultOfInsert = _a.sent();
                console.log('got resultOfInsert: ');
                console.log(resultOfInsert);
                console.log('Added to wordlist');
                _a.label = 6;
            case 6: return [3 /*break*/, 9];
            case 7:
                err_1 = _a.sent();
                console.log('addWord caught error: ');
                console.log(err_1.message);
                return [3 /*break*/, 9];
            case 8:
                client.close();
                console.log('Disconnected.');
                return [7 /*endfinally*/];
            case 9: return [2 /*return*/];
        }
    });
}); };
if (process.argv.length !== 3 || process.argv[2].length !== 5) {
    console.log('Please provide one 5-letter word as an argument.');
}
else {
    addWord(process.argv[2]);
}
