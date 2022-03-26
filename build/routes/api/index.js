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
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const imagesHandler_1 = require("../../utilities/imagesHandler");
const routes = express_1.default.Router();
routes.get('/api/images', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { height, width, filename } = req.query;
    const height = req.query.height;
    const width = req.query.width;
    const filename = req.query.filename;
    if (!req.query) {
        return res.status(401).render('index', {
            error: 'No input, please make sure to add the inputs',
            image: '',
            resizedImage: '',
        });
    }
    const invHeight = parseInt(`${height}`);
    const invWidth = parseInt(`${width}`);
    if (!filename) {
        return res.status(401).render('index', {
            error: 'No image input',
            image: '',
            resizedImage: '',
        });
    }
    if (!height || !width) {
        return res.status(401).render('index', {
            error: 'Enter a width and height',
            image: '',
            resizedImage: '',
        });
    }
    if (invHeight <= 0) {
        return res.status(401).render('index', {
            error: 'Enter a valid Height',
            image: '',
            resizedImage: '',
        });
    }
    if (invWidth <= 0) {
        return res.status(401).render('index', {
            error: 'Enter a valid Width',
            image: '',
            resizedImage: '',
        });
    }
    if (`${filename}`.split('.')[1] !== 'jpg') {
        return res.status(401).render('index', {
            error: 'Enter a valid image, image must be jpg or png',
            image: '',
            resizedImage: '',
        });
    }
    const imagesClass = new imagesHandler_1.Images();
    const originalImages = yield imagesClass.getAllImages(path_1.default.resolve('./assets/images/full'));
    const imageExist = originalImages.filter((el) => {
        return el === filename;
    });
    if (!imageExist[0]) {
        return res.status(404).render('index', {
            error: 'Images is not avaliable or not found',
            image: ``,
            resizedImage: ``,
        });
    }
    else {
        const imageBuffer = fs_1.default.readFileSync(`./assets/images/full/${filename}`);
        const processedImage = yield imagesClass.resize(imageBuffer, +invWidth, +invHeight, `${filename}`);
        // console.log(res.req.originalUrl);
        // console.log(res.req.headers.host);
        res.status(200).render('index', {
            error: '',
            image: `${filename}`,
            resizedImage: `${processedImage}`,
        });
    }
}));
exports.default = {
    routes,
};
