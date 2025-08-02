import { ConnectionProvider } from "@solana/wallet-adapter-react"
import { WalletProvider } from "@solana/wallet-adapter-react"
import { WalletDisconnectButton, WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui"

import TokenLaunchpad from "./TokenLaunchpad"

function App() {
  return (
    <ConnectionProvider endpoint="https://api.devnet.solana.com">
      <WalletProvider wallets={[]}>
        <WalletModalProvider>
          <div style={{ display: 'flex', flexDirection: "column", width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ display: "flex", width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <WalletMultiButton />
              <WalletDisconnectButton />
            </div>
            <div>
              <TokenLaunchpad />
            </div>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default App
