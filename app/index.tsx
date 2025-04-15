import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

export default function App() {
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const handlePress = (valor: string) => {
    if (valor === 'C') {
      setInput('');
      setResult('');
    } else if (valor === '=') {
      try {
        const evaluatedInput = input.replace(/\^/g, '**');
        setResult(eval(evaluatedInput).toString());
      } catch {
        setResult('Erro');
      }
    } else if (valor === '<=') {
      setInput(input.slice(0, -1));
    } else {
      setInput(input + valor);
    }
  };

  const buttons: string[][] = [
    ['C', '^', '<', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', ',', '<=', '='],
  ];

  return (
    <View style={styles.container}>
      <View style={styles.display}>
        <Text style={styles.input}>{input}</Text>
        <Text style={styles.result}>{result}</Text>
      </View>
      <View style={styles.buttons}>
        {buttons.map((row: string[], i: number) => (
          <View key={i} style={styles.row}>
            {row.map((btn: string) => (
              <TouchableOpacity
                key={btn}
                style={styles.button}
                onPress={() => handlePress(btn)}
              >
                <Text style={styles.buttonText}>{btn}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1'
  },
  display: {
    height: '25%' ,
    justifyContent: 'flex-end',
    padding: 15,
    backgroundColor: '#fff'
  },
  buttons: {
    height: '75%' ,
    paddingHorizontal: 5
  },
  row: {
    flex: 1, 
    flexDirection: 'row',
    marginBottom: 5
  },
  button: {
    flex: 1,
    backgroundColor: '#d4d4d2',
    marginHorizontal: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    maxHeight: 130  
  },
  input: {
    fontSize: 30,
    textAlign: 'right',
    color: '#333'
  },
  result: {
    fontSize: 40,
    textAlign: 'right',
    color: '#000',
    fontWeight: 'bold'
  },
  buttonText: {
    fontSize: 24,
    color: '#000'
  }
});
