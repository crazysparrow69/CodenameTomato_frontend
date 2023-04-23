import styles from "./Header.module.css";
import Content from "../UI/Content";
import Button from "../UI/Button";
import AppContext from "../../context/app-context";
import { useContext, useState } from "react";
import Modal from "../UI/Modal";
import RegistrationForm from "../Forms/RegistrationForm";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const ctx = useContext(AppContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    document.location.reload();
  };

  const handleLogin = () => {
    setShowModal(true);
  };

  return (
    <section className={styles.header}>
      {showModal && <Modal>
        <RegistrationForm />
      </Modal>}
      <Content>
        <div className={styles["header__row"]}>
          <div className={styles["header__title"]}>
            <p>Codename<span>Tomato</span></p>
          </div>
          <div className={styles["header__button"]}>
            {ctx.isLoggedIn ? <Button text="Logout" onClick={handleLogout} /> : <Button text="Login" onClick={handleLogin} />}
          </div>
        </div>
      </Content>
    </section>
  );
};

export default Header;