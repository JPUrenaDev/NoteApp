import React from "react";
import { Filter } from "../ui/Filter";
import { SearchBar } from "../ui/SearchBar";
import styled from "styled-components";
import { ListNotes } from "../features/Notes/ListNotes";
import { useSearchParams } from "react-router-dom";

const DivNotes = styled.div`
  background-color: #f6f7fb;
  height: 100%;

  display: flex;
  flex-direction: column;
  padding: 20px;
`;

export const Notes = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterSelected = searchParams.get("filter");
  return (
    <>
      <DivNotes>
        <label className="font-bold text-2xl">
          {!filterSelected ? "All Notes" : filterSelected}
        </label>
        <Filter></Filter>

        <ListNotes />
      </DivNotes>
    </>
  );
};
