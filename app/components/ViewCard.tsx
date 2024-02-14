import getCitrus from "@/scanner_code/citrus"; // Assuming this is an imported function

export default async function ViewCard(props: {
  walletAddress: string;
}) {
  var walletData = await getCitrus();

  return (
    <>
      <div className="bg-white text-black rounded-xl p-6 w-full flex">
        <div className="text-center w-1/3 pr-3">
          asd
        </div>
        <div className="w-2/3 pl-3">
          <div>
            Current Loaned: {walletData.loaned}
          </div>
          <div>
            Pending Offers: {walletData.offers}
          </div>
          <div>
            Citrus Total: {walletData.total}
          </div>
        </div>
      </div>
    </>
  );
}
