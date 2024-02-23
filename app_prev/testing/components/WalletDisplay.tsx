"use client";

export default function WalletDisplay() {
  var addressStr = sessionStorage.getItem(
    "walletHolding"
  );
  var addressArr = addressStr
    ? JSON.parse(addressStr)
    : [];
  return addressArr;
}
