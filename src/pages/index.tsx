import BottomNavigation from "@/components/bottom-navigation";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { ReportDAOABI, contractAddress } from "@/utils/ReportDAO";
import { useEffect, useState } from "react";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";

const ViewButton = ({ index }: { index: string }) => {
  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: ReportDAOABI,
    functionName: "fundReport",
    args: [BigInt(index)],
    value: BigInt(1), // Replace with the desired funding amount
  });
  const { data, write } = useContractWrite(config);

  const handleFundReport = (reportId: string) => {
    write?.();
  };

  return (
    <Button className="w-full" onClick={() => handleFundReport(index)}>
      Fund Report
    </Button>
  );
};

const FundButton = ({ index }: { index: string }) => {
  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: ReportDAOABI,
    functionName: "fundReport",
    args: [BigInt(index)],
    value: BigInt(1), // Replace with the desired funding amount
  });
  const { data, write } = useContractWrite(config);

  const handleFundReport = (reportId: string) => {
    write?.();
  };

  return (
    <Button className="w-full" onClick={() => handleFundReport(index)}>
      Fund Report
    </Button>
  );
};

const CompleteButton = ({ index }: { index: string }) => {
  const { data, write } = useContractWrite({
    address: contractAddress,
    abi: ReportDAOABI,
    functionName: "completeReport",
    args: [BigInt(index)],
  });
  const handleCompleteReport = (reportId: string) => {
    write?.();
  };

  return (
    <Button className="w-full" onClick={() => handleCompleteReport(index)}>
      Complete Report
    </Button>
  );
};

const ReportList = () => {
  const [reports, setReports] = useState<
    | {
        website: string;
        description: string;
        fundingGoal: string;
        fundsRaised: string;
        completed: boolean;
      }[]
    | any[]
  >([]);

  const { data: reportData } = useContractRead({
    address: contractAddress,
    abi: ReportDAOABI,
    functionName: "getReport",
    args: [BigInt(0)],
    watch: true, // Watch for changes
  });

  useEffect(() => {
    if (reportData) {
      const [website, description, fundingGoal, fundsRaised, completed] =
        reportData;
      const report = {
        website,
        description,
        fundingGoal: fundingGoal.toString(),
        fundsRaised: fundsRaised.toString(),
        completed,
      };
      setReports([report]);
    }
  }, [reportData]);

  console.log("reports", reports);

  return (
    <>
      <Header></Header>
      <main className="container flex min-h-[calc(100vh-64px)] w-full flex-col px-8 py-4">
        <div className="flex flex-col gap-2 p-2">
          <h1>Report List</h1>
          {reports && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {Object.entries(reports).map(([index, report]) => (
                <Card key={index} className="max-w-md">
                  <CardHeader>
                    <CardTitle>{report.website}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{report.description}</CardDescription>
                    <p>Funding Goal: {report.fundingGoal} ETH</p>
                    <p>Funds Raised: {report.fundsRaised} ETH</p>
                    <p>Completed: {report.completed ? "Yes" : "No"}</p>
                  </CardContent>
                  <CardFooter>
                    <div className="flex w-full gap-2">
                      {report.completed ? (
                        <ViewButton index={index} />
                      ) : (
                        <FundButton index={index} />
                      )}
                      {report.fundsRaised >= report.fundingGoal &&
                        !report.completed && <CompleteButton index={index} />}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <BottomNavigation></BottomNavigation>
    </>
  );
};

export default ReportList;
