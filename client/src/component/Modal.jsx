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
        style={{
          display: props.visibility ? "block" : "none",
          background: `linear-gradient(to right, ${props.bgColor1}, ${props.bgColor2})`,
        }}
      >
        {props.children}
      </div>
    </>
  );
};

export default Modal;
