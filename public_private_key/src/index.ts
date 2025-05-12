import { Keypair } from "@solana/web3.js"
import nacl from "tweetnacl"

// Generate a new Keypair
const keypair = Keypair.generate()

// Extract the public and private key
const publicKey = keypair.publicKey.toBytes();
const secretKey = keypair.secretKey;

// Display the keys
console.log("Public Key", publicKey);
console.log("Private Key (Secret key)", secretKey);

// Convert message "Hello World" to a Uint8Array
const message = new TextEncoder().encode("Hello World");

const signature = nacl.sign.detached(message, secretKey);
const result = nacl.sign.detached.verify(
    message,
    signature,
    keypair.publicKey.toBytes(),
)

console.log(result)

//////////////////////////////////////////////// generating 12 word phrase

import {generateMnemonic, validateMnemonic} from "bip39"

const words = generateMnemonic(12)

console.log(words)