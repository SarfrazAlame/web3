import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'

const Airdropsol = () => {
    const { connection } = useConnection()
    const wallet = useWallet()

    function handleRequestAirdrop() {
        const publicKey = wallet.publicKey;
        const amount = document.getElementById("amount").value;

        connection.requestAirdrop(publicKey, amount * LAMPORTS_PER_SOL)
        alert(`${amount} sol sent to ${publicKey}`)
    }

    return (
        <div>
            <p>Airdrop sol to your account</p>
            <input type="text" name="" id="amount" placeholder='Amount...' />
            <button onClick={() => handleRequestAirdrop()}>Send</button>
            {wallet.publicKey?.toBase58()}
        </div>
    )
}

export default Airdropsol
