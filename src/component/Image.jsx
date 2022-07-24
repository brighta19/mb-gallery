import { useState } from "react";

// Components Import
import Loader from "../component/Loader";

const Image = (props) => {
  const [loaderVisibility, setLoaderVisibility] = useState(true);

  const image_url = props.image_url;
  const title = props.caption;
  const author = props.author;
  return (
    <div className="thumbnail">
      <img
        style={{ display: loaderVisibility === false ? "block" : "none" }}
        src={image_url}
        alt={title}
        onClick={props.onClick}
        onLoad={() => setLoaderVisibility(false)}
      />
      <Loader visibility={loaderVisibility} />
    </div>
  );
};

export default Image;
