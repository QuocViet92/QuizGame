import React from "react";
import Answers from "./Answers";
import { nanoid } from 'nanoid'
import Loadding from "./Loading";
import {decode} from 'html-entities';

export default function Form(props){
    const [isLoading, setIsloading] = React.useState(true)
    const [countCorect,setCountCorect] = React.useState('???')
    const [clickk,setClickk]=React.useState(true)
    const [formData, setFormData] = React.useState([]);
        
        React.useEffect(() => {
            const fetchData = async () => {
                try {
                    const res = await fetch('https://opentdb.com/api.php?amount=10');
                    const data = await res.json();
                    const newarr = []
                    for(let i of data.results){
                        const answerdata = [i.correct_answer,...i.incorrect_answers].sort(() => Math.random() - 0.5);
                        const updateAnswerData = []
                        for(let i of answerdata){
                            updateAnswerData.push({
                                id: nanoid(), value: decode(i), isheld: false
                            })
                        }
                        const updatedata ={            
                                id: nanoid(),
                                question: decode(i.question),
                                answer:updateAnswerData,
                                correct: i.correct_answer,
                                cautraloi: ''            
                        }
                        newarr.push(updatedata)
                    }
                    setFormData(newarr)
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };  
            fetchData();
        }, []);

        function BtnClickResult(){
        setCountCorect(0)
            formData.forEach(items => {
                if(items.correct===items.cautraloi){
                    
                setCountCorect(prev => prev + 1)
                }
            })
            setClickk(false)
        }

        function handleClick(e){
            const {id, value} = e.target
            if(clickk){
        setFormData(prev => {
            return prev.map(items => {
                return e.target.form.id === items.id ? 
                {...items,
                    cautraloi : value ,
                    answer: items.answer.map(item => {
                        return id ===item.id ? {
                            ...item ,
                            isheld: true,
                        }
                        :{
                            ...item,
                            isheld:false
                        }
                    })
                }
                :items
            })
        })}
        }
        React.useEffect(()=>{
            const loaddingTime = setTimeout(() => {
                setIsloading(false)
            }, 1000);
            return  ()=>{
                clearTimeout(loaddingTime)
            }
        },[])
        const formEl = formData.map(item => (
            <Answers
            test ={clickk}
            key={item.id}
            idform ={item.id}
            question ={item.question}
            answer = {item.answer}
            onChange={handleClick}
            iscorect ={item.correct}
            cautraloi = {item.cautraloi}
        />
        ))
        
        const ClickTest = ()=>{
            props.onClick()
        }
        
        return(
            
            <div>
                { !isLoading?
                 <div className="formsEl">
        <div>{formEl}</div>
        <div className="form-control">
        <div><p>result {countCorect}/{formData.length}</p></div>
        {clickk ? <button onClick={BtnClickResult}>Check answers</button> :<button onClick={ClickTest}>Play again</button> }
        </div></div>: <Loadding/>      }
        </div>
        
        )
    }