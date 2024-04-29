import React from "react";
import Answer from "./Answer";


export default function Answers(props) {
 
  const liEl = props.answer.map(answerItem => {
     return  <Answer
     test={props.test}
            cautraloi = {props.cautraloi}
            iscorect = {props.iscorect}
            onChange={props.onChange}
            id={answerItem.id}
            key={answerItem.id}
            item={answerItem}
            isChecked={answerItem.cautraloi === answerItem.value}/>
            
            
  })

  return <div className="answers">
    <form key={props.idform} id ={props.idform} >
     <h3>{props.question}</h3>
     <ul>
      {liEl}
      </ul>
    </form>
    </div>
}
