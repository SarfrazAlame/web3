require('dotenv')
const express = require('express')
const { userModel } = require('./models')
const { Keypair, Transaction, Connection, PublicKey } = require('@solana/web3.js')
const jwt = require("jsonwebtoken")
const bs = require('bs58')
const cors = require('cors')
const app = express()

const connection = new Connection("https://solana-mainnet.g.alchemy.com/v2/nlLQ116h1wKZjZWZLjFR10wraVXtYTJq")

app.use(express.json())
app.use(cors())

const JWT_SECRET = "123456"

app.post("/api/v1/signup", async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    // validate the inputs using zod, check if the user already exists, hash the password

    // creating random keypair
    const keypair = new Keypair()

    await userModel.create({
        username,
        password,
        publicKey: keypair.publicKey.toString(),
        privateKey: keypair.secretKey.toString()
    })

    res.json({
        message: keypair.publicKey.toString()
    })
})

app.post("/api/v1/signin", async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const user = await userModel.findOne({
        username: username,
        password: password
    })

    if (user) {
        const token = jwt.sign({
            id: user
        }, JWT_SECRET)

        res.json({
            token
        })
    } else {
        res.json({
            message: "Credentials are incorrect"
        })
    }

})

app.post("/api/v1/tnx/sign", async (req, res) => {

    const serializedTransaction = req.body.message;


    const tx = Transaction.from(serializedTransaction)

    const keypair = new Keypair.fromSecretKey(bs58.default.decode(process.env.PRIVATE_KEY))

    const { blockhash } = await connection.getLatestBlockhash();
    tx.blockhash = blockhash
    tx.feePayer = keypair.publicKey

    tx.sign(keypair)

    const signature = await connection.sendTransaction(tx, [keypair])

    console.log("from backend", signature)

    res.json({
        message: "Signed in"
    })
})

app.get("api/v1/tnx", (req, res) => {
    res.json({
        message: "Signed in"
    })
})

app.listen(3000, () => {
    console.log("listening...")
})

