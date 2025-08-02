import { useWallet } from '@solana/wallet-adapter-react'
import React from 'react'

const SignMessage = () => {
    const { publicKey, signMessage } = useWallet()
    console.log(signMessage)
    return (
        <div>SignMessage</div>
    )
}

export default SignMessage

