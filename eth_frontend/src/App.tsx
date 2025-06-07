
import { useAccount, useConnect, useConnectors, useDisconnect, WagmiProvider } from "wagmi";
import { config } from "./config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <ConnectWallet />
      </QueryClientProvider>
    </WagmiProvider>
  )
}

function ConnectWallet() {
  const { address } = useAccount()
  const connectors = useConnectors()
  const { disconnect } = useDisconnect()

  const { connect } = useConnect()

  if (address) {
    return <div>
      you are connected {address}
      <button onClick={() => {
        disconnect()
      }}>Disconnect</button>
    </div>
  }
  return <div>
    {
      connectors.map(connector => <button onClick={() => connect({ connector: connector })}>
        Connect via {connector.name}
      </button>)
    }
  </div>
}

export default App;