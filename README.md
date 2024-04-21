# Report DAO

## DEMO

https://github.com/aeither/report-dao/assets/36173828/c8e8cb6c-fc22-4cbf-aa46-0e5da52ba414

## Description

ReportDAO is a decentralized crowdfunding platform that empowers users to request and fund web scraping reports. Simply submit a website URL, description, and funding goal to request a new report. Other users can then contribute cryptocurrency to fund the report. Once the funding goal is met, the report is generated and delivered to all contributors. With ReportDAO, you can access valuable data insights through a transparent, community-driven process.

## TechStack
- wagmi, nextjs, shadcn, solidity, arbitrum

## User Flow

Request a New Report
User visits the ReportDAO website and clicks on the "Request a Report" button.
User fills out a form with the website URL to be scraped, a description of the report requirements, and the funding goal (in cryptocurrency).
User submits the form, which calls the requestReport function in the smart contract.

```js
function requestReport(string memory _website, string memory _description, uint256 _fundingGoal) public { ... }
```

Fund the Report
The new report request is displayed on the ReportDAO website, along with its funding progress.
Other users can contribute funds to the report by clicking the "Fund" button.
Users connect their cryptocurrency wallets and specify the amount they want to contribute.
The contribution is processed by calling the fundReport function in the smart contract.

```js
function fundReport(uint256 _reportId) public payable { ... }
```

Report Completion
Once the funding goal for a report is met, the ReportDAO team or a designated party can mark the report as completed by calling the completeReport function.

```js
function completeReport(uint256 _reportId) public { ... }
```

Receive the Report
After the report is marked as completed, users who contributed funds can access and download the completed report.
Users can view the details of the completed report.

Try it with example: https://x.com/elonmusk

## Links

Smart Contract on Arbitrum Sepolia

https://sepolia.arbiscan.io/address/0xa2dd26d1e1b87975692ab9efdd84177bc16fca98

## Screenshots

![CleanShot 2024-04-21 at 23 34 56@2x](https://github.com/aeither/report-dao/assets/36173828/8d26950c-5a16-4502-8d3e-7e0539a9a7a8)

![CleanShot 2024-04-21 at 23 37 32@2x](https://github.com/aeither/report-dao/assets/36173828/8723d712-0f9a-4459-a6df-22264b843212)

![CleanShot 2024-04-21 at 23 29 55@2x](https://github.com/aeither/report-dao/assets/36173828/d2395d95-886b-481f-9f68-98cfc57237f8)

![CleanShot 2024-04-21 at 23 31 30@2x](https://github.com/aeither/report-dao/assets/36173828/c2259e8d-dcc4-47b1-a002-d294cb0316d8)


