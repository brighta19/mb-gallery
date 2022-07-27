import React, { useEffect, useContext, useState } from "react";

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

//Firebase Methods
import { getData } from "../function/firebaseMethods.js";

//Components Import
import Loader from "../component/Loader";

const Upload = () => {
  const Globalconfig = useContext(ConfigContext);
  const [loginWall, setLoginWall] = useState(true);

  useEffect(() => {
    getData(Globalconfig.database, "loginWall").then((retData) => {
      setLoginWall(retData);
    });
  }, []);

  const [imgSrc, setImgSrc] = useState("");

  if (!loginWall) {
    return (
      <div className="form">
        <div className="thumbnail" style={{ opacity: imgSrc === "" ? 0 : 1 }}>
          <img src={imgSrc} alt="" />
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
          id="uploadBtn"
          onClick={() => {
            document.getElementById("uploadBtn").disabled = "disabled";
            // //Prepare data
            const caption = document.getElementById("caption").value;
            const author = document.getElementById("author").value;
            const image = document.getElementById("image").files[0];
            //Upload image to firebase
            const postKey = push(
              child(ref(Globalconfig.database), "posts/")
            ).key;
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
              document.getElementById("successImg").style.display = "block";
              document.getElementById("uploadBtn").disabled = "";
            });
          }}
        >
          Upload
        </Button>
        <p id="successImg" style={{ color: "green", display: "none" }}>
          Image uploadeed successfully!
        </p>
      </div>
    );
  } else {
    return (
      <div style={{ textAlign: "center", fontFamily: "arial", color: "red" }}>
        <h1>
          <strong>Login Wall is on</strong>
        </h1>
        <h2>Please contact an administrator to disable the wall</h2>
      </div>
    );
  }
};

export default Upload;
