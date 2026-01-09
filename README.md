# File Vault

A decentralized file storage application built as a learning project to explore IPFS integration with Pinata. This project combines Next.js frontend with Hardhat smart contracts to create a Web3 file management system.

## 🎯 Purpose

This project was created as a learning platform to understand:
- How IPFS (InterPlanetary File System) works
- Integration with Pinata for IPFS pinning services
- Combining Web3 wallet integration with decentralized storage
- Building full-stack dApps with Next.js and Hardhat

## 🛠️ Tech Stack

### Frontend
- **Next.js 16.1.1** - React framework
- **React 19.2.3** - UI library
- **TailwindCSS 4** - Styling
- **TypeScript** - Type safety

### Web3 & Blockchain
- **Hardhat 3.1.3** - Smart contract development
- **Wagmi 3.2.0** - React hooks for Ethereum
- **Viem 2.44.0** - Ethereum client
- **RainbowKit 2.2.10** - Wallet connection UI
- **MetaMask SDK 0.34.0** - Wallet integration

### IPFS & Storage
- **Pinata 2.5.2** - IPFS pinning service SDK

### Development Tools
- **Hardhat Ignition 3.0.6** - Deployment management
- **ESLint** - Code linting
- **dotenv** - Environment variable management

## 📁 Project Structure

```
file_vault/
├── .next/                  # Next.js build output
├── artifacts/             # Hardhat compiled contracts (gitignored)
├── cache/                 # Hardhat cache (gitignored)
├── contracts/            # Solidity smart contracts
├── ignition/             # Hardhat Ignition deployment configs
├── node_modules/         # Dependencies
├── public/               # Static assets
├── scripts/              # Deployment and utility scripts
├── src/                  # Next.js source code
├── test/                 # Smart contract tests
├── .env                  # Environment variables (gitignored)
├── .gitignore           
├── eslint.config.mjs    
├── hardhat.config.ts     # Hardhat configuration
├── next.config.ts        # Next.js configuration
├── package.json         
├── postcss.config.mjs   
├── tsconfig.json        
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- pnpm (Package manager)
- MetaMask wallet
- Pinata account (for IPFS pinning)
- WalletConnect Project ID (from [WalletConnect Cloud](https://cloud.walletconnect.com/))

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd file_vault
```

2. Install dependencies
```bash
pnpm install
```

3. Set up environment variables

Create a `.env` file in the root directory:
```env
# Sepolia Testnet Configuration
SEPOLIA_RPC_URL=your_sepolia_rpc_url
SEPOLIA_PRIVATE_KEY=your_wallet_private_key

# WalletConnect Project ID
NEXT_PUBLIC_PROJECT_ID=your_walletconnect_project_id

# Pinata IPFS Configuration
PINATA_JWT=your_pinata_jwt_token
NEXT_PUBLIC_GATEWAY_URL=your_pinata_gateway_url
```

4. Compile smart contracts
```bash
npx hardhat compile
```

5. Run tests
```bash
npx hardhat test
```

6. Start the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npx hardhat compile` - Compile smart contracts
- `npx hardhat test` - Run contract tests

## 🔗 Key Features

- Connect Web3 wallet using RainbowKit
- Upload files to IPFS via Pinata
- Store file metadata on blockchain
- Retrieve and display files from IPFS
- Decentralized file management

## 📚 Learning Outcomes

Through this project, I learned:
- IPFS concepts and how decentralized storage works
- Using Pinata as an IPFS pinning service
- Integrating Web3 wallets with modern React applications
- Smart contract development with Hardhat
- Building full-stack decentralized applications
- Managing environment variables and API keys securely

## 🤝 Contributing

This is a learning project, but feel free to fork it and experiment! If you find any issues or have suggestions, please open an issue.

## 📄 License

This project is for educational purposes.

## 🙏 Acknowledgments

- [Pinata](https://pinata.cloud/) for IPFS pinning services
- [Hardhat](https://hardhat.org/) for smart contract development tools
- [RainbowKit](https://www.rainbowkit.com/) for wallet connection UI
- [Next.js](https://nextjs.org/) documentation and community

---

**Note**: This is a learning project created to understand IPFS and Web3 integration. It may not be production-ready and should be used for educational purposes only.
