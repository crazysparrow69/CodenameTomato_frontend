import styles from "./Sidebar.module.css";
import AppContext from "../../context/app-context";
import { useContext } from "react";

const Sidebar = () => {
  const ctx = useContext(AppContext);

  return (
    <div className={styles.sidebar}>
      <div className={styles["sidebar__avatar"]}>
        <img src="https://yummyanime.tv/bag.webp" alt="Error"></img>
      </div>
      <div className={styles["sidebar__username"]}>{ctx.userData.username}</div>
    </div>
  );
};

export default Sidebar;