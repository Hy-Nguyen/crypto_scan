import React, {
  ChangeEvent,
  useState,
} from "react";

interface WalletFormProps {
  onSubmitWalletData: (data: {
    walletType: string;
    walletAddress: string;
  }) => void;
}

export default function AddWallet({
  onSubmitWalletData,
}: WalletFormProps) {

  const walletArr = ["SOL", "Tensor", "Doge"];

  const [walletType, setWalletType] = useState(
    walletArr[0]
  );
  const [walletAddress, setWalletAddress] =
    useState("");

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

  function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    onSubmitWalletData({
      walletType,
      walletAddress,
    });
    console.log(walletAddress, walletType);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-row m-auto"
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
        className="text-black h-12 w-96 pl-2"
      />

      <button
        type="submit"
        className="bg-p3 hover:bg-p3 text-white py-2 px-8 h-12 rounded-r-xl"
      >
        Add
      </button>
    </form>
  );
}
