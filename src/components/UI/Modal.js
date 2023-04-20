import styles from "./Modal.module.css";
import ReactDOM from "react-dom";

const Modal = (props) => {
  const modal = (
    <div className={styles["modal-wrapper"]}>
      <div className={styles["modal-window"]}>{props.children}</div>
      <div className={styles.overlay}></div>
    </div>
  );

  const modalRoot = document.getElementById("modal-root");

  return (
    <>
      {ReactDOM.createPortal(modal, modalRoot)}
    </>
  );
};

export default Modal;