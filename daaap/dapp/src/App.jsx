import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import Model from "./Model"
import AirdropSol from "./AirdropSol"

function App() {

  return (
    <>
      <ConnectionProvider endpoint="https://api.devnet.solana.com">
        <WalletProvider wallets={[]}>
          <WalletModalProvider>
            <div style={{}}>
              <div>
                <WalletMultiButton />
                <Model />
              </div>
              <div style={{marginTop:'12px'}}>
                <AirdropSol />
              </div>
            </div>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  )
}

export default App
