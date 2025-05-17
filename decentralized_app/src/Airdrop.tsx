import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { PublicKey } from "@solana/web3.js";
import { useState } from "react";

export default function Airdrop() {
    const wallet = useWallet()
    const { connection } = useConnection()
    const [num, setNum] = useState<string>('')

    async function sendAirdropUser() {
        await connection.requestAirdrop(wallet.publicKey as PublicKey, Number(num) * 1000000000)
        alert("hiii")
    }

    return (
        <div>
            you address {wallet.publicKey?.toString()}
            <input type="text" placeholder="Amount" onChange={e => setNum(e.target.value)}></input>
            <button onClick={sendAirdropUser}>Send Airdrop</button>
        </div>
    )
}
