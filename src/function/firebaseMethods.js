import { ref, set } from "firebase/database";
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

export async function uploadImageAndSetUrl(storage, ref, file, stateSetter) {
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
