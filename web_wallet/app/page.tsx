'use client'
import { generateMnemonic, mnemonicToSeed } from "bip39";
import { useState } from "react";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl"
import { EthWallet } from "./EthWallet";


export default function Home() {
  const [mnemonic, setMnemonic] = useState("");
  console.log(mnemonic)
  return (

    <div>
      <input type="text" value={mnemonic}></input>
      <button onClick={async function () {
        const mn = await generateMnemonic();
        setMnemonic(mn)
      }}>
        Create Seed Phrase
      </button>
      <SolanaWallet mnemonic={mnemonic} />
      <EthWallet mnemonic={mnemonic} /> 
    </div>

  );
}

function SolanaWallet({ mnemonic }: any) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState<any>([]);

  return <div>
    <button onClick={function () {
      const seed = mnemonicToSeed(mnemonic);
      const path = `m/44'/501'/${currentIndex}'/0'`;
      const derivedSeed = derivePath(path, seed.toString("hex")).key;
      const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
      const keypair = Keypair.fromSecretKey(secret);
      setCurrentIndex(currentIndex + 1);
      setPublicKeys([...publicKeys, keypair.publicKey]);
    }}>
      Add wallet
    </button>
    {publicKeys.map(p => <div>
      {p.toBase58()}
    </div>)}
  </div>
}
