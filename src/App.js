import { useState } from "react"
import Option from "./components/option";
import { QRCodeSVG } from 'qrcode.react';

import './App.css';

const questionBank = [
  {
    question: "What is the Capital of Gujarat?",
    options: ["Ahemdabad", "Surat", "Gandhinagar", "Rajkot"],
    correctOption: "Gandhinagar"
  },
  {
    question: "What is the Capital of Andhra Pradesh?",
    options: ["Ahemdabad", "Surat", "Amaravati", "Rajkot"],
    correctOption: "Amaravati"
  },
  {
    question: "What is the Capital of Sikkim?",
    options: ["Ahemdabad", "Surat", "Gangtok", "Rajkot"],
    correctOption: "Gangtok"
  },
  {
    question: "What is the Capital of Himachal Pradesh?",
    options: ["Bhopal", "Shimla", "Chandigarh", "Rajkot"],
    correctOption: "Shimla"
  },
  {
    question: "What is the Capital of Chhattisgarh?",
    options: ["Ahemdabad", "Raipur", "Gandhinagar", "Rajkot"],
    correctOption: "Raipur"
  }
]

function App() {
  const [activeQuestion, setActiveQuestion] = useState(questionBank[0]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [answerText, setAnswerText] = useState("")
  const [nameGiven, setNameGiven] = useState(false)
  const [name, setName] = useState("")
  const [disable, setDisable] = useState(false)
  const [lastQuestion, setLastQuestion] = useState(false)
  const [score, setScore] = useState(0)

  const updateAnswer = (ans) => {
    setAnswerText(ans)
  }

  const host = window.location.host;

  const submitAnswer = () => {
    if (answerText === activeQuestion.correctOption) (setScore(score + 1))
    if (activeQuestionIndex < questionBank.length - 1) {
      setDisable(true)
      setTimeout(() => {
        setActiveQuestionIndex(activeQuestionIndex + 1);
        setActiveQuestion(questionBank[activeQuestionIndex + 1])
        setAnswerText("")
        setDisable(false)
      }, 1000)
    }
    else {
      setLastQuestion(true)
      setDisable(true)
    }
  }

  const nameUpdate = (event) => {
    setName(event.target.value)
  }

  const submitName = () => {
    setNameGiven(!nameGiven)
  }

  const resultShown = () => {
    if (answerText !== "") {
      if (disable) {
        if (answerText !== activeQuestion.correctOption) {
          return (<p className="redColor">stating the answer is wrong</p>)
        }
      }
    }
  }

  const retryButton = () => {
    setActiveQuestion(questionBank[0])
    setAnswerText("")
    setActiveQuestionIndex(0)
    setDisable(false)
    setName("")
    setLastQuestion(false)
    setNameGiven(false)
    setScore(0)
  }

  const retryContainer = () => {
    console.log(lastQuestion)
    if (lastQuestion) {
      return (
        <div className="retryConatiner">
          <p>You got {score} out of 5</p>
          <button onClick={retryButton}>Retry</button>
        </div>
      )
    }
  }

  const resultShownOnDesktop = () => {
    if (answerText !== "") {
      if (disable) {
        if (answerText === activeQuestion.correctOption) {
          return (<p className="green">Congratulations {name}</p>)
        }
      }
    }
  }




  return (
    <div className="mainConatiner">
      <h1 className="mainHeading">QUIZ GAME</h1>
      <div className="desktopContainer">
        <div className="QuestionDiv">
          <h3 className="qustHeading">{activeQuestion.question}</h3>
          <ul className="list">
            {activeQuestion.options.map((option) => (
              <Option
                option={option}
                key={option}
                updateAnswer={updateAnswer}
                answer={""}
              />
            ))}
          </ul>

          {resultShownOnDesktop()}
          <p>Scan this QR Code and start Quiz</p>
          <QRCodeSVG value={host} />,
        </div>
      </div>
      <div className="mobileContainer">
        {nameGiven ?
          (<div className="questiondiv">
            <h1 className="headingElement">Welcome {name}</h1>
            <div className="QuestionDiv">
              <h3 className="qustHeading">{activeQuestion.question}</h3>
              <ul className="list">
                {activeQuestion.options.map((option) => (
                  <Option
                    option={option}
                    key={option}
                    updateAnswer={updateAnswer}
                    answer={answerText}
                  />
                ))}
              </ul>
              <button disabled={disable} onClick={submitAnswer}>submit</button>
              {resultShown()}
              {retryContainer()}
            </div>
          </div>) :
          (<div className="nameContainer">
            <div >
              <label>Enter Your Name</label><br />
              <input value={name} onChange={nameUpdate} type="text" /><br />
              <button onClick={submitName}>Submit</button>
            </div>
          </div>)
        }
      </div>
    </div>
  )
}

export default App;
