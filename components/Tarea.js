import React, { useState } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity, Alert } from 'react-native';
import tacho from '../assets/tacho.png';

const Tarea = ({ id, texto, descripcion, tiempo, completada, tareas, setTareas }) => {
  const [tachado, setTachado] = useState(completada);

  const eliminarTarea = () => {
    Alert.alert(
      'Confirmación',
      '¿Seguro que deseas eliminar la tarea?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Borrar',
          onPress: () => {
            setTareas(tareas.filter(tarea => tarea.id !== id));
          },
        },
      ]
    );
  };

  let tiempoTomado = 0;
  const tacharTarea = () => {
    setTachado(!tachado);
    if (!tachado) {
      tiempoTomado = Date.now() - id;
      setTareas(
        tareas.map(t =>
          t.id === id
            ? { ...t, completada: true, tiempo: tiempoTomado }
            : t
        )
      );
    } else {
      setTachado(false);
      setTareas(
        tareas.map(t =>
          t.id === id
            ? { ...t, completada: false, tiempo: 0 }
            : t
        )
      );
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={tacharTarea} style={styles.textContainer}>
        <Text style={[styles.title, tachado && styles.tachado]}>
          {texto}
        </Text>
        <Text style={styles.descripcion}>
          {descripcion}  

        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={eliminarTarea} style={styles.button}>
        <Image
          style={styles.image}
          source={tacho}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  descripcion: {
    fontSize: 14,
    color: 'gray',
    marginTop: 4,
  },
  tachado: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  button: {
    padding: 5,
  },
  image: {
    width: 35,
    height: 35,
  },
});

export default Tarea;
