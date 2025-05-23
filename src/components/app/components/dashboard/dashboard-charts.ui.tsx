"use client"
import React from 'react';
import PieComponent from './PieChart';
import LineChartUi from './line-chart';
import { DashboardBarChat } from './dashboard-bar-chart';

const DashboardChartUi = () => {
  return (
    <div className='flex flex-wrap w-full'>
      <div className='xl:w-8/12 lg:w-7/12 h-full'>
        <DashboardBarChat />
      </div>
      <div className='xl:w-4/12 lg:w-5/12 flex-col'>
        <div className='flex-1 w-full'><PieComponent /></div>
      </div>
      <div className='w-full'>
        <LineChartUi />
      </div>
    </div>
  );
};

export default DashboardChartUi
  ;