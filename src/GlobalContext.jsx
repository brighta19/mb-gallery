import React, { useState } from "react";

//Firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

//Context
export const ConfigContext = React.createContext();

const GlobalContext = (props) => {
  //Firebase
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  const [FirebaseDatabase, setDatabase] = useState(getDatabase());
  const [StorageFirebase, setStorageFirebase] = useState(getStorage());

  return (
    <ConfigContext.Provider
      value={{
        database: FirebaseDatabase,
        storage: StorageFirebase,
      }}
    >
      {props.children}
    </ConfigContext.Provider>
  );
};

export default GlobalContext;
