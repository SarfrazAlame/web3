import { ConnectionProvider, WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react"
import { WalletProvider } from "@solana/wallet-adapter-react"
import TokenLaunch from "./TokenLaunch"

function App() {
  return (
    <ConnectionProvider endpoint="https://api.devnet.solana.com">
      <WalletProvider wallets={[]}>
        <WalletModalProvider>
          <div>
            <WalletMultiButton />
          </div>
          <div>
            <TokenLaunch  />
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default App
