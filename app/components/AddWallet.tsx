"use client";
import React, { useState } from "react";

export default function AddWallet() {
  const walletArr = ["SOL", "Tensor", "Doge"];
  const [selectedValue, setSelectedValue] =
    useState(walletArr[0]);
  const [walletAddress, setWalletAddress] =
    useState("");

  const handleDropdownChange = (event: any) => {
    setSelectedValue(event.target.value);
  };

  const handleAddressChange = (event: any) => {
    setWalletAddress(event.target.value);
  };

  const handleAdd = () => {
    console.log(`Wallet Type: ${selectedValue}`);
    console.log(
      `Wallet Address: ${walletAddress}`
    );
  };

  return (
    <div className="w-full flex flex-row m-auto">
      <div>
        <select
          value={selectedValue}
          onChange={handleDropdownChange}
          className=" text-black h-12 w-24 text-center rounded-l-xl border-r"
        >
          {walletArr.map((value, index) => (
            <option key={index} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter Wallet Address"
          value={walletAddress}
          onChange={handleAddressChange}
          className="text-black h-12 w-96 pl-2"
        />
      </div>
      <div>
        <button
          onClick={handleAdd}
          className="bg-p3 hover:bg-p3 text-white py-2 px-8 h-12 rounded-r-xl"
        >
          Add
        </button>
      </div>
    </div>
  );
}
