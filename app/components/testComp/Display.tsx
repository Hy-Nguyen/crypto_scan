"use client";

import getCitrus from "@/scanner_code/citrus";
import { useEffect, useState } from "react";

const ChildComponent = ({
  input,
}: {
  input: string;
}) => {
  const [fetchedData, setFetchedData] =
    useState<any>(null);

  useEffect(() => {
    // Fetch your data here.

    async function getData(input: string) {
      const citrus = await getCitrus(input);
      setFetchedData(citrus);
    }
    getData(input);
  }, [input]); // Rerun effect if `input` prop changes

  return (
    <div>
      <div className="bg-white text-black rounded-xl p-6 w-full flex-row">
        <div className="w-full pl-3 pb-3 ">
          <h2>Citrus:</h2>
          <div className="pl-4  whitespace-nowrap inline-block">
            <p className="inline-block">
              Current Loaned:{" "}
              {fetchedData?.loaned}
            </p>
            <p>
              Pending Offers:{" "}
              {fetchedData?.offers}
            </p>
            <p>
              Citrus Total: {fetchedData?.total}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildComponent;
