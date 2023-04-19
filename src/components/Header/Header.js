import styles from "./Header.module.css";
import Content from "../UI/Content";
import Button from "../UI/Button";
import AppContext from "../../context/app-context";
import { useContext } from "react";

const Header = () => {
  const ctx = useContext(AppContext);

  return (
    <section className={styles.header}>
      <Content>
        <div className={styles["header__row"]}>
          <div className={styles["header__title"]}>
            <p>Codename<span>Tomato</span></p>
          </div>
          <div className={styles["header__button"]}>
            {ctx.isLoggedIn ? <Button text="Logout"/> : <Button text="Login"/>}
          </div>
        </div>
      </Content>
    </section>
  );
};

export default Header;