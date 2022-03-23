"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const index_1 = __importDefault(require("./routes/api/index"));
const app = (0, express_1.default)();
const port = 8080;
/**
 * App usage and declarations
 */
app.set('views', path_1.default.resolve('views'));
app.set('view engine', 'ejs');
app.use(express_1.default.urlencoded({
    extended: false,
}));
app.use(express_1.default.static(path_1.default.resolve('assets')));
app.use(index_1.default.routes);
/**
 * App Routes
 */
app.get('/', (req, res) => {
    res.status(200).render('index', {
        error: '',
        image: '',
        resizedImage: '',
    });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
exports.default = app;
