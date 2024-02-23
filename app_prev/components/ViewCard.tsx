import getCitrus from "@/scanner_code/citrus"; // Assuming this is an imported function
import getTensor from "@/scanner_code/tensor";
import { Divider } from "@nextui-org/react";
import { useEffect, useState } from "react";

interface TensorData {
  NFTValue: string;
  FeeValue: string;
  PoolLiquidity: string;
}

interface CitrusData {
  loaned: string;
  offers: string;
  total: string;
}

export default function ViewCard(props: {
  walletAddress: string;
}) {
  const [citrus, setCitrus] =
    useState<CitrusData>();
  const [tensor, setTensor] =
    useState<TensorData>();
  const [isLoading, setIsLoading] =
    useState(true); // Added loading state

  useEffect(() => {
    async function getData() {
      try {
        console.log("hi1");

        const tensorData = await getTensor(
          props.walletAddress
        );
        setTensor(tensorData);
        console.log("hi2");

        const citrusData = await getCitrus(
          props.walletAddress
        );
        setCitrus(citrusData);
        console.log("hi3");

        setIsLoading(false); // Set loading state to false once data is fetched
        console.log("hi4");
      } catch (error) {
        console.error(
          "Failed to fetch data: ",
          error
        );
      }
    }

    getData(); // Invoke getData function here
  }, [props.walletAddress]);

  if (isLoading) {
    // If data is loading, return 'Loading...'
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="bg-white text-black rounded-xl p-6 w-full flex-row">
        <div className="w-full pl-3 pb-3 ">
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
          <div className="pl-4  inline-block">
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
