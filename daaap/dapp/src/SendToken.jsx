import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js'
import { useState } from 'react'

const SendToken = () => {
    const [amount, setAmount] = useState(0)
    const [address, setAddress] = useState('')

    const { connection } = useConnection()
    const wallet = useWallet()
    const transaction = new Transaction()

    async function sendToken() {
        transaction.add(
            SystemProgram.transfer({
                fromPubkey: wallet.publicKey,
                toPubkey: new PublicKey(address),
                lamports: amount * LAMPORTS_PER_SOL
            })
        )

        await wallet.sendTransaction(transaction, connection)
        alert(`${amount} sol sent to ${address}`)
    }

    return (
        <div>
            <label>amount to send</label>
            <input type="amount" placeholder='Amount...' name="" id="amount" onChange={(e) => setAmount(e.target.value)} />
            <label>to</label>
            <input type="text" placeholder='Address...' name="" id="to" onChange={(e) => setAddress(e.target.value)} />
            <button onClick={() => sendToken()}>send</button>
        </div>
    )
}

export default SendToken
