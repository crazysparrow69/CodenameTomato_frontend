import styles from "./Header.module.css";
import Content from "../UI/Content";
import Button from "../UI/Button";

const Header = () => {
  return (
    <section className={styles.header}>
      <Content>
        <div className={styles["header__row"]}>
          <div className={styles["header__title"]}>
            <p>Codename<span>Tomato</span></p>
          </div>
          <div className={styles["header__button"]}>
            <Button text="Login"/>
          </div>
        </div>
      </Content>
    </section>
  );
};

export default Header;