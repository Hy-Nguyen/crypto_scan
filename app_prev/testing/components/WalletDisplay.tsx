"use client";
import TestCard from "./TestCard";

export default function WalletDisplay() {
  var addressArr = sessionStorage.getItem(
    "walletHolding"
  );
  addressArr = addressArr
    ? JSON.parse(addressArr)
    : [];

  return addressArr;
}
