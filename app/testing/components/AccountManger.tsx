"use client";

import CardLoading from "@/app/components/Skeleton";
import SummaryTable from "@/app/components/SummaryTable";
import TestCard from "./TestCard";
import {
  ChangeEvent,
  Suspense,
  useState,
} from "react";

export default function AccountManager() {
  const walletArr = ["SOL", "Tensor", "Doge"];

  const [walletType, setWalletType] = useState(
    walletArr[0]
  );

  const [walletAddress, setWalletAddress] =
    useState("");

  function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    console.log(walletAddress)
  }

  function handleDropdownChange(
    event: ChangeEvent<HTMLSelectElement>
  ) {
    setWalletType(event.target.value);
  }

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
    </div>
  );
}
