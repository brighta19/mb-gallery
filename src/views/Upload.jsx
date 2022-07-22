import React, { useContext, useState } from "react";

//Styles
import "../style.scss";
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
    <>
      <img src={imgSrc} alt="" />
      <br></br>
      <input
        type="file"
        id="image"
        onChange={() => {
          const file = document.getElementById("image").files[0];
          setImgSrc(URL.createObjectURL(file));
        }}
      />
      <br></br>
      <input type="text" id="caption" placeholder="Description" />
      <br></br>
      <input type="author" id="author" placeholder="Author" />
      <br></br>
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
      <Button
        onClick={() => {
          console.log(imgSrc);
        }}
      >
        Try
      </Button>
    </>
  );
};

export default Upload;
