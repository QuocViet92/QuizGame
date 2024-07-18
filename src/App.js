import "./App.css"
import React from "react"
import Form from "./Component/Form"
import Intro from "./Component/Intro"

function App() {
  const [isActive, setIsActive] = React.useState(false)
  function handleChangeActive() {
    setIsActive((prev) => !prev)
  }
  return (
    <div>
      {isActive ? (
        <Form isActive={isActive} onClick={handleChangeActive} />
      ) : (
        <Intro handleClick={handleChangeActive} />
      )}
    </div>
  )
}

export default App
