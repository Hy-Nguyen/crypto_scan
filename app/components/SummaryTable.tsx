import React, { useState } from 'react';
import { Divider } from "@nextui-org/react";

export default function SummaryTable(props: {
  wallets: string[]; // Wallet Adresses being pulled
  onDeleteWallet: (index: number) => void;
}) {

// Define WalletList component
function WalletList({ wallets, onDeleteWallet }: { wallets: string[]; onDeleteWallet: (index: number) => void }) {
  const maxAddressLength = 50; // Max length for wallet address per line (about 50 characters)
  const deleteButtonMargin = '10ch'; // Margin between delete button 'X', and listed addreese

  // Wallet Summaries Styling
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {wallets.map((wallet, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ flex: '1 0', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: `${maxAddressLength}ch` }}>
            {wallet}
          </span>

          {/* Delete BUTTON in Wallet List 'X' */}
          <button onClick={() => onDeleteWallet(index)} style={{ marginLeft: deleteButtonMargin }}>X</button>
        </div>
      ))}
    </div>
  );
}

  // Define WalletForm component 
  function WalletForm({ onAddWallet }: { onAddWallet: (newWallet: string) => void }) {
    const [walletAddress, setWalletAddress] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onAddWallet(walletAddress);
      setWalletAddress('');
    };

    // * * * TEMPORARY * * * Wallet TEXT BOX
    return (
      <form onSubmit={handleSubmit}>
        <input type="text"
          placeholder="Enter Wallet Address"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}

          // Wallet TEXT BOX style
          style={{
             margin: '10px 30px 10px 0px',
             border: '3px solid rgb(102,101,214)', 
             borderRadius: '4px',
             padding:'4px'
            }}/>

        {/* "Add Wallet" BUTTON & Style */}
        <button 
         type="submit" 
         style={{ margin: '10px 0px', 
         border: '3px solid rgb(102, 101, 214)',
         borderRadius: '4px',
         padding: '4px',
         backgroundColor: 'rgb(102, 101, 214)',
         color: 'white',
         cursor: 'pointer'
         }}> Add Wallet 
        </button>
      </form>
    );
  }

  // Define App component
  function App() {
    const [wallets, setWallets] = useState<string[]>(props.wallets);

    // + Add Wallet Address to List
    const handleAddWallet = (newWallet: string) => {
      setWallets([...wallets, newWallet]);
    };

    // - Delete Listed Wallet Address
    const handleDeleteWallet = (index: number) => {
      setWallets(wallets.filter((_, i) => i !== index));
    };

    // Displaying Wallet Sumaries, Wallet Count, Wallet Input Form, and Wallet List
    return (
      <div>
        <h1>Wallet Summaries ({wallets.length})</h1>
        <WalletForm onAddWallet={handleAddWallet} />
        <WalletList wallets={wallets} onDeleteWallet={handleDeleteWallet} />
      </div>
    );
  }

  // The code below should be on a separate block/box in css
  return (
    <div className="bg-white text-black rounded-xl p-6 w-full flex-row my-3 h-1/2">
      <App />
      <h2>Citrus:</h2>
      {/* Wallet List Start */}
      <div className="pl-4  whitespace-nowrap inline-block">
        <p className="inline-block">
          Current Loaned: Loading...
        </p>
        <p>Pending Offers: Loading...</p>
        <p>Citrus Total: Loading...</p>
      </div>
      <Divider className="my-3  " />
      <h2>Tensor:</h2>
      <div className="pl-4  whitespace-nowrap inline-block">
        <p className="inline-block">
          Total NFT Pool Value:
          {"  Loading..."}
        </p>
        <p>
          Total NFT Fee Value:
          {"  Loading..."}
        </p>
        <p>
          Total NFT Liquidity Pool Value:
          {"  Loading..."}
        </p>
      </div>
    </div>
  );
}
