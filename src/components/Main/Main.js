import styles from "./Main.module.css";
import Content from "../UI/Content";
import Sidebar from "./Sidebar";
import Tasks from "./Tasks";

const Main = () => {
  return (
    <section className={styles.main}>
      <Content>
        <div className={styles["main__row"]}>
          <Sidebar />
          <Tasks />
        </div>
      </Content>
    </section>
  );
};

export default Main;