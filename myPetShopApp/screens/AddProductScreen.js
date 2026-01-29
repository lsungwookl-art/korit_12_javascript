import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { ref, set } from "firebase/database";
import { database } from '../firebaseConfig';

export default function AddProductScreen({ route, navigation }) {
  const { scannedBarcode } = route.params || {};
  const [name, setName] = useState('');
  const [qty, setQty] = useState('0');

  const onSave = () => {
    set(ref(database, 'products/' + scannedBarcode), {
      name: name,
      quantity: parseInt(qty)
    }).then(() => {
      Alert.alert("성공");
      navigation.popToTop();
    });
  };

  return (
    <View style={styles.container}>
      <Text>바코드: {scannedBarcode}</Text>
      <TextInput placeholder="상품명" onChangeText={setName} style={styles.input} />
      <TextInput placeholder="초기 수량" onChangeText={setQty} keyboardType="numeric" style={styles.input} />
      <Button title="저장하기" onPress={onSave} />
    </View>
  );
}