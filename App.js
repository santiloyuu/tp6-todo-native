import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Titulo from './components/Titulo';
import Form from './components/Form';
import Tarea from './components/Tarea';

export default function App() {
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    const cargarTareas = async () => {
      try {
        const tareasAlmacenadas = await AsyncStorage.getItem('tareas');
        if (tareasAlmacenadas !== null) {
          setTareas(JSON.parse(tareasAlmacenadas));
        }
      } catch (error) {
        console.error(error);
      }
    };

    cargarTareas();
  }, []);

  useEffect(() => {
    const guardarTareas = async () => {
      try {
        await AsyncStorage.setItem('tareas', JSON.stringify(tareas));
      } catch (error) {
        console.error(error);
      }
    };

    guardarTareas();
  }, [tareas]);

  return (
    <SafeAreaView style={styles.container}>
      <Titulo style={styles.titulo} />

      <Form tareas={tareas} setTareas={setTareas} />

      <FlatList
        data={tareas}
        renderItem={({ item }) => (
          <Tarea
            tareas={tareas}
            setTareas={setTareas}
            id={item.id}
            texto={item.texto}
            descripcion={item.descripcion} 
            tiempo={item.tiempo}
            completada={item.completada}
          />
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    padding: 20,
  },
  titulo: {
    display: 'flex',
    justifyContent: 'center'
  }
});
