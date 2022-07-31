
import React, { PureComponent } from 'react';
// import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { VictoryChart , VictoryBar } from 'victory';

export default function CreditChart({creditDetails}) {
  
  return (
  
    <>
    {" "}
<div>     


<VictoryChart
//   theme={VictoryTheme.material}
  domainPadding={10}
>
  <VictoryBar
    style={{ data: { fill: "#c43a31" } }}
    data={ creditDetails}
  
  />
</VictoryChart>
    </div>
    
  </>
    

  );
}
