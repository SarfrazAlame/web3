import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  http,
  createConfig,
  useConnect,
  WagmiProvider,
  useAccount,
  useBalance,
  useSendTransaction,
} from "wagmi";
import { base, mainnet, optimism } from "wagmi/chains";
import { injected, metaMask, safe, walletConnect } from "wagmi/connectors";

const queryClient = new QueryClient();

export const config = createConfig({
  chains: [mainnet],
  connectors: [injected()],
  transports: {
    [mainnet.id]: http(),
  },
});

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <WalletConnector />
        <EthSend />
        <MyAddress />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

function MyAddress() {
  const { address } = useAccount();
  const balance = useBalance({ address });

  return (
    <div>
      {address} <br />
      {balance?.data?.formatted}
    </div>
  );
}

function WalletConnector() {
  const { connectors, connect } = useConnect();
  return (
    <div>
      {connectors.map((connector) => (
        <button key={connector.uid} onClick={() => connect({ connector })}>
          {connector.name}
        </button>
      ))}
    </div>
  );
}

function EthSend() {
  const { data: hash, sendTransaction } = useSendTransaction();

  function sendEth() {
    sendTransaction({
      to: document.getElementById("addr").value,
      value: "100000000000000000",
    });
  }

  return (
    <div>
      <input type="text" id="addr" placeholder="Address..." />
      <button onClick={sendEth}>Send 0.1 ETH</button>
      {hash}
    </div>
  );
}

export default App;
