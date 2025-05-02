// src/WalletActions.tsx
import { parseEther } from "viem";
import { monadTestnet } from "@wagmi/core/chains";
import {
  useAccount,
  useDisconnect,
  useSendTransaction,
  useSwitchChain,
} from "wagmi";

export function WalletActions() {
  const { isConnected, address, chainId } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: hash, sendTransaction } = useSendTransaction();
  const { switchChain } = useSwitchChain();

  const sendTransactionHandler = () => {
    sendTransaction({
      to: "0x59E6607Ed5f6E08077248895254aeB25463437Bd",
      value: parseEther("1"),
    });
  };

  if (!isConnected) {
    return <p>🛑 Wallet not connected (must be in Farcaster Frame)</p>;
  }

  return (
    <div style={{ border: "1px solid #333", padding: "1rem", borderRadius: "8px" }}>
      <h2>🧪 Wallet Info</h2>
      <p>Connected Wallet: <code>{address}</code></p>
      <p>Chain ID: <code>{chainId}</code></p>

      {chainId === monadTestnet.id ? (
        <>
          <button onClick={sendTransactionHandler}>
            Send 1 MON to test address
          </button>
          {hash && (
            <p>
              TX sent!{" "}
              <a
                href={`https://testnet.monadexplorer.com/tx/${hash}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Monad Explorer
              </a>
            </p>
          )}
        </>
      ) : (
        <button onClick={() => switchChain({ chainId: monadTestnet.id })}>
          Switch to Monad Testnet
        </button>
      )}

      <button onClick={() => disconnect()} style={{ marginTop: "1rem" }}>
        Disconnect
      </button>
    </div>
  );
}
