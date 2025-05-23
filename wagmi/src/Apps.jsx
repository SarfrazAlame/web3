import { createPublicClient, http } from "viem";
import "./App.css";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { mainnet } from "viem/chains";

async function getBalance() {
  const client = createPublicClient({
    chain: mainnet,
    transport: http(),
  });
  // "0x075c299cf3b9FCF7C9fD5272cd2ed21A4688bEeD"
  const balance = await client.getBalance({
    address: "0x3e5D85Cf342f82e569c21E83248fC1D91Df303Cd",
  });
  return balance.toString();
}

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Todos />
    </QueryClientProvider>
  );
}

function Todos() {
  // Queries
  const {
    data,
    isLoading,
    error
  } = useQuery({
    queryKey: ["balance"],
    queryFn: getBalance,
    refetchInterval: 10 * 1000,
  });

  return (
    <div>
      Balance:
      {data}
    </div>
  );
}

export default App;
