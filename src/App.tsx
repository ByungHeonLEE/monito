// src/App.tsx
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import sdk from "@farcaster/frame-sdk";
import { WalletActions } from "./WalletActions";
import { WalletStatus } from "./components/WalletStatus";

export default function App() {
  const { isConnected } = useAccount();

  const [fid, setFid] = useState<number | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [contextReady, setContextReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await sdk.actions.ready();
        const context = await sdk.context;
        if (context?.user) {
          setFid(context.user.fid);
          setUsername(context.user.username ?? null);
        }
      } catch (err) {
        console.warn("Farcaster SDK error:", err);
      }
      setContextReady(true);
    };

    init();
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🌐 Monad MiniApp</h1>

      <section style={{ marginBottom: "2rem" }}>
        <h2>📡 Farcaster Frame Info</h2>
        {contextReady ? (
          fid ? (
            <ul>
              <li>FID: {fid}</li>
              <li>Username: {username}</li>
            </ul>
          ) : (
            <p>Not in Frame (context is empty)</p>
          )
        ) : (
          <p>Loading Farcaster context...</p>
        )}
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>👛 Wallet Status</h2>
        <WalletStatus />
      </section>

      {isConnected && <WalletActions />}
    </div>
  );
}
