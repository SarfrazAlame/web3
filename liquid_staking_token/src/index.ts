import express from 'express'
import { mintTokens } from './mintToken';

const app = express()

app.post('/helius', async(req,res)=>{
    const fromAddress = req.body.fromAddress;
    const toAddress = req.body.toAddress;
    const amount = req.body.amount;
    const type = "received_native_sol";

    if(type === "received_native_sol"){
        await mintTokens(fromAddress,amount)
    }
    
})