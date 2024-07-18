import React from "react"
import Answers from "./Answers"
import { nanoid } from "nanoid"
import Loadding from "./Loading"
import { decode } from "html-entities"

export default function Form(props) {
  const [isLoading, setIsloading] = React.useState(true)
  const [countCorect, setCountCorect] = React.useState("???")
  const [clickk, setClickk] = React.useState(true)
  const [formData, setFormData] = React.useState([])

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://opentdb.com/api.php?amount=10")
        const data = await res.json()

        if (data.results) {
          const newarr = data.results.map((item) => {
            const answerdata = [
              item.correct_answer,
              ...item.incorrect_answers,
            ].sort(() => Math.random() - 0.5)
            const updateAnswerData = answerdata.map((answer) => {
              return {
                id: nanoid(),
                value: decode(answer),
                isheld: false,
              }
            })
            return {
              id: nanoid(),
              question: decode(item.question),
              answer: updateAnswerData,
              correct: item.correct_answer,
              cautraloi: "",
            }
          })

          setFormData(newarr)
          setIsloading(false)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
        setIsloading(false)
      }
    }

    fetchData()
  }, [])

  function BtnClickResult() {
    setCountCorect(0)
    formData.forEach((items) => {
      if (items.correct === items.cautraloi) {
        setCountCorect((prev) => prev + 1)
      }
    })
    setClickk(false)
  }

  function handleClick(e) {
    const { id, value } = e.target
    if (clickk) {
      setFormData((prev) => {
        return prev.map((items) => {
          return e.target.form.id === items.id
            ? {
                ...items,
                cautraloi: value,
                answer: items.answer.map((item) => {
                  return id === item.id
                    ? {
                        ...item,
                        isheld: true,
                      }
                    : {
                        ...item,
                        isheld: false,
                      }
                }),
              }
            : items
        })
      })
    }
  }

  const formEl = formData.map((item) => (
    <Answers
      test={clickk}
      key={item.id}
      idform={item.id}
      question={item.question}
      answer={item.answer}
      onChange={handleClick}
      iscorect={item.correct}
      cautraloi={item.cautraloi}
    />
  ))

  const ClickTest = () => {
    props.onClick()
  }

  return (
    <div>
      {!isLoading ? (
        <div className="formsEl">
          <div>{formEl}</div>
          <div className="form-control">
            <div>
              <p>
                result {countCorect}/{formData.length}
              </p>
            </div>
            {clickk ? (
              <button onClick={BtnClickResult}>Check answers</button>
            ) : (
              <button onClick={ClickTest}>Play again</button>
            )}
          </div>
        </div>
      ) : (
        <Loadding />
      )}
    </div>
  )
}
