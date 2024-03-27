import React, { useEffect, useState } from "react";
import styles from "./ChatBox.module.css";
import Title from "../../components/Title/Title";
import Body from "../../components/Body/Body";
import { ThreeCircles } from "react-loader-spinner";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context"; // Ensure this path is correct
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faStopCircle } from "@fortawesome/free-solid-svg-icons";


const ChatBox = () => {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const { isRecording, handleStartRecording, handleStopRecording, messages } =
    useGlobalContext();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUserName(user ? user.displayName : "");
    });

    return () => unsubscribe && unsubscribe();
  }, []);

  const signOutHandler = async () => {
    try {
      await signOut(auth);
      alert("Signed out successfully!");
    } catch (error) {
      console.error("Sign out error", error.message);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      handleStopRecording(); // Stop recording, which will trigger audio processing
    } else {
      handleStartRecording(); // Start a new recording session
    }
  };

  return (
    <>
      {loading ? (
        <div className={styles.loadcontainer}>
          <ThreeCircles
            height="50"
            width="50"
            color="#046cf1"
            visible={true}
            ariaLabel="three-circles-rotating"
          />
        </div>
      ) : (
        <div className={styles.main}>
          <div className={styles.container}>
            <div className={`${styles.header} ${styles.item}`}>
              <h2>Hey, {userName || "User"}</h2>
              <Link
                to="/login"
                className={styles.link}
                onClick={signOutHandler}
              >
                {userName ? "Sign Out" : "Sign In"}
              </Link>
            </div>
            <Title />
            <Body />
            <div className={styles.recordingControls}>
              <button
                className={styles.recordingButton}
                onClick={toggleRecording}
              >
                <FontAwesomeIcon
                  icon={isRecording ? faStopCircle : faMicrophone}
                />
                {isRecording ? " Stop Recording" : " Start Recording"}
              </button>
            </div>
            {/* <div className={styles.messages}>
              {messages.map((msg, index) => (
                <p key={index} className={msg.from === "ai" ? styles.aiMessage : styles.userMessage}>{msg.text}</p>
              ))}
            </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBox;
