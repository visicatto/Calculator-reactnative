import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Button from './src/components/Button';
import Display from './src/components/Display';

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
};

export default class App extends Component {
  state = { ...initialState };

  addDigit = digit => {
    const { displayValue, clearDisplay } = this.state;

    // Verifica se o dígito é um ponto (.) e se o display não está limpo e se já contém um ponto
    if (digit === '.' && !clearDisplay && displayValue.includes('.')) {
      return;
    }

    // Concatena o dígito ao display atual
    const newValue = clearDisplay ? digit : (displayValue === '0' ? digit : displayValue + digit);

    this.setState({
      displayValue: newValue,
      clearDisplay: false,
    });
  };

  clearMemory = () => {
    this.setState({ ...initialState });
  };

  setOperation = operation => {
    const { values, displayValue } = this.state;
    let newValues = [...values];
    
    if (this.state.current === 0) {
      newValues[0] = parseFloat(displayValue);
      this.setState({
        values: newValues,
        operation,
        current: 1,
        clearDisplay: true,
      });
    } else {
      const result = this.calculate(newValues[0], parseFloat(displayValue), this.state.operation);
      newValues = [result, 0];
      this.setState({
        displayValue: result.toString(),
        values: newValues,
        operation: operation === '=' ? null : operation,
        current: operation === '=' ? 0 : 1,
        clearDisplay: true,
      });
    }
  };

  calculate = (value1, value2, operation) => {
    switch (operation) {
      case '+':
        return value1 + value2;
      case '-':
        return value1 - value2;
      case '*':
        return value1 * value2;
      case '/':
        return value1 / value2;
      default:
        return value1;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Display value={this.state.displayValue} />
        <View style={styles.buttons}>
          <Button label="AC" triple onClick={this.clearMemory} />
          <Button label="/" operation onClick={() => this.setOperation('/')} />
          <Button label="7" onClick={() => this.addDigit('7')} />
          <Button label="8" onClick={() => this.addDigit('8')} />
          <Button label="9" onClick={() => this.addDigit('9')} />
          <Button label="*" operation onClick={() => this.setOperation('*')} />
          <Button label="4" onClick={() => this.addDigit('4')} />
          <Button label="5" onClick={() => this.addDigit('5')} />
          <Button label="6" onClick={() => this.addDigit('6')} />
          <Button label="-" operation onClick={() => this.setOperation('-')} />
          <Button label="1" onClick={() => this.addDigit('1')} />
          <Button label="2" onClick={() => this.addDigit('2')} />
          <Button label="3" onClick={() => this.addDigit('3')} />
          <Button label="+" operation onClick={() => this.setOperation('+')} />
          <Button label="0" double onClick={() => this.addDigit('0')} />
          <Button label="." onClick={() => this.addDigit('.')} />
          <Button label="=" onClick={() => this.setOperation('=')} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
