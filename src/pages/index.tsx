import { ReportDAOABI } from "@/utils/ReportDAO";
import { useEffect, useState } from "react";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";

// Contract address (replace with the actual deployed contract address)
const contractAddress = "0x123...abc";

const ReportList = () => {
  const [reports, setReports] = useState<
    [string, string, bigint, bigint, boolean][] | any[]
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
      setReports(reportData as any);
    }
  }, [reportData]);

  const handleFundReport = (reportId: number) => {
    const { config } = usePrepareContractWrite({
      address: contractAddress,
      abi: ReportDAOABI,
      functionName: "fundReport",
      args: [BigInt(reportId)],
      value: BigInt(100), // Replace with the desired funding amount
    });
    const { data, write } = useContractWrite(config);
    write?.();
  };

  const handleCompleteReport = (reportId: number) => {
    const { data, write } = useContractWrite({
      address: contractAddress,
      abi: ReportDAOABI,
      functionName: "completeReport",
      args: [BigInt(reportId)],
    });
    write?.();
  };

  return (
    <div>
      <h1>Report List</h1>
      <ul>
        {reports.map((report, index) => (
          <li key={index}>
            <h2>{report.website}</h2>
            <p>{report.description}</p>
            <p>Funding Goal: {report.fundingGoal.toString()} ETH</p>
            <p>Funds Raised: {report.fundsRaised.toString()} ETH</p>
            <p>Completed: {report.completed ? "Yes" : "No"}</p>
            <button onClick={() => handleFundReport(index)}>Fund Report</button>
            {report.fundsRaised >= report.fundingGoal && !report.completed && (
              <button onClick={() => handleCompleteReport(index)}>
                Complete Report
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReportList;
