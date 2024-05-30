import React, { useState } from "react";
import { ToggleContext } from "../../context/toggleContext";
import { useContext } from "react";
import styled from "styled-components";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoIosArrowDropdownCircle } from "react-icons/io";

const DivToggle = styled.div`
  display: flex;
  gap: 60px;
  align-items: center;
`;

const DivRenderCategory = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Button = styled.button`
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
`;

export const ToggleList = ({ children }) => {
  const [toggle, setToggle] = useState(false);
  return (
    <ToggleContext.Provider value={{ toggle, setToggle }}>
      {children}
    </ToggleContext.Provider>
  );
};

const OpenCloseToggle = ({ label }) => {
  const { toggle, setToggle } = useContext(ToggleContext);

  return (
    <DivToggle>
      <label>{label}</label>
      <Button onClick={() => setToggle(!toggle)}>
        {!toggle ? (
          <IoIosArrowDroprightCircle size={23} />
        ) : (
          <IoIosArrowDropdownCircle size={23} />
        )}{" "}
      </Button>
    </DivToggle>
  );
};

const ShowOptions = ({ data, callback }) => {
  console.log(data, callback);
  const { toggle, setToggle } = useContext(ToggleContext);

  return toggle ? (
    <DivRenderCategory>{data.map(callback)}</DivRenderCategory>
  ) : null;
};

ToggleList.OpenCloseToggle = OpenCloseToggle;
ToggleList.ShowOptions = ShowOptions;
