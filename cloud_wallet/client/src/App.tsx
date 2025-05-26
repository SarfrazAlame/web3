import axios from 'axios'
import './App.css'
import { Transaction, Connection, PublicKey, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js'

const connection = new Connection("https://solana-mainnet.g.alchemy.com/v2/nlLQ116h1wKZjZWZLjFR10wraVXtYTJq")

const fromPubkey = new PublicKey("C4zvHz5sMadhFyFGaiMrYMQ5e8QkMEqHuEZM8331YkND")

function App() {

  async function sendSol() {
    const ix = SystemProgram.transfer({
      fromPubkey: fromPubkey,
      toPubkey: new PublicKey("C14ZuqxPxY38ZkbULvBA7Cm6jqQ2uKshbGj5WqPxHRfB"),
      lamports: 0.001 * LAMPORTS_PER_SOL
    })

    const tx = new Transaction().add(ix)

    const { blockhash } = await connection.getLatestBlockhash()
    tx.recentBlockhash = blockhash
    tx.feePayer = fromPubkey

    // convert the transaction to a bunch of bytes
    const serializedTx = tx.serialize({
      requireAllSignatures: false,
      verifySignatures: false
    })

    console.log("from frontend", serializedTx)

    await axios.post("http://localhost:3000/api/v1/txn/sign", {
      message: serializedTx,
      retry: false
    })
  }


  return (
    <div>
      <input type="text" name="" id="" placeholder='Amount' />
      <input type="text" name="" id="" placeholder='Address' />
      <button onClick={sendSol}>Submit</button>
    </div>
  )
}

export default App
