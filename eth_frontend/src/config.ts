import { http, createConfig } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { injected, metaMask } from 'wagmi/connectors';

export const config = createConfig({
    connectors: [injected()],
    chains: [mainnet],
    transports: {
        [mainnet.id]: http(),
    },
})