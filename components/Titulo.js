// ./components/Titulo.js
import React from 'react';
import { Text, StyleSheet } from 'react-native';

const Titulo = () => {
  return <Text style={styles.title}>Agenda</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
    display:'flex',
    justifyContent:'center'
  },
});

export default Titulo;
