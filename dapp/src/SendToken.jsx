import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";

export default function SendToken() {
  const wallet = useWallet();
  const { connection } = useConnection();

  async function sendToken() {
    let to = document.getElementById("to").value;
    let amount = document.getElementById("amount").value;
    const transaction = new Transaction();

    transaction.add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: new PublicKey(to),
        lamports: amount * LAMPORTS_PER_SOL,
      })
    );

    await wallet.sendTransaction(transaction, connection);
    alert("sent" + amount + "SOL to " + to);
  }

  return (
    <div>
      <input type="text" name="" id="to" placeholder="to"/>
      <input type="text" name="" id="amount" placeholder="amount"/>
      <button onClick={sendToken}>Send</button>
    </div>
  );
}
