import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js"
import { useEffect } from "react"
import { useState } from "react"

const Model = () => {
    const [balance, setBalance] = useState()
    const { connection } = useConnection()
    const wallet = useWallet()

    const getBalance = async () => {
        const blc = await connection.getBalance(wallet.publicKey) / LAMPORTS_PER_SOL
        setBalance(blc)
    }

    useEffect(() => {
        getBalance()
    }, [wallet])

    return (
        <div style={{ marginTop: '12px' }}>
            {balance}
        </div>
    )
}

export default Model