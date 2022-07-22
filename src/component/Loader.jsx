//Code from: https://loading.io/css/

//Style
import "../style.scss";

const Loader = () => {
  return (
    <div id="loaderHolder">
      <div class="lds-roller">
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