import { useWallet } from '@solana/wallet-adapter-react'
import React from 'react'

const Model = () => {
    const wallet = useWallet()
    return (
        <div>
            {wallet.publicKey?.toString()}
        </div>
    )
}

export default Model