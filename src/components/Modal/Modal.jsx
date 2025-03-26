// import style from "./styles.module.css";
import Container from "../../Container/Container";
import styles from "./styles.module.css";

const { wrapper } = styles;
const Modal = ({ children, showModal, modalHandler }) => {
  if (!showModal) return null;

  return (
    <>
      {" "}
      <div className={wrapper} onClick={modalHandler}>
        {" "}
      </div>
      <Container
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "400px",
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "5px",
          outline: "none",
          zIndex: "2",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <span
          onClick={modalHandler}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            cursor: "pointer",
            fontSize: "18px",
            color: "black",
            padding: "5px",
            border: "1px solid",
            borderRadius: "5px",
            backgroundColor: "red",
          }}
        >
          x
        </span>
        {children}
      </Container>
    </>
  );
};

export default Modal;
