"use client";
import {
  Divider,
  Button,
} from "@nextui-org/react";
import Link from "next/link";

export default function WalletAddress({
  address,
  refresh,
}: {
  address: any;
  refresh: any;
}) {
  function deleteItem() {
    let array = JSON.parse(
      sessionStorage.getItem("walletHolding") ||
        "[]"
    );
    let index = array.indexOf(address);

    if (index !== -1) {
      array.splice(index, 1);
    }

    sessionStorage.setItem(
      "walletHolding",
      JSON.stringify(array)
    );
    alert("deleted!");
    refresh(); // Refresh parent component
  }

  return (
    <>
      <div className="flex justify-between items-center wallet">
        <Link
          href={`/wallets?selected=${address}`}
        >
          <div className="pl-10 py-2 mr-14">
            {address}
          </div>
        </Link>
        <Button
          onClick={deleteItem}
          size="sm"
          radius="full"
          isIconOnly
          color="secondary"
          variant="bordered"
          className="mr-4"
        >
          X
        </Button>
      </div>
      <Divider />
    </>
  );
}
