import CardLoading from "@/app/components/Skeleton";
import SummaryTable from "@/app/components/SummaryTable";
import TestCard from "./TestCard";
import {
  ChangeEvent,
  Suspense,
  useState,
} from "react";

export default function WalletManager() {
  const addressArr = [
    "428JqXgFg3yjuMoa4ZkKi7MBJLn2thvpSTH6HS2NLQC1",
    "G7AWxhckzMNgnPpWY8uYJULFZAwM8dmGWXWmK1FY5e12",
    "7Qud71boqj86Pi8TBkSTzY2h3VPASGpqCTb5gWoG9fLM",
  ];

  return (
    <div className="align-center py-32 mx-40">
      <h1>Your Portfolio</h1>

      <div className="flex w-full">
        <div className="w-1/2 mr-1.5">
          {addressArr.map((wallet, key) => (
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
