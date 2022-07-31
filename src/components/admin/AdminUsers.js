import React from 'react'
import { useLocation } from 'react-router-dom';

export default function AdminUsers({userInformation}) {

  
  return (
    <div>
      <table>
  <thead>
    <tr>
      <th>srno.</th>
      <th>firstname</th>
      <th>lastname</th>
      <th>email</th>
      <th>joined</th>
     
    </tr>
   </thead>
   <tbody>
  

     {userInformation.map((user , index) => {
      return (
        <tr>
        <td>{index}</td>
        <td>{user.firstname}</td>
        <td>{user.lastname}</td>
        <td>{user.email}</td>
        <td>{user.joined}</td>
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
