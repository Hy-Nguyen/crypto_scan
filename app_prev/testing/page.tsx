import { useContext, useEffect } from "react";
import { ArrayContext } from "../providers";

import WalletManager from "./components/WalletManager1";

export default function Home() {
  return (
    <>
      <main className="flex flex-col justify-center bg-p3-alt w-full">
        <WalletManager />
      </main>
    </>
  );
}
