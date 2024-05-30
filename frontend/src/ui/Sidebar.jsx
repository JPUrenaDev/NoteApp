import React from "react";
import { CategoriesList } from "./CategoriesList";
import styled from "styled-components";
import { Avatar } from "./Avatar";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { SlNotebook } from "react-icons/sl";
import { FaRegFileArchive } from "react-icons/fa";
import LogoutButton from "./LogoutButton";
const DivSide = styled.div`
  background-color: #3f7afe;
  display: flex;
  flex-direction: column;
  height: 100vh;

  padding: 10px;
  gap: 40px;
  color: white;
  grid-area: sidebar;
  font-weight: 400;
  font-style: normal;
  letter-spacing: 2px;
`;

const LinkStyle = styled(Link)`
  display: flex;
  align-items: center;
  gap: 13px;
  text-decoration: none;
`;
export const Sidebar = () => {
  return (
    <DivSide className="flex">
      <LogoutButton />
      <LinkStyle to={"notes"}>
        <SlNotebook color="white" />
        Notes
      </LinkStyle>
    </DivSide>
  );
};
