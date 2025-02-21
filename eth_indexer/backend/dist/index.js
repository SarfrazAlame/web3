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
const ethers_1 = require("ethers");
const bip39_1 = require("bip39");
const config_1 = require("./config");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const seed = (0, bip39_1.mnemonicToSeedSync)(config_1.MNUENOMICS);
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const result = yield prisma.binanceUser.create({
        data: {
            username,
            password,
            depositeAddress: "",
            privateKey: "",
            balance: ""
        }
    });
    const userId = result.id;
    const hdNode = ethers_1.HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(`m/44'/60'/${userId}'/0`);
    yield prisma.binanceUser.updateMany({
        data: {
            depositeAddress: child.address,
            privateKey: child.privateKey
        },
        where: {
            id: userId
        }
    });
    res.json({
        userId
    });
}));
app.get("/depositAddress", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.binanceUser.findMany();
    res.json({
        user
    });
}));
app.listen(3000, () => {
    console.log("Server is running");
});
