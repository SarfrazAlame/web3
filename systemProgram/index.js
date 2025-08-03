const { SystemProgram, Transaction, Keypair, Connection, LAMPORTS_PER_SOL } = require("@solana/web3.js")

const payer = Keypair.fromSecretKey(Uint8Array.from([21, 64, 223, 83, 196,
    218, 24, 214, 44, 43, 152, 248, 182, 83, 219, 209, 133, 117, 83, 117, 94, 86, 52, 164,
    20, 176, 199, 192, 232, 26, 168, 55, 197, 189, 142, 156, 60, 35, 55, 81, 132, 120, 159,
    8, 122, 148, 12, 32, 52, 178, 71, 68, 86, 129, 60, 141, 145, 100, 196, 163, 69, 30, 98, 12]))

const connection = new Connection("https://api.devnet.solana.com", 'confirmed')

async function main() {
    const newAccount = Keypair.generate()
    const transaction = new Transaction()

    const balance = await connection.getBalance(payer.publicKey)
    console.log(`Payer balance: ${balance/LAMPORTS_PER_SOL} SOL`)   

    transaction.add(
        SystemProgram.transfer({
            fromPubkey: payer.publicKey,
            toPubkey: newAccount.publicKey,
            lamports: 0.1 * 1000000000
        })
    )

    await connection.sendTransaction(transaction, [payer])
    console.log(`Transferred to ${newAccount.publicKey?.toBase58()}`)
}

main()

