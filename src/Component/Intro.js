import React from 'react'

export default function Intro(props) {
    const handleClick = () => {
        props.handleClick(); 
    }

    return (
        <div className='intro'>
            <h1>Quizzical</h1>
            <h5>Some description if needed</h5>
            <button onClick={handleClick}>Start quiz</button> 
        </div>
    )
}
