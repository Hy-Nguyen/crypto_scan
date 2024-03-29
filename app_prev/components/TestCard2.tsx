import getCitrus from "@/scanner_code/citrus"; // Assuming this is an imported function
import { useEffect, useState } from "react";

interface CitrusData {
  loaned: string;
  offers: string;
  total: string;
}

export default function CirtusCard() {
  const [clicked, setClicked] = useState(false);
  const [citrus, setCitrus] =
    useState<CitrusData>();

  const [isLoading, setIsLoading] =
    useState(true); // Added loading state

  useEffect(() => {
    async function getData() {
      setCitrus(
        (await getCitrus(
          "428JqXgFg3yjuMoa4ZkKi7MBJLn2thvpSTH6HS2NLQC1"
        )) as CitrusData
      );
      setIsLoading(false); // Set loading state to false once data is fetched
    }
    getData();
  });

  if (isLoading) {
    // If data is loading, return 'Loading...'
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <h1>{citrus?.loaned}</h1>
        {clicked && (
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
                <p>
                  Citrus Total: {citrus?.total}
                </p>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
