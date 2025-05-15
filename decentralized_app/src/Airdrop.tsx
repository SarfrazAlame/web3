import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { PublicKey } from "@solana/web3.js";

export default function Airdrop() {
    const wallet = useWallet()
    const { connection } = useConnection()

    async function sendAirdropUser() {
        await connection.requestAirdrop(wallet.publicKey, 1000000000)
        alert("hiii")
    }

    return (
        <div>
            you address {wallet.publicKey?.toString()}
            <input type="text" placeholder="Amount"></input>
            <button onClick={sendAirdropUser}>Send Airdrop</button>
        </div>
    )
}