import styles from "./Modal.module.css";
import ReactDOM from "react-dom";

const Modal = (props) => {
  const modal = (
    <div className={styles["modal-wrapper"]}>
      <div className={styles["modal-window"]}>
        <div className={styles["modal-actions"]}>
          <button onCLick={props.onClose}>✖</button>
        </div>
        {props.children}
      </div>
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