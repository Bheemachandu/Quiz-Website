import React from 'react'

const Option = (props) => {
    const { option, updateAnswer, answer } = props


    const update = () => {
        updateAnswer(option)
    }
    return (
        <li className="listItem" >
            <input checked={answer === option} onChange={update} id={option} type="radio" />
            <label htmlFor={option} >{option}</label>
        </li>
    )
}

export default Option
