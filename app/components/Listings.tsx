import getListings from "@/middleware/google";
import { list } from "postcss";

export default async function Listings() {
  var listings = [];
  listings = await getListings();
  listings = listings.map((item) => {
    const newItem = [...item]; // create copy of item array
    newItem[0] = newItem[0].toString(); // convert first element (Date object) to string
    return newItem; // return updated item array
  });
  console.log("to");
  const uniqueDates = listings
    .map((listing: any) => {
      let date = new Date(listing[0]);
      return `${
        date.getMonth() + 1
      }/${date.getDate()}/${date.getFullYear()}`;
    })
    .reduce(
      (
        accumulatedDates: any,
        currentDate: any
      ) => {
        if (
          !accumulatedDates.includes(currentDate)
        ) {
          accumulatedDates.push(currentDate);
        }
        return accumulatedDates;
      },
      []
    );
  console.log(uniqueDates[0]);
  return (
    <>
      <div>{listings[0]}</div>
    </>
  );
}
