import React from "react";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import LogoutButton from "./LogoutButton";
const Div = styled.div`
  display: grid;
  grid-template-columns: 230px 1fr;
  grid-template-rows: auto;
  grid-template-areas: "sidebar content";
`;

const DivOutlet = styled.div`
  grid-area: content;
`;

export const Layaout = () => {
  return (
    <>
      <Div>
        <Sidebar />

        <DivOutlet>
          <Outlet />
        </DivOutlet>
      </Div>
    </>
  );
};
