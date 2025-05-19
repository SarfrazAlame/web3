import {
  createInitializeAccount2Instruction,
  createInitializeMintInstruction,
  getMinimumBalanceForRentExemptMint,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair } from "@solana/web3.js";
import { useState } from "react";
import { Transaction, SystemProgram } from "@solana/web3.js";

export function TokenLaunchpad() {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [image, setImage] = useState("");
  const [initialSupply, setInitialSupply] = useState("");

  const { connection } = useConnection();
  const wallet = useWallet();

  async function createToken() {
    const lamports = await getMinimumBalanceForRentExemptMint(connection);
    const keypair = Keypair.generate();

    const transaction = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: wallet.publicKey,
        newAccountPubkey: keypair.publicKey,
        space: MINT_SIZE,
        lamports,
        programId: TOKEN_PROGRAM_ID,
      }),
      createInitializeMintInstruction(
        keypair.publicKey,
        6,
        wallet.publicKey,
        wallet.publicKey,
        TOKEN_PROGRAM_ID
      )
    );

    transaction.feePayer = wallet.publicKey;
    const recentBlockhash = await connection.getLatestBlockhash();
    transaction.recentBlockhash = recentBlockhash.blockhash;

    transaction.partialSign(keypair);
    let response = await wallet.sendTransaction(transaction, connection);
    console.log(response);
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Solana Token Launchpad</h1>
      <input
        className="inputText"
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      ></input>{" "}
      <br />
      <input
        className="inputText"
        type="text"
        placeholder="Symbol"
        onChange={(e) => setSymbol(e.target.value)}
      ></input>{" "}
      <br />
      <input
        className="inputText"
        type="text"
        placeholder="Image URL"
        onChange={(e) => setImage(e.target.value)}
      ></input>{" "}
      <br />
      <input
        className="inputText"
        type="text"
        placeholder="Initial Supply"
        onChange={(e) => setInitialSupply(e.target.value)}
      ></input>{" "}
      <br />
      <button className="btn" onClick={createToken}>
        Create a token
      </button>
    </div>
  );
}
