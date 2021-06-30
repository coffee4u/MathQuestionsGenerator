import { Component } from 'react';
import '../App.css';

import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import ReactToPrint from 'react-to-print';
import QuestionSheet from './QuestionSheet';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionMax: 100,
      value: 100,
      checkAdd: false,
      checkSub: false,
      checkMul: false,
      checkDiv: false,
      questionsArray: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
  }

  handleNumberChange(event){
    this.setState({value: event.target.value});
  }
  handleChange(event) {
    this.setState({ ...this.state, [event.target.name]: event.target.checked });
  }

  handleSubmit(event) {
    const { checkAdd, checkSub, checkMul, checkDiv, value, questionMax } = this.state
    const questionsArray = []
    const operators = []
    if(checkAdd)operators.push('+')
    if(checkSub)operators.push('-')
    if(checkMul)operators.push('x')
    if(checkDiv)operators.push('÷')
    console.log('operators:', operators)
    let i = 0
    while(i < questionMax){
      const operator = operators[this.randomIntFromInterval(0, operators.length - 1)]
      let numA = this.randomIntFromInterval(1, value)
      let numB = this.randomIntFromInterval(1, value)
      switch(operator)
      {
        case '+':
          if(numA + numB > value)continue
          break;
          case '-':
            // 避免出现负数
            if(numA < numB){[numA,numB] = [numB,numA]}
            // 相同值也太简单了，去掉
            if(numA - numB > value || numA === numB )continue
            break;
            case 'x':
              // 1 太简单了
              numA++
              numB++
              if(numA * numB > value)continue
              break;
              case '÷':
                numA++
                numB++
                if(numA < numB){[numA,numB] = [numB,numA]}
                if(numA / numB > value || numA%numB != 0)continue
                break;
      }
      const question = `${numA} ${operator} ${numB} = ___`
      if(!questionsArray.includes(question)){
        questionsArray.push(question)
        i++
      }
    }
    // for(let i=0;i<value;i++){
    //   const operator = operators[this.randomIntFromInterval(0, operators.length - 1)]
    //   const numA = this.randomIntFromInterval(0, value)
    //   const numB = this.randomIntFromInterval(0, value)
    // }
    console.log('questionsArray:', questionsArray)
    this.setState({
      questionsArray: questionsArray,
    })
  }

  randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  renderQuestionSheet(){
    const { questionsArray } = this.state

    if(questionsArray.length > 0){
      return (
        <div>
          <QuestionSheet questionsArray={questionsArray} ref={el => (this.componentRef = el)}/>
          <ReactToPrint
          trigger={() => <a href="#" className="App-link" >点此打印</a>}
          content={() => this.componentRef}
          />
        </div>
      )
    }
    return null
  }

  render() {
    const { checkAdd, checkSub, checkMul, checkDiv, event, value } = this.state
    console.debug('event:', event)

    return (
      <div className="App">
        <header className="App-header">
            <label>
              结果范围: 
              <input type="text" value={value} onChange={this.handleNumberChange} />
            </label>
            <FormGroup row>
            <label>
              类型: 
            </label>
            <FormControlLabel
              control={<Checkbox checked={checkAdd} onChange={this.handleChange} name="checkAdd" />}
              label="加法"
            />

                  <FormControlLabel
              control={<Checkbox checked={checkSub} onChange={this.handleChange} name="checkSub" />}
              label="减法"
            />
                  <FormControlLabel
              control={<Checkbox checked={checkMul} onChange={this.handleChange} name="checkMul" />}
              label="乘法"
            />
                  <FormControlLabel
              control={<Checkbox checked={checkDiv} onChange={this.handleChange} name="checkDiv" />}
              label="除法"
            />
          </FormGroup>
          <Button variant="contained" color="primary" onClick={this.handleSubmit}>
            生成
          </Button>
          {this.renderQuestionSheet()}
        </header>

      </div>

    );
  }
}
