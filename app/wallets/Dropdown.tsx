"use client";

import type { ChangeEvent } from "react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  Select,
  SelectItem,
} from "@nextui-org/react";

const storageItem = sessionStorage.getItem(
  "walletHolding"
);
const options = JSON.parse(
  storageItem ? storageItem : "{}"
);

export const DropDown = ({
  selected,
}: {
  selected: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onSelect = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const current = new URLSearchParams(
      searchParams
    );

    const value = event.target.value.trim();

    if (!value) {
      current.delete("selected");
    } else {
      current.set("selected", event.target.value);
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  };

  return (
    <div className="flex justify-center mt-8 ">
      <Select
        label="Select Your Wallet"
        value={selected}
        onChange={onSelect}
        className="text-black text-center py-2 my-2 w-1/2 rounded-xl"
      >
        {options.map((opt: string) => (
          <SelectItem
            key={opt}
            value={opt}
            className="text-black"
          >
            {opt}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};
