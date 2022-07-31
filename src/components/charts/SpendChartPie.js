import React, { PureComponent } from "react";
// import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { PieChart } from "react-minimal-pie-chart";

export default function SpendPieChart({ spendAnalysisDataForChart }) {
    
  return (
    <>
      {" "}
      {spendAnalysisDataForChart.length > 0 ? (
        <div>
          <PieChart
            radius={30}
            data={spendAnalysisDataForChart}
            animate={true}
            animationDuration={1200}
          />
        </div>
      ) : (
        "no data found to show "
      )}
    </>
  );
}
