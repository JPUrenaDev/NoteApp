import React from "react";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
const DivFilter = styled.div`
  display: flex;
  gap: 20px;
`;
export const Filter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const onFilterNotes = (value) => {
    setSearchParams({ filter: value.target.value });
  };
  return (
    <>
      <DivFilter className="mt-[10px] mb-[50px]">
        <button
          value={"All Notes"}
          onClick={onFilterNotes}
          className="bg-blue-500 w-[10%]  hover:bg-blue-700 text-white font-bold py-1 px-1 border border-blue-700 rounded"
        >
          All Notes
        </button>
        <button
          onClick={onFilterNotes}
          value={"Active Notes"}
          className="bg-blue-500 w-[10%]  hover:bg-blue-700 text-white font-bold py-1 px-1 border border-blue-700 rounded"
        >
          Active Notes
        </button>
        <button
          value={"Archived Notes"}
          onClick={onFilterNotes}
          className="bg-blue-500 w-[10%]  hover:bg-blue-700 text-white font-bold py-1 px-1 border border-blue-700 rounded"
        >
          Archived Notes
        </button>
      </DivFilter>
    </>
  );
};
