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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const req = (0, supertest_1.default)(index_1.default);
describe('it access the main endpoint /', () => {
    it('Request status 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield req.get('/');
        expect(res.status).toBe(200);
    }));
});
describe('it access the image api endpoint /api/image', () => {
    it('no query added to the endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield req.get('/api/image');
        expect(res.status).toBe(401);
    }));
    it('invalid height or width query added to the endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield req.get('/api/image?width=&height=');
        expect(res.status).toBe(401);
    }));
    it('invalid image name query added to the endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield req.get('/api/image?image_name');
        expect(res.status).toBe(401);
    }));
    it('valid query params added to the endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield req.get('/api/image?height=100&width=200&image_name=encenadaport.jpg');
        expect(res.status).toBe(200);
    }));
});
