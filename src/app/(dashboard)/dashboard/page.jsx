"use client";

import OrderChart from "./components/Chart";
import StatsCards from "./components/Stats";

const DashboardPage = () => {
  return (
    <div className="w-full max-w-full">
      <StatsCards />
      <OrderChart />
    </div>
  );
};

export default DashboardPage;
