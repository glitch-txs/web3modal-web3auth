import './App.css'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { walletConnectProvider, EIP6963Connector } from '@web3modal/wagmi'

import { WagmiConfig, configureChains, createConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { mainnet } from 'wagmi/chains'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import Web3AuthConnectorInstance from './web3auth'

import web3authLogo from './assets/web3auth_dark.svg'

// 1. Get projectId
const projectId = 'bd4997ce3ede37c95770ba10a3804dad'

// 2. Create wagmiConfig
const { chains, publicClient } = configureChains(
  [mainnet],
  [walletConnectProvider({ projectId }), publicProvider()]
)

const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new WalletConnectConnector({ chains, options: { projectId, showQrModal: false, metadata } }),
    new EIP6963Connector({ chains }),
    new InjectedConnector({ chains, options: { shimDisconnect: true } }),
    new CoinbaseWalletConnector({ chains, options: { appName: metadata.name } }),
    Web3AuthConnectorInstance(chains),
  ],
  publicClient
})

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains,
  connectorImages: {
    web3auth: web3authLogo
} })

export default function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <w3m-button/>
    </WagmiConfig>
  )
}
