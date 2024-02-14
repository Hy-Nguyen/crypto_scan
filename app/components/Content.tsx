"use client";
import AddWallet from "./AddWallet";
import ViewCard from "./ViewCard";
import { useState } from "react";

export default function Content() {
  const [walletData, setWalletData] = useState<{
    walletType: string;
    walletAddress: string;
  }>({
    walletType: "",
    walletAddress: "",
  });

  function handleInputData(data: {
    walletType: string;
    walletAddress: string;
  }) {
    setWalletData(data);
  }
  return (
    <>
      <div className="m-auto align-center py-32">
        <AddWallet
          onSubmitWalletData={handleInputData}
        />
      </div>
      <div className="m-auto align-center py-32">
        {walletData.walletAddress}
        <ViewCard walletAddress={walletData} />
      </div>
    </>
  );
}
