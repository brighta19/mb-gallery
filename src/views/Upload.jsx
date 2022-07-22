import React, { useContext, useState } from "react";

//Styles
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

//Firebase Methods
import {
  writeData,
  uploadImageAndSetUrl,
} from "../function/firebaseMethods.js";
import { getDatabase, push, ref, child } from "firebase/database";

//Context
import { ConfigContext } from "../GlobalContext";

const Upload = () => {
  const Globalconfig = useContext(ConfigContext);

  const [imgSrc, setImgSrc] = useState("");
  return (
    <div class="form">
      <div class="thumbnail" style={{ opacity: imgSrc === "" ? 0 : 1 }}>
        <img src={imgSrc} alt=""/>
      </div>

      <input
        type="file"
        id="image"
        style={{ width: "100%" }}
        onChange={() => {
          const file = document.getElementById("image").files[0];
          setImgSrc(URL.createObjectURL(file));
        }}
      />
      <input type="text" id="caption" placeholder="Description" />
      <input type="author" id="author" placeholder="Author" />

      <Button
        variant="success"
        onClick={() => {
          //Prepare data
          const caption = document.getElementById("caption").value;
          const author = document.getElementById("author").value;
          const image = document.getElementById("image").files[0];
          //Upload image to firebase
          const postKey = push(child(ref(Globalconfig.database), "posts/")).key;
          uploadImageAndSetUrl(
            Globalconfig.storage,
            "posts/" + postKey + "/image.jpg",
            image
          ).then((url) => {
            const data = {
              description: caption,
              author: author,
              image_url: url,
            };
            writeData(Globalconfig.database, `posts/${postKey}`, data);
            //Clear input fields
            document.getElementById("caption").value = "";
            document.getElementById("author").value = "";
            document.getElementById("image").value = "";
            setImgSrc("");

            //TO DO: Set a success message
          });
        }}
      >
        Upload
      </Button>
    </div>
  );
};

export default Upload;
