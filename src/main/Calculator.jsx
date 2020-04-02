import React, { Component } from 'react'
import './Calculator.css'
import Button from  '../components/Button'
import Display from '../components/Display'


const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component{   

    state = { ...initialState }

    constructor(props){
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
        this.calculateResult = this.calculateResult.bind(this)
    }

    clearMemory() {
        this.setState({ ...initialState })
    }

    setOperation(op) {
        const nextPos = this.state.current ? 0: 1
        let values = [ ...this.state.values ]
        values[this.state.current] = this.state.displayValue
        this.setState({
            values: values,
            operation: op,
            clearDisplay: true,
            current: nextPos
        })
        console.log(this.state)
        return
    }

    addDigit(n) {
        console.log(this.state)
        if (n === '.' && this.state.displayValue.includes('.')){
            return
        }
        if (this.state.displayValue.length >=6){
            return
        }
        const clearDisplay = this.state.displayValue === '0'
        || this.state.clearDisplay
        const currentValue = clearDisplay ? '': this.state.displayValue
        this.setState({displayValue: currentValue + n, clearDisplay: false})
    }

    calculateResult(){
        let values = [ ...this.state.values ]
        values[this.state.current] = this.state.displayValue
        const exprString = `${values[0]}${this.state.operation}${values[1]}`
        const result = eval(exprString)

        this.setState({
            displayValue: result,
            values: [this.state.values[0], 0],
            current: 1
        })
    }
    

    render(){
        return (
            <div className="calculator">
                <Display value={this.state.displayValue} />
                <Button label="AC" click={this.clearMemory} triple/>
                <Button label="/" click={this.setOperation} operation/>
                <Button label="7" click={this.addDigit}/>
                <Button label="8" click={this.addDigit}/>
                <Button label="9" click={this.addDigit}/>
                <Button label="*" click={this.setOperation} operation/>
                <Button label="4" click={this.addDigit}/>
                <Button label="5" click={this.addDigit}/>
                <Button label="6" click={this.addDigit}/>
                <Button label="-" click={this.setOperation} operation/>
                <Button label="1" click={this.addDigit}/>
                <Button label="2" click={this.addDigit}/>
                <Button label="3" click={this.addDigit}/>
                <Button label="+" click={this.setOperation} operation/>
                <Button label="0" double click={this.addDigit}/>
                <Button label="." click={this.addDigit}/>
                <Button label="=" click={this.calculateResult} operation/>
            </div>
        )
    }

}