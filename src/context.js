import React, { createContext, useContext, useRef, useState } from "react";

const AppContext = createContext();

const sampleRate = 16000;

const getMediaStream = async () => {
  return navigator.mediaDevices.getUserMedia({
    audio: {
      deviceId: "default",
      sampleRate: sampleRate,
      sampleSize: 16,
      channelCount: 1,
    },
    video: false,
  });
};

const AppProvider = ({ children }) => {
  const [messages, setMessages] = useState([
    {
      from: "ai",
      text: "Hi there! I'm your AI assistant. I'm here to help you out with your questions. Ask me anything you want.",
    },
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const [processing, setProcessing] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const handleStartRecording = async () => {
    if (isRecording || processing) return;

    const stream = await getMediaStream();
    if (stream) {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        setIsRecording(false);
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64data = reader.result.split(",")[1];

          try {
            setProcessing(true);
            const response = await fetch(
              "https://am-sst.onrender.com/process_audio",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ audioContent: base64data }),
              }
            );
            setProcessing(false);

            if (!response.ok) {
              throw new Error(
                `Network response was not ok, status: ${response.status}`
              );
            }

            const data = await response.json();
            const ans = data.translatedText;

            setMessages((prev) => [
              ...prev,
              {
                from: "ai",
                text: ans.trim(),
              },
            ]);
          } catch (error) {
            console.error("Error sending audio data to the backend:", error);
            setMessages((prev) => [
              ...prev,
              {
                from: "ai",
                text: "Error Processing this message. Please try again later.",
              },
            ]);
          }
        };
      };

      mediaRecorder.start();
      setIsRecording(true);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
  };

  return (
    <AppContext.Provider
      value={{
        isRecording,
        setIsRecording,
        processing,
        setProcessing,
        messages,
        setMessages,
        handleStartRecording,
        handleStopRecording,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

export const useGlobalContext = () => useContext(AppContext);
