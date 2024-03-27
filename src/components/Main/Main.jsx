import React from "react";
import styles from "./Main.module.css";
import ChatBotCardImg from "../../assets/Chat-bot-bro.svg";
import ResponsiveImg from "../../assets/responsive.svg";
import ConversationalImg from "../../assets/conversational.jpg";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h3>Features</h3>
      </div>
      <div className={styles.cards}>
        <div className={styles.card}>
          <div className={styles.image}>
            <img src={ConversationalImg} alt="ConversationalImg" />
          </div>
          <div className={styles.text}>
            <h1 className={styles.cardTitle}>Powerful Model Powered</h1>
            <p>
              AhaduChat is an AI-driven chatbot that specializes in
              understanding Amharic speech, powered by the innovative technology
              of ahadu-asr-01 and Open AI's text-davinci-003 models.
              Equipped with a comprehensive knowledge base and advanced natural
              language processing skills, AhaduChat shines in delivering
              conversations that closely mimic human interaction.
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.image}>
            <img src={ChatBotCardImg} alt="ChatBotCardImg" />
          </div>
          <div className={styles.text}>
            <h1 className={styles.cardTitle}>Conversational ChatBot</h1>
            <p>
            AhaduChat is a conversational AI chatbot designed to engage in
              dynamic and interactive conversations. It exhibits exceptional
              natural language understanding and generation capabilities,
              enabling it to respond to user queries, hold meaningful
              discussions, and provide valuable information. Moreover, provides
              a refined level of response consistency with reduced randomness.
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.image}>
            <img src={ResponsiveImg} alt="ResponsiveImg" />
          </div>
          <div className={styles.text}>
            <h1 className={styles.cardTitle}>Responsive & Clean UI</h1>
            <p>
            AhaduChat is also accompanied by a clean and responsive user
              interface(UI). The UI is designed to provide a seamless and
              intuitive user experience, allowing users to interact with the
              chatbot effortlessly. The responsive nature of the UI ensures that
              the chatbot adapts well to different screen sizes and devices,
              providing a consistent experience across platforms.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.explore}>
        <Link to="/chatbox">
          <button className={styles.btn}>Explore Now !</button>
        </Link>
      </div>
    </div>
  );
};

export default Main;
