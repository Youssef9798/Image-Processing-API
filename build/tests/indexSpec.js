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
const fs_1 = __importDefault(require("fs"));
const index_1 = __importDefault(require("../index"));
const imagesHandler_1 = require("../utilities/imagesHandler");
const req = (0, supertest_1.default)(index_1.default);
describe('it access the main endpoint /', () => {
    it('Request status 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield req.get('/');
        expect(res.status).toBe(200);
    }));
});
describe('it access the image api endpoint /api/image', () => {
    it('no query added to the endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield req.get('/api/images');
        expect(res.status).toBe(401);
    }));
    it('invalid height or width query added to the endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield req.get('/api/images?width=&height=');
        expect(res.status).toBe(401);
    }));
    it('invalid image name query added to the endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield req.get('/api/images?filename');
        expect(res.status).toBe(401);
    }));
    it('valid query params added to the endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield req.get('/api/images?height=100&width=200&filename=encenadaport.jpg');
        expect(res.status).toBe(200);
    }));
});
describe('it resizing the sent images', () => {
    it('imaged is resized successfully', () => {
        expect(() => __awaiter(void 0, void 0, void 0, function* () {
            const testWidth = 100;
            const testHeight = 100;
            const imageBuffer = fs_1.default.readFileSync(`./assets/images/full/fjord.jpg`);
            const testFilename = 'fjord.jpg';
            const transform = new imagesHandler_1.Images();
            yield transform.resize(imageBuffer, testWidth, testHeight, testFilename);
        })).not.toThrow();
    });
});
