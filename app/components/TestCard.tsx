import getCitrus from "@/scanner_code/citrusAxios";
import getTensor from "@/scanner_code/tensorAxios";
import {
  Divider,
  Card,
  CardHeader,
  CardBody,
} from "@nextui-org/react";
import { unstable_noStore } from "next/cache";
import { useEffect, useState } from "react";

export default async function ViewCard(props: {
  walletAddress: string;
}) {
  // 5 second delay
  await new Promise((res) =>
    setTimeout(res, 5000)
  );

  const citrus = await getCitrus(
    props.walletAddress
  );
  const tensor = await getTensor(
    props.walletAddress
  );

  return (
    <>
      <Card shadow="lg" className="w-1/2 p-4">
        <CardHeader>
          <div className="flex-row">
            <h1>Wallet: </h1>
            <a
              href={`https://citrus.famousfoxes.com/profile/${props.walletAddress}`}
              target="_blank"
              className="text-xs hover:text-slate-500 text-sky-400"
            >
              {props.walletAddress}
            </a>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="w-full pl-3 pb-3 ">
            <h2>Citrus:</h2>

            <div className="pl-4  whitespace-nowrap inline-block">
              <table className="w-full">
                <tbody className="">
                  <tr>
                    <th className="text-left">
                      Current Loaned:
                    </th>
                    <td>{citrus?.loaned}</td>
                  </tr>
                  <tr>
                    <th className="text-left">
                      Pending Offers:
                    </th>
                    <td>{citrus?.offers}</td>
                  </tr>
                  <tr>
                    <th className="text-left">
                      Citrus Total:
                    </th>
                    <td>{citrus?.total}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CardBody>
        <Divider />
        <CardBody>
          <div className="w-full pl-3 pt-3">
            <h2>Tensor:</h2>
            <div className="pl-4  whitespace-nowrap inline-block">
              <table>
                <tr>
                  <th className="text-left">
                    Total NFT Pool Value:
                  </th>
                  <td className="pl-4">
                    {tensor?.NFTValue}
                  </td>
                </tr>
                <tr>
                  <th className="text-left w-1/2">
                    Total NFT Fee Value:
                  </th>
                  <td className="pl-4">
                    {tensor?.FeeValue}
                  </td>
                </tr>
                <tr>
                  <th>
                    Total NFT Liquidity Pool
                    Value:
                  </th>
                  <td className="pl-4">
                    {tensor?.PoolLiquidity}
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
