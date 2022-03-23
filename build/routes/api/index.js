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
const getAllImages_1 = require("../../utilities/getAllImages");
const routes = express_1.default.Router();
routes.get('/api/image', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { height, width, image_name } = req.query;
    if (!image_name) {
        return res.status(401).render('index', {
            error: 'No image Name Exist',
            image: '',
            resizedImage: '',
        });
    }
    if (!height || !width) {
        return res.status(401).render('index', {
            error: 'invalid height or width, try again',
            image: '',
            resizedImage: '',
        });
    }
    const imagesClass = new getAllImages_1.Images();
    const originalImages = yield imagesClass.getAllImages(path_1.default.resolve('./assets/images/full'));
    const imageExist = originalImages.filter((el) => {
        return el === image_name;
    });
    if (!imageExist[0]) {
        return res.status(404).render('index', {
            error: 'Images is not avaliable or not found',
            image: ``,
            resizedImage: ``,
        });
    }
    else {
        const imageBuffer = fs_1.default.readFileSync(`./assets/images/full/${image_name}`);
        const processedImage = yield imagesClass.save(imageBuffer, +width, +height, `${image_name}`);
        res.status(200).render('index', {
            error: '',
            image: `${image_name}`,
            resizedImage: `${processedImage}`,
        });
    }
}));
exports.default = {
    routes,
};
