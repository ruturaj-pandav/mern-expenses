import React from 'react'
import { useLocation } from 'react-router-dom';

export default function AdminFeedback({feedbackInformation}) {

  
  return (
    <div>
      <table>
  <thead>
    <tr>
      <th>srno.</th>
      <th>userid</th>
      <th>feedbackText</th>
      <th>feedbackOn</th>
      <th>actions</th>
      
     
    </tr>
   </thead>
   <tbody>
  

     {feedbackInformation.map((user , index) => {
      return (
        <tr>
        <td>{index}</td>
        <td>{user.userid}</td>
        <td>{user.feedbackText}</td>
        <td>{user.feedbackOn}</td>
        <td>reply</td>
        
        
      </tr>
      )
     })}
    
     <tr>
     </tr>
  </tbody>
</table>
    </div>
  )
}
