"use client";

import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Image,
  Tooltip,
} from "@nextui-org/react";

import {
  ChangeEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import NavBar from "./components/NavBar";
import WalletAddress from "./components/CardListing";

export default function Home() {
  const walletArr = ["SOL", "Tensor", "Doge"];

  const [walletType, setWalletType] = useState(
    walletArr[0]
  );

  var [walletAddress, setWalletAddress] =
    useState("");

  const [walletHolding, setWalletHolding] =
    useState(() => {
      const savedHolding = sessionStorage.getItem(
        "walletHolding"
      );
      return savedHolding
        ? JSON.parse(savedHolding)
        : [];
    });
  // Function to sync sessionStorage with state
  function deleteRefresh() {
    const sessionArray = JSON.parse(
      sessionStorage.getItem("walletHolding") ||
        "[]"
    );
    setWalletHolding(sessionArray);
  }

  // Call function on component mount
  useEffect(() => {
    deleteRefresh();
  }, []);

  useEffect(() => {
    sessionStorage.setItem(
      "walletHolding",
      JSON.stringify(walletHolding)
    );
  }, [walletHolding]);

  function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    validateWalletAdd();

    // THIS FUNCTION WILL ADD THE NEW ADDRESS
    // ADD VALIDATION BEFORE AND ADD FUNCTION INSIDE

    function validateWalletAdd() {
      if (walletHolding.includes(walletAddress)) {
        alert(
          "The wallet address you entered has already been stored! Try entering another wallet address!"
        );
      } else {
        setWalletHolding([
          ...walletHolding,
          walletAddress,
        ]);
      }
      setWalletAddress("");
    } // End of validateWalletAdd
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
    <>
      <main className="flex flex-col justify-center bg-p3-alt ">
        <nav>
          <NavBar />
        </nav>
        <div className="flex-col justify-center align-center py-40 h-screen ">
          <div className=" flex justify-center w-full">
            <form
              onSubmit={handleSubmit}
              className=" flex flex-row  pb-10"
            >
              <select
                value={walletType}
                onChange={handleDropdownChange}
                className=" text-black h-12 w-24 text-center rounded-l-xl border-r"
              >
                {walletArr.map((value, index) => (
                  <option
                    key={index}
                    value={value}
                  >
                    {value}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Enter Wallet Address"
                value={walletAddress}
                onChange={handleAddressChange}
                className="text-black h-12 min-w-96 w-full pl-2"
              />

              <Tooltip
                className="text-black"
                content="Add Wallet!"
              >
                <button
                  type="submit"
                  className="bg-p3 hover:bg-p3 text-white py-2 px-8 h-12 rounded-r-xl"
                >
                  Add
                </button>
              </Tooltip>
            </form>
          </div>
          <div className="flex justify-center">
            <Card shadow="lg" className="w-1/2">
              <CardHeader className="flex gap-0 justify-center bg-p3-alt-light">
                <Image
                  alt="nextui logo"
                  height={200}
                  radius="none"
                  src="https://solana.com/_next/static/media/logotype.e4df684f.svg"
                  width={400}
                />
              </CardHeader>
              <Divider />
              <CardHeader className="text-lg font-bold flex justify-center">
                <h2 className="text-center">
                  Your Wallets
                </h2>
              </CardHeader>
              <Divider />

              <CardBody className=" p-0 min-h-52">
                <div>
                  {walletHolding.map(
                    (
                      address: string,
                      i: number
                    ) => (
                      <>
                        <WalletAddress
                          address={address}
                          key={i}
                          refresh={deleteRefresh}
                        />
                      </>
                    )
                  )}
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
