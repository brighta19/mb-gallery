import { getDatabase, ref, set, get } from "firebase/database";
import {
  getStorage,
  uploadBytes,
  ref as sRef,
  getDownloadURL,
} from "firebase/storage";

/*
@param database = Firebase database initialization
@param Refpath = path of the reference
@data = data to be set

Writes data to Refpath
*/
export function writeData(database, Refpath, data) {
  set(ref(database, Refpath), data);
}

/*
@param database = Firebase database initialization
@param ref = path of the reference
@file = the image file to be uploaded

Uploads file to Firebase storage and returns the url of the image

@returns url of the image
*/
export async function uploadImageAndSetUrl(storage, ref, file) {
  const storageRef = sRef(storage, ref);
  let promise = new Promise(function (resolve, reject) {
    uploadBytes(storageRef, file).then((snap) => {
      getDownloadURL(storageRef).then((url) => {
        resolve(url);
      });
    });
  });
  const url = await promise;
  return url;
}

/*
@param database = Firebase database initialization
@param ref = path of the reference

Gets data from Refpath Firebase database

@returns data at Refpath
*/
export async function getData(database, DBref) {
  let promise = new Promise((resolve, reject) => {
    const DbRef = ref(database, DBref);
    get(DbRef).then((snap) => {
      resolve(snap.val());
    });
  });
  const data = await promise;
  return data;
}
