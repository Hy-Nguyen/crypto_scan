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
  // Limit the length of the address to 80 characters
  const shortenedAddress = address.length > 80 ? `${address.substring(0, 80)}...` : address;

  function deleteItem() {
    let array = JSON.parse(sessionStorage.getItem("walletHolding") || "[]");
    let index = array.indexOf(address);

    if (index !== -1) {
      array.splice(index, 1);
    }

    sessionStorage.setItem("walletHolding", JSON.stringify(array));
    alert("deleted!");
    refresh(); // Refresh parent component
  }

  return (
    <>
      <div className="p-0 relative">
        <Link 
          href={`/wallets?selected=${address}`}
        >
          {/* Display shortened address */}
          <div className="pl-10 py-2 pr-2 mr-14">{shortenedAddress}</div>
        </Link>
        <Button
          onClick={deleteItem}
          size="sm"
          radius="full"
          isIconOnly
          color="secondary"
          variant="bordered"
          className="absolute top-1 right-6 " // Position delete button absolutely and add padding to the left
        >
          X
        </Button>
      </div>
      <Divider />
    </>
  );

}
