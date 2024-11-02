// qr_code_generator.tsx

import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const QRCodeGenerator: React.FC = () => {
  const [boxId, setBoxId] = useState<string>('');
  const [boxName, setBoxName] = useState<string>('');
  const [showQRCode, setShowQRCode] = useState<boolean>(false);

  const handleGenerate = () => {
    if (boxId && boxName) {
      setShowQRCode(true);
    } else {
      alert('Please enter both Box ID and Box Name');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>QR Code Generator</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Box ID"
        value={boxId}
        onChangeText={setBoxId}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Box Name"
        value={boxName}
        onChangeText={setBoxName}
      />
      <View style={styles.button}>
        <Button
          title="Generate QR Code"
          onPress={handleGenerate}
        />
      </View>
      {showQRCode && (
        <View style={styles.qrContainer}>
          <QRCode
            value={JSON.stringify({ id: boxId, name: boxName })}
            size={200}
          />
        </View>
      )}
    </View>
  );
};

export default QRCodeGenerator;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24, // Increased font size
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#999',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5, // Added border radius
  },
  button: {
    width: '80%',
    marginTop: 10,
  },
  qrContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
});
