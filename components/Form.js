import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Modal, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Form = ({ setTareas, tareas }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [textoTarea, setTextoTarea] = useState('');
  const [descripcionTarea, setDescripcionTarea] = useState('');

  const agregarTarea = () => {
    const texto = textoTarea.trim();
    const descripcion = descripcionTarea.trim();
    if (texto.length === 0 || descripcion.length === 0) {
      Alert.alert('Advertencia', 'Debes ingresar tanto el nombre de la tarea como una descripción');
    } else {
      setTareas([
        ...tareas,
        {
          id: Date.now().toString(), 
          texto: texto, 
          descripcion: descripcion,
          tiempo: new Date().toLocaleTimeString(), 
          completada: false, 
        },
      ]);
      setTextoTarea(''); 
      setDescripcionTarea('');
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button style={styles.btn} title="Agregar tarea" onPress={() => setModalVisible(true)} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Nueva Tarea</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre de la tarea"
              value={textoTarea}
              onChangeText={setTextoTarea}
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Descripción de la tarea"
              value={descripcionTarea}
              onChangeText={setDescripcionTarea}
              multiline
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.gradientButton} onPress={agregarTarea}>
                <LinearGradient
                  colors={['#4CAF50', '#2E7D32']}
                  style={styles.gradient}
                >
                  <Text style={styles.buttonText}>Agregar</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    margin: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '100%',
    backgroundColor: '#fff',
  },
  btn:{
    fontSize: 24,
    fontWeight: 'bold',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top', 
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    marginBottom: 130,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f44336',
  },
  gradientButton: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 5,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Form;
