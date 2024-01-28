import { createContext, useEffect, useState } from "react";
export const UserContext = createContext(null);

const UserStore = (props) => {
  const [color, setColor] = useState(
    localStorage.getItem("bgcolor") || "orange"
  );

  const [name, setName] = useState(
    localStorage.getItem("name") || "이름을 입력해주세요."
  );

  const [imgUrl, setImgUrl] = useState(
    localStorage.getItem("imgUrl") || "이미지경로"
  );

  useEffect(() => {
    localStorage.setItem("bgcolor", color);
  }, [color]);

  useEffect(() => {
    localStorage.setItem("name", name);
  }, [name]);

  useEffect(() => {
    localStorage.setItem("imgUrl", imgUrl);
  }, [imgUrl]);

  return (
    <UserContext.Provider
      value={{ color, setColor, name, setName, imgUrl, setImgUrl }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserStore;
