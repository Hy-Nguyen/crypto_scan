import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Image,
  Tooltip,
} from "@nextui-org/react";

export default function SummaryHoldings(){
    return (
        <>
         <Card shadow="lg" className="w-2/5 mt-40">
              <CardHeader className="flex gap-0 justify-center bg-p3-alt-light text-xl font-bold">
                <p>Summary of Holdings</p>
              </CardHeader>

              <CardBody className="p-0 min-h-52">
    <div className='mt-1'>
        <p className="mr-10 ml-10">Total Held Solana:  {/*( = total nft fee + total nft liquidity pool value + tensor nft value + solscan holdings)*/}</p>
        <Divider />
        <p className="mr-10 ml-10">Total Open Offers: {/*(= total open offers on citrus) (Toggle dropdown for more information arrow down)*/}</p>
        <Divider />
        <p className="mr-10 ml-10">Total NFT Value: </p>
        <Divider />
        <p className="mr-10 ml-10">Total NFT Orders: </p>
        <Divider />
        <p className="mr-10 ml-10">Total Tensor Fees:  </p>
        <Divider />
        <p className="mr-10 ml-10">Total Citrus Pending Offers:  </p>
        <Divider />
        <p className="mr-10 ml-10">Total Citrus Active Offers:  </p>
        <Divider />
        <p className="mr-10 ml-10">Total Solana Held Inactive:  {/*(solscan stuff)*/}</p>
    </div>
</CardBody>
            </Card>
        </>
    )
}