import getCitrus from "@/scanner_code/citrus";

export default async function ViewCard({
  wallet,
}: {
  wallet: string;
}) {
  if (wallet == "") {
    wallet =
      "428JqXgFg3yjuMoa4ZkKi7MBJLn2thvpSTH6HS2NLQC1";
  }
  const citrusReponse = await getCitrus(wallet);

  var currentLoaned =
    citrusReponse?.currentLoaned.toFixed(2);
  var pendingOffers =
    citrusReponse?.pendingOffers.toFixed(2);
  var citrusTotal =
    citrusReponse?.citrusTotal.toFixed(2);
  return (
    <>
      <div className="bg-white text-black rounded-xl p-6 w-full flex ">
        <div className="text-center w-1/3 pr-3">
          asd
        </div>
        <div className="w-2/3 pl-3">
          <div>
            Current Loaned: {currentLoaned}
          </div>
          <div>
            Pending Offers: {pendingOffers}
          </div>
          <div>Citrus Total: {citrusTotal}</div>
        </div>
      </div>
    </>
  );
}
