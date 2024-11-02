// index.tsx

import React, { useState } from "react";
import { Link } from "@react-navigation/native";
import { Text, View, Button, StyleSheet } from "react-native";
import QRCodeGenerator from "./qr_code/qr_code_generator";
import QRCodeScanner from "./qr_code/qr_code_scanner"; // Adjust path if necessary

export default function Index() {
  const [showQRCodeGenerator, setShowQRCodeGenerator] = useState(false);
  const [showQRCodeScanner, setShowQRCodeScanner] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);

  const toggleQRCodeGenerator = () => {
    setShowQRCodeGenerator(!showQRCodeGenerator);
    setShowQRCodeScanner(false); // Ensure only one component is visible at a time
  };

  const toggleQRCodeScanner = () => {
    setShowQRCodeScanner(!showQRCodeScanner);
    setShowQRCodeGenerator(false); // Ensure only one component is visible at a time
  };

  const handleScan = (data: string) => {
    setScannedData(data); // Store the scanned data
    setShowQRCodeScanner(false); // Hide the scanner after scanning
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Welcome to Smart Box Inventory</Text>
      
      <Link to="/boxes" style={styles.linkText}>
        List of Boxes
      </Link>

      <View style={styles.buttonContainer}>
        <Button
          title={showQRCodeGenerator ? "Hide QR Code Generator" : "Show QR Code Generator"}
          onPress={toggleQRCodeGenerator}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title={showQRCodeScanner ? "Hide QR Code Scanner" : "Show QR Code Scanner"}
          onPress={toggleQRCodeScanner}
        />
      </View>

      {showQRCodeGenerator && <QRCodeGenerator />}

      {showQRCodeScanner && <QRCodeScanner onScan={handleScan} />}

      {scannedData && (
        <Text style={styles.scannedDataText}>Scanned Data: {scannedData}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20, // Added padding
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0", // Light background color
  },
  titleText: {
    fontSize: 24, // Increased font size
    marginBottom: 20,
    fontWeight: 'bold',
  },
  linkText: {
    fontSize: 18,
    color: "blue",
    marginBottom: 20,
  },
  buttonContainer: {
    marginVertical: 10,
    width: '80%', // Set width for consistency
  },
  scannedDataText: {
    marginTop: 20,
    fontSize: 16,
  },
});
