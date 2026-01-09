import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia } from "wagmi/chains";

export const config = getDefaultConfig({
    appName: "File Vault",
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
    chains: [sepolia],
    ssr: true
})