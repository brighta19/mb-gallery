//Styles
import "../style.scss";

//Component
import Loader from "../component/Loader";

const Posts = (props) => {
  if (props.image !== "") {
    return (
      <>
        <div className="post">
          <img id="postImg" src={props.image} />
          <h4>Author: {props.author}</h4>
          <h5>{props.caption}</h5>
        </div>
      </>
    );
  } else {
    <Loader />;
  }
};

export default Posts;
