import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { ref, runTransaction, get } from "firebase/database";
import { database } from '../firebaseConfig';

export default function ScannerScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [mode, setMode] = useState('IN');

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);
    const productRef = ref(database, `products/${data}`);
    const snapshot = await get(productRef);

    if (!snapshot.exists()) {
      Alert.alert("미등록", "등록 화면으로 이동합니다.", [
        { text: "확인", onPress: () => navigation.navigate('AddProduct', { scannedBarcode: data }) }
      ]);
      return;
    }

    runTransaction(productRef, (current) => {
      if (current) {
        if (mode === 'IN') current.quantity += 1;
        else if (mode === 'OUT' && current.quantity > 0) current.quantity -= 1;
      }
      return current;
    }).then(() => Alert.alert("완료", `${mode === 'IN' ? '입고' : '출고'}되었습니다.`));
  };

  if (hasPermission === null) return <Text>카메라 권한 요청 중...</Text>;
  return (
    <View style={styles.container}>
      <View style={styles.btnGroup}>
        <Button title="입고(+)" onPress={() => setMode('IN')} color={mode === 'IN' ? "green" : "gray"} />
        <Button title="출고(-)" onPress={() => setMode('OUT')} color={mode === 'OUT' ? "red" : "gray"} />
      </View>
      <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={StyleSheet.absoluteFillObject} />
      {scanned && <Button title="다시 스캔" onPress={() => setScanned(false)} />}
    </View>
  );
}
// ... 스타일 생략