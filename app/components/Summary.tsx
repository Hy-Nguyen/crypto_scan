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
         <Card shadow="lg" className="w-1/2">
              <CardHeader className="flex gap-0 justify-center bg-p3-alt-light">
                <Image
                  alt="nextui logo"
                  height={200}
                  radius="none"
                  src="https://solana.com/_next/static/media/logotype.e4df684f.svg"
                  width={400}
                />
              </CardHeader>
              <Divider />
              <CardHeader className="text-lg font-bold flex justify-center">
                
              </CardHeader>
              <Divider />

              <CardBody className=" p-0 min-h-52">
                
              </CardBody>
            </Card>
        </>
    )
}