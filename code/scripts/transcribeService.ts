import axios from "axios";
import * as FileSystem from "expo-file-system";

import Constants from "expo-constants";

const openaiApiKey = "YOUR_OPENAI_API_KEY";

export const transcribeAudio = async (uri: string) => {
  try {
    const fileUri = uri;
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    const formData = new FormData();
    formData.append("file", {
      uri: fileInfo.uri,
      name: "audio.wav",
      type: "audio/wav",
    } as any);

    formData.append("model", "whisper-1");

    const response = await axios.post(
      "https://api.openai.com/v1/audio/transcriptions",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${openaiApiKey}`,
        },
      }
    );

    return response.data.text;
  } catch (error) {
    console.error("Failed to transcribe audio", error);
  }
};
