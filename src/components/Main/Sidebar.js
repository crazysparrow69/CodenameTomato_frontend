import styles from "./Sidebar.module.css";
import AppContext from "../../context/app-context";
import { useContext, useState, useEffect, useCallback } from "react";
import useHttp from "../../hooks/use-http";

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (err) => {
      reject(err);
    };
  });
};

const Sidebar = () => {
  const [showFile, setShowFile] = useState(false);
  const [showError, setShowError] = useState(false);

  const ctx = useContext(AppContext);

  const imageCallback = useCallback((data) => {
    document.location.reload();
  });

  const { isLoading, error, sendRequest } = useHttp(imageCallback);

  const handleFileUpload = async (event) => {
    setShowError(false);

    const file = event.target.files[0];

    if (file.size > 67153) {
      setShowError(true);
      return;
    }

    const base64 = await convertToBase64(file);

    sendRequest({
      url: "http://localhost:3500/image",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: {
        file: base64,
      },
    });
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles["sidebar__avatar"]}>
        <img
          src={ctx.avatar || "https://yummyanime.tv/bag.webp"}
          alt="Error"
        ></img>
      </div>
      <div className={styles["sidebar__username"]}>{ctx.userData.username}</div>
      {ctx.isLoggedIn && <div className={styles.actions}>
        {!showFile ? (
          <button onClick={() => setShowFile(true)}>Change avatar</button>
        ) : (
          <input
            type="file"
            accept=".jpeg, .png, .jpg"
            onChange={(e) => handleFileUpload(e)}
          />
        )}
        {showError && <p>Size is too big</p>}
      </div>}
    </div>
  );
};

export default Sidebar;