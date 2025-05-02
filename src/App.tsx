// src/App.tsx
import React from "react";
import { useEffect, useState } from "react";
import { useAccount, useConnect } from "wagmi";
import sdk from "@farcaster/frame-sdk";

export default function App() {
  const { isConnected, address } = useAccount();
  const { connect, connectors } = useConnect();

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
          context.user.username && setUsername(context.user.username);
        }
      } catch (err) {
        console.warn("Farcaster SDK error:", err);
      }
      setContextReady(true);
    };

    init();
  }, []);

  const handleConnect = () => {
    const connector = connectors.find((c) => c.id === "metaMask");
    if (!connector) return alert("MetaMask connector not available");
    connect({ connector });
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🧪 Monad MiniApp</h1>

      <section style={{ marginBottom: "2rem" }}>
        <h2>👛 Wallet</h2>
        {isConnected ? (
          <div>Connected address: {address}</div>
        ) : (
          <button onClick={handleConnect}>Connect MetaMask</button>
        )}
      </section>

      <section>
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
    </div>
  );
}
