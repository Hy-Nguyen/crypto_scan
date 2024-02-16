import { Divider } from "@nextui-org/react";

export default function SummaryTable(props: {
  wallets: string[];
}) {
  return (
    <div className="bg-white text-black rounded-xl p-6 w-full flex-row my-3 h-1/2">
      <h1>Wallet Summaries</h1>
      {props.wallets.map((address) => (
        <p className="text-xs" key={address}>
          {address}
        </p>
      ))}
      <h2>Citrus:</h2>

      <div className="pl-4  whitespace-nowrap inline-block">
        <p className="inline-block">
          Current Loaned: Loading...
        </p>
        <p>Pending Offers: Loading...</p>
        <p>Citrus Total: Loading...</p>
      </div>
      <Divider className="my-3  " />
      <h2>Tensor:</h2>
      <div className="pl-4  whitespace-nowrap inline-block">
        <p className="inline-block">
          Total NFT Pool Value:
          {"  Loading..."}
        </p>
        <p>
          Total NFT Fee Value:
          {"  Loading..."}
        </p>
        <p>
          Total NFT Liquidity Pool Value:
          {"  Loading..."}
        </p>
      </div>
    </div>
  );
}
