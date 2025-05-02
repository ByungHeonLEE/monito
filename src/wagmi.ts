// src/wagmi.ts
import { farcasterFrame } from "@farcaster/frame-wagmi-connector";
import { http, createConfig } from "wagmi";
import { monadTestnet } from "wagmi/chains";
import { injected } from "wagmi/connectors";

export const config = createConfig({
  chains: [monadTestnet],
  connectors: [
    farcasterFrame(),
    injected(),
  ],
  transports: {
    [monadTestnet.id]: http(),
  },
});

export default config;
