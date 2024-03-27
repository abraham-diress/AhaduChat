import React from "react";
import styles from "./Header.module.css";
import chatbotBanner from "../../assets/chatbotbanner.svg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <p className={styles.heading}>
          "ከእርስዎ ጎን ባለው የAI Voice ChatBot ምርታማነትን ይክፈቱ"
        </p>
        <p className={styles.subHeading}>
          ከAhaduChat ጋር ይተዋወቁ፡ በሰው ሰራሽ የማሰብ ችሎታ ሃይል የሚሰራ ረዳትዎ በአማርኛ አቀላጥፎ ይናገራል። እሱ
          ቻትቦት ብቻ ሳይሆን እያንዳንዱን መስተጋብር የሚያስታውስ እና የሚቀያየር የውይይት አጋር ነው፣ እያንዳንዱን
          ልውውጥ የበለጠ ተዛማጅ እና አሳታፊ ያደርጋል። ከአፍሮቻት ጋር የወደፊት ግንኙነትን ይለማመዱ።
        </p>
        <Link to="/chatbox">
          <button className={styles.btn}>Get Started</button>
        </Link>
      </div>
      <div className={styles.right}>
        <img src={chatbotBanner} alt="AI" />
      </div>
    </div>
  );
};

export default Header;
