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
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
let CURRENT_BLOCK_NUMBER = 22702192;
const provider = new ethers_1.JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/5_hSdhpo5nezv55QIrqET");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // get the interested addresses from the DB
        const interestedAddress = ["0x3A8C8b086A128A6D3093de4d18C6aa86FfeD4188", "0xe3085f152812418202701d54baA1B9fB538eEdD2", "0xe770Ff869256484c677FCE8a9b5658c4FF26e7e6"];
        // Inspect the block for native eth transactions on one of these addresses
        const block = yield provider.getBlock(CURRENT_BLOCK_NUMBER, true);
        console.log(block);
        // bad approach => update the balance in the database
    });
}
main();
