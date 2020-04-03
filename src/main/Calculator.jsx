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
        if (this.state.current === 0){
            this.setState({
                operation: op,
                clearDisplay: true,
                current: 1
            })
        } else {
            const clearOp = op === '='
            let values = [ ...this.state.values ]
            values[0] = this.calculateResult()
            values[1] = 0
            console.log(`result: ${values[0]}`)
            
            this.setState({
                values,
                displayValue: values[0],
                operation: clearOp ? null : op,
                current: clearOp? 0: 1,
                clearDisplay: !clearOp
            })
        }
    }

    addDigit(n) {
        if (n === '.' && this.state.displayValue.includes('.')){
            return
        }
        const clearDisplay = this.state.displayValue === '0'
            || this.state.clearDisplay
        let currentValue = clearDisplay ? '': this.state.displayValue
        currentValue += n
        this.setState({displayValue: currentValue, clearDisplay: false})

        if (n !== '.'){
            let values = [ ...this.state.values ]
            const i = this.state.current
            const newValue = parseFloat(currentValue)
            values[i] = newValue
            this.setState({ values })
        }
    }

    calculateResult(){
        const op = this.state.operation
        const values = this.state.values
        switch(op){
            case '/': return values[0] / values[1]
            case '*': return values[0] * values[1]
            case '+': return values[0] + values[1]
            case '-': return values[0] - values[1]
        }
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
                <Button label="=" click={this.setOperation} operation/>
            </div>
        )
    }

}