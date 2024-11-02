// qr_code_scanner.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

interface BoxInfo {
  id: string;
  name: string;
  // Add more properties if needed
}

interface QRCodeScannerProps {
  onScan: (data: string) => void;
}

const { width } = Dimensions.get('window');

const QRCodeScanner: React.FC<QRCodeScannerProps> = ({ onScan }) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [boxData, setBoxData] = useState<BoxInfo | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    try {
      const boxInfo: BoxInfo = JSON.parse(data);
      setBoxData(boxInfo);
      Alert.alert('Box Scanned', `Box ID: ${boxInfo.id}\nBox Name: ${boxInfo.name}`);
      onScan(data); // Call the onScan prop with the scanned data
    } catch (error) {
      Alert.alert('Error', 'Invalid QR code data');
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.permissionContainer}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.permissionContainer}>
        <Text>No access to camera. Please allow camera permissions in your settings.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* QR Code Scanner */}
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.overlay}>
        <Text style={styles.overlayText}>Align QR code within frame</Text>
      </View>
      {scanned && (
        <View style={styles.scanAgainButton}>
          <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
        </View>
      )}
      {boxData && (
        <View style={styles.boxInfo}>
          <Text style={styles.boxInfoText}>Scanned Box Information:</Text>
          <Text style={styles.boxInfoText}>Box ID: {boxData.id}</Text>
          <Text style={styles.boxInfoText}>Box Name: {boxData.name}</Text>
        </View>
      )}
    </View>
  );
};

export default QRCodeScanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  permissionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  overlay: {
    position: 'absolute',
    top: '40%',
    left: '10%',
    right: '10%',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
    height: '20%',
    justifyContent: 'center',
  },
  overlayText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: -30,
    backgroundColor: 'transparent',
  },
  scanAgainButton: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
  },
  boxInfo: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  boxInfoText: {
    fontSize: 16,
    marginVertical: 2,
  },
});
