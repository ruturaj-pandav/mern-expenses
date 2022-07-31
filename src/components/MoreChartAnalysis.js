import React from 'react'
import {useState , useEffect} from "react"
export default function MoreChartAnalysis({spendAnalysisGroupByTags}) {
const [data , setdata] = useState()
useEffect(() => {
setdata(spendAnalysisGroupByTags)
} , [data])
  return (
    <><center><h2>Transactions grouped by tags</h2></center>
<br />

    <div className="mainDivMoreAnalysis">
        
        {spendAnalysisGroupByTags.map((entry , index) => {
            return (
                <div className="individualTagDivision">
                   <center> <span className="tagHeading">{entry._id}</span></center>
                    <ul>
                        {entry.title.map((title , index) => {
                            return (
                                <center><div className = "tagDisplayEntryDiv">
                                <div>{title}</div>
                                <div>{entry.amount[index]}</div>
                                </div></center>
                            )
                        })}
                    </ul>
                </div>
            )
        })}
    </div></>
  )
}
