import React from "react";
import Form from "./Form";
import Intro from "./Intro";


export default function Quiz(){
    const [isActive,setIsActive]= React.useState(false)
    function handleChangeActive(){
        setIsActive(prev => !prev)
    }
   
    return(
        <div>
        {isActive ? <Form isActive ={isActive} onClick={handleChangeActive}/> : <Intro isActive = {isActive} handleClick ={handleChangeActive} />}
        </div>
    )
}