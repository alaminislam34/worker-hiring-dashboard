"use client";

import OrderChart from "./components/Chart";
import WorkerList from "./components/PayWorkerTable";
import StatsCards from "./components/Stats";

const DashboardPage = () => {
  return (
    <div className="w-full max-w-full">
      <StatsCards />
      <OrderChart />
      <WorkerList />
    </div>
  );
};

export default DashboardPage;
