import { useState } from "react";
import { UserContext } from "./userContext";

export const UserProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  return (
    <UserContext.Provider
      value={{ userEmail, userPassword, setUserEmail, setUserPassword }}
    >
      {children}
    </UserContext.Provider>
  );
};
