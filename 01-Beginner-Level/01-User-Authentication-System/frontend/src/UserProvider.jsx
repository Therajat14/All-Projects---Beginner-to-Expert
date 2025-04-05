import { useState } from "react";
import { UserContext } from "./userContext";

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userAge, setUserAge] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userData, setUserData] = useState("");

  return (
    <UserContext.Provider
      value={{
        userName,
        setUserName,
        userAge,
        setUserAge,
        userEmail,
        userPassword,
        setUserEmail,
        setUserPassword,
        userData,
        setUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
