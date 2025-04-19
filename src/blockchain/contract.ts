import { ethers } from 'ethers';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';

// Import your contract ABI using path alias
import WndTipperABI from '../contracts/WndTipper.json';
import { getNetworkConfig } from '@/config';

// Will be determined dynamically based on connected network
let CONTRACT_ADDRESS: string;

/**
 * Initializes connection to the smart contract
 */
export async function initializeContract() {
  // First, enable the Polkadot extension
  const extensions = await web3Enable('WndTipper App');
  
  if (extensions.length === 0) {
    throw new Error('No Polkadot extension found. Please install one.');
  }
  
  // Get accounts from Polkadot extension
  const allAccounts = await web3Accounts();
  
  if (allAccounts.length === 0) {
    throw new Error('No accounts found. Please create an account in your Polkadot extension.');
  }
  
  // Check for injected Ethereum provider (MetaMask or equivalent)
  const injectedProvider = (window as any).ethereum;
  if (!injectedProvider) {
    throw new Error('Please install MetaMask or another EVM compatible wallet');
  }
  
  const ethersProvider = new ethers.providers.Web3Provider(injectedProvider);
  await ethersProvider.send('eth_requestAccounts', []);
  const signer = ethersProvider.getSigner();
  
  // Get network info to determine contract address
  const network = await ethersProvider.getNetwork();
  const networkConfig = getNetworkConfig(network.chainId);
  
  if (!networkConfig) {
    throw new Error(`Unsupported network: ${network.name} (${network.chainId}). Please switch to a supported network.`);
  }
  
  CONTRACT_ADDRESS = WndTipperABI.networks[network.chainId.toString()]?.address;
  
  if (!CONTRACT_ADDRESS) {
    throw new Error(`Contract not deployed on network: ${network.name}`);
  }
  
  // Create contract instance
  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    WndTipperABI.abi,
    signer
  );
  
  return { 
    contract, 
    signer, 
    provider: ethersProvider,
    polkadotAccounts: allAccounts,
    network: networkConfig
  };
}
