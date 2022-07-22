//Style
import "../style.scss";

const Modal = (props) => {
  return (
    <>
      <div
        className="modalOverlay"
        style={{ display: props.visibility ? "block" : "none" }}
      ></div>
      <div
        className="customModal"
        style={{ display: props.visibility ? "block" : "none" }}
      >
        {props.children}
      </div>
    </>
  );
};

export default Modal;
