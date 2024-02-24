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
         <Card shadow="lg" className="w-1/3 mt-20">
              <CardHeader className="flex gap-0 justify-center bg-p3-alt-light text-xl font-bold">
                <p>Summary of Holdings</p>
                {/* <Image
                  alt="nextui logo"
                  height={200}
                  radius="none"
                  src="https://solana.com/_next/static/media/logotype.e4df684f.svg"
                  width={400}
                /> */}
              </CardHeader>

              <CardBody className=" p-0 min-h-52">
                <div className='mr-5 ml-5 mt-1'>
                    <p>Total Held Solana:  {/*( = total nft fee + total nft liquidity pool value + tensor nft value + solscan holdings)*/}</p>
                    <Divider />
                    <p>Total Open Offers: {/*(= total open offers on citrus) (Toggle dropdown for more information arrow down)*/}</p>
                    <Divider />
                    <p>Total NFT Value: </p>
                    <Divider />
                    <p>Total NFT Orders: </p>
                    <Divider />
                    <p>Total Tensor Fees:  </p>
                    <Divider />
                    <p>Total Citrus Pending Offers:  </p>
                    <Divider />
                    <p>Total Citrus Active Offers:  </p>
                    <Divider />
                    <p>Total Solana Held Inactive:  {/*(solscan stuff)*/}</p>
                </div>
                    
              </CardBody>
            </Card>
        </>
    )
}