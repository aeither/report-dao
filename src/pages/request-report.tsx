import BottomNavigation from "@/components/bottom-navigation";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ReportDAOABI, contractAddress } from "@/utils/ReportDAO";
import { useState } from "react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

// Contract address (replace with the actual deployed contract address)

const RequestReport = () => {
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [fundingGoal, setFundingGoal] = useState(0);

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: ReportDAOABI,
    functionName: "requestReport",
    args: [website, description, BigInt(fundingGoal)],
  });
  const { data, write } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    write?.();
  };

  return (
    <>
      <Header></Header>
      <main className="container flex min-h-[calc(100vh-64px)] w-full flex-col px-8 py-4">
        <div className="flex flex-col gap-2 p-2">
          <h1 className="h1">Request a New Report</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="website">Website URL</Label>
              <Input
                type="text"
                id="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Report Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="fundingGoal">Funding Goal (ETH)</Label>
              <Input
                type="number"
                id="fundingGoal"
                value={fundingGoal}
                onChange={(e) => setFundingGoal(parseFloat(e.target.value))}
                required
              />
            </div>
            <div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Requesting..." : "Request Report"}
              </Button>
            </div>
            {isSuccess && <p>Report requested successfully!</p>}
          </form>
        </div>
      </main>
      <BottomNavigation></BottomNavigation>
    </>
  );
};

export default RequestReport;
