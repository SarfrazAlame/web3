import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export default function RequestAirDrop() {
  const wallet = useWallet();
  const { connection } = useConnection();

  function handleRequestAirdrop() {
    const publicKey = wallet.publicKey;
    const amount = document.getElementById("amount").value;

    connection.requestAirdrop(publicKey, amount * LAMPORTS_PER_SOL);
  }
  return (
    <div>
      <input id="amount" type="text" placeholder="Amount..." />
      <button onClick={()=>handleRequestAirdrop}>Request airdrop</button>
      {wallet.publicKey?.toBase58()}
    </div>
  );
}
