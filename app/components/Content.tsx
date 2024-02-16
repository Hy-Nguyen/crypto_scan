"use client";
import React, {
  useState,
  ChangeEvent,
} from "react";
import ViewCard from "./ViewCard";
import { card } from "@nextui-org/react";
import TestCard from "./TestCard";
import TestCard2 from "./TestCard2";

interface WalletData {
  walletType: string;
  walletAddress: string;
}

export default function WalletManager() {
  const walletArr = ["SOL", "Tensor", "Doge"];

  function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    setWalletCards((prevCards: WalletData[]) => [
      ...prevCards,
      { walletType, walletAddress },
    ]);

    setHasAddress(true);
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

  const [walletCards, setWalletCards] = useState<
    WalletData[]
  >([]);

  const [hasAddress, setHasAddress] =
    useState(false);

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
      <div>
        {/* {hasAddress &&
          walletCards.map((cardData, index) => {
            {
              console.log(hasAddress);
            }

            return (
              <>
                {walletCards.length}
                <TestCard
                  walletAddress={
                    cardData.walletAddress
                  }
                  key={index}
                />
              </>
            );
          })} */}
          <TestCard2/>
      </div>
    </div>
  );
}
