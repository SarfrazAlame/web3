import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import Airdropsol from "./AirdropSol"
import Model from "./Model"
import SendToken from "./SendToken"
import SignMessage from "../SignMessage"

function App() {
  
  return (
    <>
      <ConnectionProvider endpoint="https://api.devnet.solana.com">
        <WalletProvider wallets={[]}>
          <WalletModalProvider>
            <div style={{}}>
              <div>
                <WalletMultiButton />
                <Model/>
              </div>
              <div style={{ display:'flex', flexDirection:'column',marginTop: '12px', rowGap:'12px' }}>
                <Airdropsol />
                <SendToken/>
                <SignMessage/>
              </div>
            </div>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider> 
    </>
  )
}

export default App
