"use client";

import CardLoading from "@/app/components/Skeleton";
import SummaryTable from "@/app/components/SummaryTable";
import TestCard from "./TestCard";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";

import {
  ChangeEvent,
  Suspense,
  useState,
} from "react";

export default function AccountManager() {
  const walletArr = ["SOL", "Tensor", "Doge"];
  //   const addressArr = [
  //     "428JqXgFg3yjuMoa4ZkKi7MBJLn2thvpSTH6HS2NLQC1",
  //     "G7AWxhckzMNgnPpWY8uYJULFZAwM8dmGWXWmK1FY5e12",
  //     "7Qud71boqj86Pi8TBkSTzY2h3VPASGpqCTb5gWoG9fLM",
  //   ];

  const [walletType, setWalletType] = useState(
    walletArr[0]
  );

  const [walletAddress, setWalletAddress] =
    useState("");

  const [walletHolding, setWalletHolding] =
    useState<string[]>([]);

  // SUBMIT PROCESSING
  function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    console.log(walletAddress);

    validateWalletAdd()

    // THIS FUNCTION WILL ADD THE NEW ADDRESS
    // ADD VALIDATION BEFORE AND ADD FUNCTION INSIDE

    function validateWalletAdd() {
      if (walletHolding.includes(walletAddress)) {
        alert("The wallet address you entered has already been stored! Try entering another wallet address!")
      } else {
        setWalletHolding([
          ...walletHolding,
          walletAddress,
        ]);

        console.log(walletHolding);
      }
    }; // End of validateWalletAdd


    

  }

  function handleDropdownChange(
    event: ChangeEvent<HTMLSelectElement>
  ) {
    setWalletType(event.target.value);
  }

  function handleAddressChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    setWalletAddress(event.target.value);
  }

  return (
    <div className="align-center py-32 mx-40">
      <div className="">
        <form
          onSubmit={handleSubmit}
          className=" flex flex-row justify-center pb-10"
        >
          <select
            value={walletType}
            onChange={handleDropdownChange}
            className=" text-black h-12 w-24 text-center rounded-l-xl border-r"
          >
            {walletArr.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Enter Wallet Address"
            value={walletAddress}
            onChange={handleAddressChange}
            className="text-black h-12 w-full pl-2"
          />

          <button
            type="submit"
            className="bg-p3 hover:bg-p3 text-white py-2 px-8 h-12 rounded-r-xl"
          >
            Add
          </button>
        </form>
      </div>
      <div className="flex justify-center">
        <Card className="max-w-[400px]">
          <CardHeader className="flex gap-0 justify-center">
            <Image
              alt="nextui logo"
              height={200}
              radius="none"
              src="https://solana.com/_next/static/media/logotype.e4df684f.svg"
              width={400}
            />
          </CardHeader>
          <Divider />
          <CardHeader className="flex justify-center">
            <div className="flex flex-col items-center ">
              <p className="text-lg">
                Your Solana
              </p>
              <p className="text-small text-default-500">
                nextui.org
              </p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            {walletHolding.map((address, i) => (
              <p key={i}>{address}</p>
            ))}
          </CardBody>
          <Divider />
          <CardFooter>footer</CardFooter>
        </Card>
      </div>
    </div>
  );
}
