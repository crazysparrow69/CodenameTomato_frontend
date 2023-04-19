import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles["sidebar__avatar"]}>
        <img src="https://yummyanime.tv/bag.webp" alt="Error"></img>
      </div>
      <div className={styles["sidebar__username"]}>Nagibator669</div>
    </div>
  );
};

export default Sidebar;