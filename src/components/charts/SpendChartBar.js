import React from "react";
import BarChart from "react-bar-chart";

const data = [
  { text: "Man", value: 500 },
  { text: "Woman", value: 300 },
];

const margin = { top: 20, right: 20, bottom: 30, left: 40 };
export default function SpendChartBar() {
   function  handleBarClick(element, id){ 
        console.log(`The bin ${element.text} with id ${id} was clicked`);
      }
  return (
    <div>
      <BarChart
        ylabel="Quantity"
        width={500}
        height={500}
        margin={margin}
        data={data}
        onBarClick={handleBarClick}
      />
    </div>
  );
}
