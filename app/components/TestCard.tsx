import getCitrus from "@/scanner_code/citrus";
import getTensor from "@/scanner_code/tensor";
import { Divider } from "@nextui-org/react";
import { unstable_noStore } from "next/cache";
import { useEffect, useState } from "react";

export default async function ViewCard(props: {
  walletAddress: string;
}) {
  const citrus = await getCitrus(
    props.walletAddress
  );
  const tensor = await getTensor(
    props.walletAddress
  );

  return (
    <>
      <div className="bg-white text-black rounded-2xl p-6 w-full flex-row my-3">
        <div className="w-full pl-3 pb-3 ">
          <h1>Wallet: </h1>
          <a
            href={`https://citrus.famousfoxes.com/profile/${props.walletAddress}`}
            target="_blank"
            className="text-xs hover:text-slate-500 text-sky-400"
          >
            {props.walletAddress}
          </a>
          <Divider className="my-3  " />

          <h2>Citrus:</h2>

          <div className="pl-4  whitespace-nowrap inline-block">
            <p className="inline-block">
              Current Loaned: {citrus?.loaned}
            </p>
            <p>
              Pending Offers: {citrus?.offers}
            </p>
            <p>Citrus Total: {citrus?.total}</p>
          </div>
        </div>
        <Divider className="my-3  " />
        <div className="w-full pl-3 pt-3">
          <h2>Tensor:</h2>
          <div className="pl-4  whitespace-nowrap inline-block">
            <p className="inline-block">
              Total NFT Pool Value:
              {" " + tensor?.NFTValue}
            </p>
            <p>
              Total NFT Fee Value:
              {" " + tensor?.FeeValue}
            </p>
            <p>
              Total NFT Liquidity Pool Value:
              {" " + tensor?.PoolLiquidity}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
