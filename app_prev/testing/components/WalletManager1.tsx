import CardLoading from "@/app_prev/components/Skeleton";
import SummaryTable from "@/app_prev/components/SummaryTable";
import TestCard from "./TestCard";
import WalletDisplay from "./WalletDisplay";
import {
  ChangeEvent,
  Suspense,
  useState,
} from "react";

export default function WalletManager() {
  var addressArr = WalletDisplay();

  return (
    <div className="align-center py-32 mx-40">
      <h1>Your Portfolio</h1>

      <div className="flex w-full">
        <div className="w-1/2 mr-1.5">
          {addressArr &&
            addressArr.map((wallet, key) => (
              <TestCard
                walletAddress={wallet}
                key={key}
              />
            ))}
        </div>
        <div className="w-1/2 ml-1.5">
          <SummaryTable wallets={addressArr} />
        </div>
      </div>
    </div>
  );
}
