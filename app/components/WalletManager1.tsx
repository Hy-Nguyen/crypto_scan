"use client";
import { useState } from "react";
import DisplayData from "../components/DisplayData";
import getCitrus from "@/scanner_code/citrus";

function DataFetcher() {
  const [input, setInput] = useState("");
  const [data, setData] = useState();

  const fetchAndSetData = async () => {
    try {
      console.log(input);

      const citrus = await getCitrus(input);
      setData(data);
      console.log(citrus);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {/* <form
        onSubmit={async (event) => {
          event.preventDefault();
          fetchAndSetData();
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) =>
            setInput(e.target.value)
          }
        />
        <button type="submit">Submit</button>
      </form> */}
      <div className="">
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            fetchAndSetData();
          }}
          className=" flex flex-row justify-center pb-10"
        >
          {/* <select
            value={walletType}
            onChange={handleDropdownChange}
            className=" text-black h-12 w-24 text-center rounded-l-xl border-r"
          >
            {walletArr.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select> */}

          <input
            type="text"
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
          />

          <button
            type="submit"
            className="bg-p3 hover:bg-p3 text-white py-2 px-8 h-12 rounded-r-xl"
          >
            Add
          </button>
        </form>
      </div>

      {data && <DisplayData data={data} />}
    </div>
  );
}

export default DataFetcher;
