import { http, createConfig } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { injected, metaMask } from 'wagmi/connectors';

export const config = createConfig({
    connectors: [injected()],
    chains: [mainnet],
    transports: {
        [mainnet.id]: http("https://eth-mainnet.g.alchemy.com/v2/iwnhLTcUCNedw8OKjdgMiX75kyL7N1K-"),
    },
})