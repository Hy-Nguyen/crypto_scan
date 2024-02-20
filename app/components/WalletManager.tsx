"use client";
import React, {
  useState,
  ChangeEvent,
  Suspense,
} from "react";
import ViewCard from "./ViewCard";
import { card } from "@nextui-org/react";
import TestCard from "./TestCard";
import TestCard2 from "./TestCard2";
import SummaryTable from "./SummaryTable";
import getCitrus from "@/scanner_code/citrus"; // Assuming this is an imported function
import getTensor from "@/scanner_code/tensor";
import CardLoading from "./Skeleton";

interface CitrusData {
  loaned: string;
  offers: string;
  total: string;
}

interface TensorData {
  NFTValue: string;
  FeeValue: string;
  PoolLiquidity: string;
}

interface ResultData {
  [key: string]: {
    citrus: CitrusData;
    tensor: TensorData;
  };
}

export default function WalletManager() {
  const walletArr = ["SOL", "Tensor", "Doge"];
  const addressArr = [
    "428JqXgFg3yjuMoa4ZkKi7MBJLn2thvpSTH6HS2NLQC1",
    "G7AWxhckzMNgnPpWY8uYJULFZAwM8dmGWXWmK1FY5e12",
    "7Qud71boqj86Pi8TBkSTzY2h3VPASGpqCTb5gWoG9fLM",
  ];

  function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
  }

  const [walletType, setWalletType] = useState(
    walletArr[0]
  );

  function handleDropdownChange(
    event: ChangeEvent<HTMLSelectElement>
  ) {
    setWalletType(event.target.value);
  }

  const [walletAddress, setWalletAddress] =
    useState("");

  function handleAddressChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    setWalletAddress(event.target.value);
  }

  return (
    <div className="align-center py-32 mx-40">
      <div className="">
        <form
          onSubmit={handleSubmit}
          className=" flex flex-row justify-center pb-10"
        >
          <select
            value={walletType}
            onChange={handleDropdownChange}
            className=" text-black h-12 w-24 text-center rounded-l-xl border-r"
          >
            {walletArr.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Enter Wallet Address"
            value={walletAddress}
            onChange={handleAddressChange}
            className="text-black h-12 w-full pl-2"
          />

          <button
            type="submit"
            className="bg-p3 hover:bg-p3 text-white py-2 px-8 h-12 rounded-r-xl"
          >
            Add
          </button>
        </form>
      </div>
      <div className="flex w-full">
        <div className="w-1/2 mr-1.5">
          {/* {addressArr.map((wallet, key) => (
            <ViewCard
              walletAddress={wallet}
              key={key}
            />
          ))} */}

          <Suspense fallback={<CardLoading />}>
            <TestCard
              walletAddress={addressArr[0]}
            />
          </Suspense>
          <Suspense fallback={<CardLoading />}>
            <TestCard
              walletAddress={addressArr[2]}
            />
          </Suspense>
          <Suspense fallback={<CardLoading />}>
            <TestCard
              walletAddress={addressArr[1]}
            />
          </Suspense>
        </div>
        <div className="w-1/2 ml-1.5">
          <SummaryTable wallets={addressArr} />
        </div>
      </div>
    </div>
  );
}
