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
exports.Images = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
class Images {
    getAllImages(imagesFolder) {
        return new Promise((reslove, reject) => {
            // const imagesFolder = path.resolve('./assets/images/full');
            // console.log(imagesFolder);
            fs_1.default.readdir(imagesFolder, (err, f) => {
                if (f.length === 0 || err) {
                    console.log(err);
                    reject(`${err}`);
                }
                reslove(f);
            });
        });
    }
    // public imageProcessing(){
    // }
    save(buffer, w, h, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileName = name.split('.')[0];
            const fileExt = name.split('.')[1];
            const newName = Images.filename(fileName, fileExt, w, h);
            const imagesFolder = path_1.default.resolve(`./assets/images/thumbnails/${newName}`);
            yield (0, sharp_1.default)(buffer)
                .resize({
                width: w,
                height: h,
            })
                .toFile(imagesFolder);
            return newName;
        });
    }
    static filename(name, ext, w, h) {
        return `${name}-${w}-${h}.${ext}`;
    }
}
exports.Images = Images;
// export default {
//   getAllimages: GetAllIamges,
// };
