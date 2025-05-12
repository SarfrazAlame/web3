"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_js_1 = require("@solana/web3.js");
const tweetnacl_1 = __importDefault(require("tweetnacl"));
// Generate a new Keypair
const keypair = web3_js_1.Keypair.generate();
// Extract the public and private key
const publicKey = keypair.publicKey.toBytes();
const secretKey = keypair.secretKey;
// Display the keys
console.log("Public Key", publicKey);
console.log("Private Key (Secret key)", secretKey);
// Convert message "Hello World" to a Uint8Array
const message = new TextEncoder().encode("Hello World");
const signature = tweetnacl_1.default.sign.detached(message, secretKey);
const result = tweetnacl_1.default.sign.detached.verify(message, signature, keypair.publicKey.toBytes());
console.log(result);
