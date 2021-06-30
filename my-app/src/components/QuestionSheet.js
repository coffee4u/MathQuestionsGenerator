import { Component } from "react";

export default class QuestionSheet extends Component {
  render (){
    const { questionsArray } = this.props
    return(
      <div>
        {questionsArray.map(question=>{
          return (<p>{question}</p>)
        })}
      </div>

    )

  }
}