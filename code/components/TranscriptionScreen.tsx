import React from "react";
import { Button, View, Alert } from "react-native";

const TranscriptionScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Press Me" onPress={() => Alert.alert("Button Pressed")} />
    </View>
  );
};

export default TranscriptionScreen;
