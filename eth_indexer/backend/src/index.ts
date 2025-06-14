import express from 'express'
import pg from "pg"
import { HDNodeWallet } from "ethers"
import { mnemonicToSeedSync } from "bip39"
import { MNUENOMICS } from "./config";

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const seed = mnemonicToSeedSync(MNUENOMICS)

const app = express()
app.use(express.json())

app.post("/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const result = await prisma.binanceUser.create({
        data: {
            username,
            password,
            depositeAddress: "",
            privateKey: "",
            balance: ""
        }
    })

    const userId = result.id

    const hdNode = HDNodeWallet.fromSeed(seed)
    const child = hdNode.derivePath(`m/44'/60'/${userId}'/0`);

    await prisma.binanceUser.updateMany({
        data: {
            depositeAddress: child.address,
            privateKey: child.privateKey
        },
        where: {
            id: userId
        }
    })

    res.json({
        userId
    })
})

app.get("/depositAddress", async (req, res) => {
    const user = await prisma.binanceUser.findMany()
    res.json({
        user
    })
})

app.listen(3000, () => {
    console.log("Server is running")
});

