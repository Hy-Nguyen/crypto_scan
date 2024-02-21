"use client";

import { useContext, useEffect } from "react";
import { ArrayContext } from "../providers";

import WalletManager from "./components/WalletManager1";

export default function Home() {
  const { array } = useContext(ArrayContext);

  useEffect(() => {
    console.log("hi " + array); // this should be ['item1', 'item2', 'item3']
  }, [array]);

  return (
    <>
      <main className="flex flex-col justify-center bg-p3-alt w-full">
        hi
        {array}
        <WalletManager />
      </main>
    </>
  );
}
