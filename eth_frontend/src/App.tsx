
import { useAccount, useConnect, useConnectors, useDisconnect, useReadContract, WagmiProvider } from "wagmi";
import { config } from "./config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Address } from "viem";
import { AllowUSDT } from "./AllowUSDT";

const client = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <ConnectWallet />
        <TotalSupply />
        <Account />
        <AllowUSDT />
      </QueryClientProvider>
    </WagmiProvider>
  )
}

function Account() {
  const { address } = useAccount()
  return <div>
    {
      address ? "You are connected " + address : "You are not Connected"
    }
  </div>
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


function TotalSupply() {
  const { address } = useAccount()
  const { data, isLoading, error } = useReadContract({
    address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    abi: [
      {
        "constant": true, "inputs": [{ "name": "who", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      }
    ],
    functionName: "balanceOf",
    args: [address?.toString() as Address]
  })

  if (isLoading) {
    return <div>
      Loading....
    </div>
  }
  return (
    <div>
      {/* Total supply is {data?.toString()} */}
      Your USDT Balance is {data?.toString()}
    </div>
  )
}

export default App;

