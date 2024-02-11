"use client";
import { useState } from "react";

export default function Dropdown() {
  const walletArr = ["SOL", "Tensor", "Doge"];
  const [selectedValue, setSelectedValue] =
    useState(walletArr[0]);

  function handleDropdownChange(event: any) {
    setSelectedValue(event.target.value);
  }

  return (
    
  );
}
