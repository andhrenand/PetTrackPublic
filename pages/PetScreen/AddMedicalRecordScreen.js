import React, { useState } from "react";
import {View, Text, TextInput, TouchableOpacity, Alert} from "react-native";
import { ref, get, update } from "firebase/database";
import { realtimeDb } from "../../firebase";
import AddMedicalRecordStyle from "../../styles/PetScreenStyle/AddMedicalRecordScreenStyle";

export default function AddMedicalRecordScreen({ route, navigation }) {
    const { petId } = route.params;
    const [newDiagnosis, setNewDiagnosis] = useState('');
    const [newTreatment, setNewTreatment] = useState('');
    const [newAnamnesis, setNewAnamnesis] = useState('');
  

    const addMedicalRecord = async () => {
      if (!newDiagnosis || !newTreatment || !newAnamnesis) {
        Alert.alert('Error', 'Please enter all fields: diagnosis, treatment, and anamnesis.');
        return;
      }
  
      try {
        // Reference the Realtime Database document
        const petRef = ref(realtimeDb, `pets/${petId}`, 'PET001');
        const currentDate = new Date().toISOString();
  
        // Retrieve current data for diagnosa, tindakan, and anamnesis
        const snapshot = await get(petRef);
        if (snapshot.exists()) {
          const petData = snapshot.val();
  
          // Ensure diagnosa, tindakan, and anamnesis are arrays, and append the new values with dates
          const updatedDiagnosis = petData.diagnosis
            ? [...petData.diagnosis, { date: currentDate, text: newDiagnosis }]
            : [{ date: currentDate, text: newDiagnosis }];
          const updatedTreatment = petData.treatment
            ? [...petData.treatment, { date: currentDate, text: newTreatment }]
            : [{ date: currentDate, text: newTreatment }];
          const updatedAnamnesis = petData.anamnesis
            ? [...petData.anamnesis, { date: currentDate, text: newAnamnesis }]
            : [{ date: currentDate, text: newAnamnesis }];
  
          // Update the pet record in Realtime Database
          await update(petRef, {
            diagnosis: updatedDiagnosis,
            treatment: updatedTreatment,
            anamnesis: updatedAnamnesis
          });
  
          Alert.alert('Success', 'New diagnosis, treatment, and anamnesis added.');
          navigation.goBack(); // Go back to the previous screen
        } else {
          Alert.alert('Error', 'Pet record not found.');
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to add medical record.');
        console.error(error);
      }
    };
  
    return (
      <View style={{padding:10, alignSelf:'center', width:"100%"}}>
        <Text style={AddMedicalRecordStyle.TextLabelStyle}>Anamnesis</Text>
        <TextInput
          placeholder="Enter new Anamnesis"
          value={newAnamnesis}
          onChangeText={setNewAnamnesis}
          style={AddMedicalRecordStyle.TextInputStyle}
        />
        <Text style={AddMedicalRecordStyle.TextLabelStyle}>Diagnosa</Text>
        <TextInput
          placeholder="Enter new diagnosis"
          value={newDiagnosis}
          onChangeText={setNewDiagnosis}
          style={AddMedicalRecordStyle.TextInputStyle}
        />
        <Text style={AddMedicalRecordStyle.TextLabelStyle}>Tindakan</Text>
        <TextInput
          placeholder="Enter new treatment"
          value={newTreatment}
          onChangeText={setNewTreatment}
          style={AddMedicalRecordStyle.TextInputStyle}
        />
        <TouchableOpacity 
          style={{ marginTop: 40, alignSelf: 'center', alignItems: 'center', backgroundColor: '#83520A', paddingVertical: 10, paddingHorizontal: 30, borderRadius: 30 }}
          onPress={addMedicalRecord}
        >
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFFFFF' }}>Add Medical Record</Text>
        </TouchableOpacity>
      </View>
    );
}
