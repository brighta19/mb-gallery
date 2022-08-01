//Code from: https://loading.io/css/

//Style
import "../style.scss";

const Loader = (props) => {
  return (
    <div
      style={{ display: props.visibility === true ? "block" : "none" }}
      id="loaderHolder"
    >
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
