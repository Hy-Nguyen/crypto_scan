import { Divider } from "@nextui-org/react";
import { DropDown } from "./Dropdown";
import axios from "axios";
import NavBar from "../components/NavBar";
import TestCard from "../components/TestCard";

// This part is important!
export const dynamic = "force-dynamic";

const fetchCitrus = async (wallet: string) => {
  if (!wallet) return null;

  try {
    // const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke}`);

    // if (!response.ok) return null;

    // const data = await response.json();

    var citrusUrl = `https://citrus.famousfoxes.com/citrus/userSocials/${wallet}`;
    var citrusHeader = {
      headers: {
        authority: "citrus.famousfoxes.com",
        referer: `https://citrus.famousfoxes.com/profile/${wallet}`,
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
      },
    };

    var citrusResponse = await axios.get(
      citrusUrl,
      citrusHeader
    );
    var citrusResponseJson =
      await citrusResponse.data;

    return citrusResponseJson;
  } catch (reason) {
    return null;
  }
};
export default async function Home({
  searchParams,
}: {
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}) {
  const selectedSearch =
    searchParams?.selected ?? "";
  const selected = Array.isArray(selectedSearch)
    ? selectedSearch[0]
    : selectedSearch;

  // const tensor = await getTensor(selected);

  const citrus = await fetchCitrus(selected);

  return (
    <>
      <main className="flex flex-col justify-center bg-p3-alt w-full">
        <NavBar />
        <div className="h-screen ">
          <DropDown selected={selected || ""} />

          {citrus && (
            <div className="flex justify-center">
              <TestCard
                walletAddress={selected}
              />
            </div>
          )}
        </div>
      </main>
    </>
  );
}
