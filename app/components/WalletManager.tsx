"use client";
import React, {
  useState,
  ChangeEvent,
} from "react";
import ViewCard from "./ViewCard";
import { card } from "@nextui-org/react";
import TestCard from "./TestCard";
import TestCard2 from "./TestCard2";
import SummaryTable from "./SummaryTable";

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
    <div className="m-auto align-center py-32">
      <div>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-row m-auto"
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
            className="text-black h-12 w-96 pl-2"
          />

          <button
            type="submit"
            className="bg-p3 hover:bg-p3 text-white py-2 px-8 h-12 rounded-r-xl"
          >
            Add
          </button>
        </form>
      </div>
      <div className="flex-col">
        <div>
          {/* {addressArr.map((wallet, key) => (
            <ViewCard
              walletAddress={wallet}
              key={key}
            />
          ))} */}
          <TestCard walletAddress="428JqXgFg3yjuMoa4ZkKi7MBJLn2thvpSTH6HS2NLQC1" />
          <TestCard walletAddress="G7AWxhckzMNgnPpWY8uYJULFZAwM8dmGWXWmK1FY5e12" />
          <TestCard walletAddress="7Qud71boqj86Pi8TBkSTzY2h3VPASGpqCTb5gWoG9fLM" />
        </div>
        <div>
          <SummaryTable />
        </div>
      </div>
    </div>
  );
}
