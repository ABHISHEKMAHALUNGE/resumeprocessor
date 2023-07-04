import React, { useState } from 'react'
import Chips from "react-chips";
import axios from 'axios';
 function Candidates(props) {
     const [s,setS] = useState(props.source.skills);
    const [newSkills,setNewSkills] = useState("");
   const [edit,setEdit]=useState("false") ;
   const [name,setName]=useState(props.source.name.trim()?props.source.name:"Name not updated");
   const [email,setEmail]=useState(props.source.email.trim()?props.source.email:"Email not updated");
   const [mobile,setMobile]=useState(props.source.Mobile.trim()?props.source.Mobile:"Mobile not updated");
  //  console.log(name,email,mobile);
   const handleSkill = (e)=>{
   setNewSkills(e.target.value);     
 }
 const handleKeyPress = (event) => {
      if(event.key==='Enter'){
      const c = s+','+newSkills;
      setS(c);
      }
    }
    // const handleBlur = (e) => {
    //   const s = e.target.innerText 
    //   console.log(s);
    //   // setName(s);
     
    // };
    const handleEdit=()=>{
      setEdit(edit==="false"?"true":"false");
      if(edit==="true"){
        const newRow = {"name":name,"email":email,"Mobile":mobile,"skills":s};
          //  console.log(props.dbid);
        try {
          const update =  axios.put(`http://localhost:5000/api/update/todo/${props.dbid}`,newRow);
          let action ='update';
          props.onSave(props.dbid,props.id,action) ;
          if(update.status===200){
          //  console.log(update);  
           alert('Data updated to MySQL');
           
          
            }
         } catch (error) {
           console.log(error);
         }
      }
    };
    
    };
    const handleKeyPressEmail = (event)=>{
      if (event.key === 'Enter') {
        event.preventDefault(); // Prevent line break on Enter key press
        // Perform desired action
        // console.log('Enter key pressed');
        // console.log(event.target.innerText)
        setEmail(event.target.innerText)
      }
    };
    const handleKeyPressMobile = (event)=>{
      if (event.key === 'Enter') {
        event.preventDefault(); // Prevent line break on Enter key press
        // Perform desired action
        // console.log('Enter key pressed');
        // console.log(event.target.innerText)
        setMobile(event.target.innerText)
      }
    };
    const handleKeyName = (event)=>{
      if (event.key === 'Enter') {
        event.preventDefault(); // Prevent line break on Enter key press
        // Perform desired action
        // console.log('Enter key pressed');
        // console.log(event.target.innerText)
        setName(event.target.innerText)
      }
    };
   
return (
    <div className="candidates">
    <h1  contentEditable ={edit}   onKeyDown={handleKeyName} >{name}</h1>
    <h2 contentEditable ={edit} onKeyDown={handleKeyPressEmail} >{email}</h2>
    <h2 contentEditable ={edit} onKeyDown={handleKeyPressMobile} >{mobile}</h2>
    {edit==="true" && <input className = "ipt"    onChange={handleSkill} onKeyDown={handleKeyPress}  ></input> }
    <Chips
          value={s.split(',')}     
          
        /> 
   <button onClick = {handleEdit} >{edit==="true"?"Save":"Edit"}</button>
   <button >Delete</button>
    </div>
  )
  }



export default Candidates;

// const handleDel=()=>{
//   // /delete/todo/:id
//   try {
//     const update =  axios.delete(`http://localhost:5000/api/delete/todo/${props.dbid}`);
//     let action = 'delete';
//     props.onSave(props.dbid,props.id,action) ;
//     props.onDel(props.dbid,props.id)
//     if(update.status===200){
//     //  console.log(update);  
//         console.log("deleted from DB");
     
    
//       }
//    } catch (error) {
//      console.log(error);
//    }
// }