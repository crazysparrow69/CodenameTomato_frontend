import styles from "./Header.module.css";
import Content from "../UI/Content";
import Button from "../UI/Button";
import AppContext from "../../context/app-context";
import { useContext, useState } from "react";
import Modal from "../UI/Modal";
import RegistrationForm from "../Forms/RegistrationForm";
import LoginForm from "../Forms/LoginForm";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const ctx = useContext(AppContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    document.location.reload();
  };

  const handleLogin = () => {
    setShowModal(true);
  };

  const handleClosing = () => {
    setShowRegisterForm(false);
    setShowModal(false);
  };

  const showRegister = () => {
    setShowRegisterForm(true);
  };

  const showLogin = () => {
    setShowRegisterForm(false);
  };

  return (
    <section className={styles.header}>
      {showModal && <Modal onClose={handleClosing}>
        <div className={styles["form-mode"]}>
          <button onClick={showLogin} >login</button>
          <button onClick={showRegister} >register</button>
        </div>
        {showRegisterForm ? <RegistrationForm /> : <LoginForm />}
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