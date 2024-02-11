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
      <div>
        <table className="w-full text-center">
          <thead className="table table-fixed w-full mb-3 border-b-2">
            <tr>
              <th>Date</th>
              <th>Total Liquidity</th>
              <th>Total NFTs at FP</th>
              <th>Total Fees</th>
              <th>Total Reserve</th>
              <th>NFT in Wallet</th>
              <th>Total SOL</th>
              <th>Total SOL w/o Fees</th>
            </tr>
          </thead>
          <tbody className="block max-h-80 overflow-y-scroll border-b-2 ">
            {listings
              .slice(0, 100)
              .map((list: any) => (
                <tr
                  key={list[0]}
                  className="table table-fixed w-full "
                >
                  <td>{list[0]}</td>
                  <td>{list[1]}</td>
                  <td>{list[2]}</td>
                  <td>{list[3]}</td>
                  <td>{list[4]}</td>
                  <td>{list[5]}</td>
                  <td>{list[6]}</td>
                  <td>{list[7]}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );

}
