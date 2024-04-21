// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ReportDAO {
    struct Report {
        string website;
        string description;
        uint256 fundingGoal;
        uint256 fundsRaised;
        bool completed;
    }

    Report[] public reports;
    mapping(uint256 => mapping(address => uint256)) public donations;

    event ReportRequested(uint256 indexed reportId, string website, string description, uint256 fundingGoal);
    event FundingReceived(uint256 indexed reportId, address indexed donor, uint256 amount);
    event ReportCompleted(uint256 indexed reportId);

    function requestReport(string memory _website, string memory _description, uint256 _fundingGoal) public {
        reports.push(Report(_website, _description, _fundingGoal, 0, false));
        uint256 reportId = reports.length - 1;
        emit ReportRequested(reportId, _website, _description, _fundingGoal);
    }

    function fundReport(uint256 _reportId) public payable {
        Report storage report = reports[_reportId];
        require(report.fundsRaised < report.fundingGoal, "Funding goal already met");
        donations[_reportId][msg.sender] += msg.value;
        report.fundsRaised += msg.value;
        emit FundingReceived(_reportId, msg.sender, msg.value);
    }

    function completeReport(uint256 _reportId) public {
        Report storage report = reports[_reportId];
        require(report.fundsRaised >= report.fundingGoal, "Funding goal not met");
        require(!report.completed, "Report already completed");
        report.completed = true;
        emit ReportCompleted(_reportId);
    }

    function getReport(uint256 _reportId) public view returns (string memory, string memory, uint256, uint256, bool) {
        Report storage report = reports[_reportId];
        return (report.website, report.description, report.fundingGoal, report.fundsRaised, report.completed);
    }
}
