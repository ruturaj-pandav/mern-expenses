// import React from 'react'
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from "@mui/material/Button";
// import {useState} from 'react'



// export default function feedback({addFeedbackFunction}) {

// const [first, setfirst] = useState("")


//   function handleSubmit() {
//     let from_budget = JSON.parse(sessionStorage.getItem("from_budget"));
//     let user = from_budget.user; 
//     console.log("user  " , user)
//     console.log("handling submit")
//     let payload = {
//       userid : user.id ,
//       feedbackText : feedbackText
//     }
//     addFeedbackFunction(payload)
//   }
//   return (
//    <div> <TextareaAutosize
//    maxRows={4}
//    aria-label="maximum height"
//    placeholder="your feedback"

   
//    style={{ width: 200 }}
//  /><Button
//  variant='contained'
//  color='primary'
//  onClick={() => {
//      handleSubmit();
//  }}
//  >
//    PRESS ME
//  </Button>
//  </div>
//   )
// }


import React from 'react'
import {useState} from 'react'

export default function FeedBack({addFeedbackFunction , feedbackAdded}) {
const [feedbackText , setFeedbackText] =useState("")
  function handleSubmit() {
        let from_budget = JSON.parse(sessionStorage.getItem("from_budget"));
        let user = from_budget.user; 
      
        let payload = {
          userid : user.id ,
          feedbackText : feedbackText
        }
        if ((user != null  || user != undefined ) && feedbackText!=""){
        addFeedbackFunction(payload)
        }
        else {
          console.log("feedback text cant be empty")
        }
      }
  return (
       <div> <TextareaAutosize
       maxRows={4}
       aria-label="maximum height"
       placeholder="your feedback"
    
       onChange = {(e) => setFeedbackText(e.target.value)}
       style={{ width: 200 }}
     /><Button
     variant='contained'
     color='primary'
     onClick={() => {
         handleSubmit();
     }}
     >
       PRESS ME
     </Button>
     <br/>
     {feedbackAdded==true ? "success" : null}
     </div>
      )
}
