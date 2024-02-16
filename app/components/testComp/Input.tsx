"use client";

import { useState } from "react";
import ChildComponent from "./Display";
import { input } from "@nextui-org/react";

const ParentComponent = () => {
  const [data, setData] = useState<string | null>(
    null
  );

  const handleFormSubmit = (input: string) => {
    console.log(input);

    setData(input);
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(
            e.currentTarget
          );
          handleFormSubmit(
            data.get("input") as string
          );
          console.log(data.get("input"));
        }}
      >
        <input
          type="text"
          name="input"
          placeholder="Enter Wallet Address"
          className="text-black h-12 w-96 pl-2"
        />
        <button
          type="submit"
          className="bg-p3 hover:bg-p3 text-white py-2 px-8 h-12 rounded-r-xl"
        >
          Add
        </button>
      </form>

      {data && <ChildComponent input={data} />}
    </div>
  );
};

export default ParentComponent;
