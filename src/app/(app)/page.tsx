"use client"
import DashboardChartUi from '@/components/app/components/dashboard/dashboard-charts.ui';
import DashboardCardContainer from '@/components/app/components/dashboard/DashboardCardContainer';
import DashboardTable from '@/components/app/components/dashboard/DashboardTable';
import React from 'react';

const DashboardUi = () => {
  return (
    <div>
      <div className="w-full py-3 text-[19px] mt-4">Dashboard </div>
      <div>
        <DashboardCardContainer />
        <DashboardChartUi/>
        <DashboardTable/>
      </div>
    </div>
  );
};

export default DashboardUi;