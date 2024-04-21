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
    <div>
      <h1>Request a New Report</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="website">Website URL</label>
          <input
            type="text"
            id="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Report Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="fundingGoal">Funding Goal (ETH)</label>
          <input
            type="number"
            id="fundingGoal"
            value={fundingGoal}
            onChange={(e) => setFundingGoal(parseFloat(e.target.value))}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Requesting..." : "Request Report"}
        </button>
        {isSuccess && <p>Report requested successfully!</p>}
      </form>
    </div>
  );
};

export default RequestReport;
