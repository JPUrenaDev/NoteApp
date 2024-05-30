import { useState } from "react";
import { RenderNotes } from "./RenderNotes";
import styled from "styled-components";
import { WriteNote } from "./WriteNote";
import { useSearchParams } from "react-router-dom";
import { SearchBar } from "../../ui/SearchBar";
import { useNavigate } from "react-router-dom";
import { useSelectAllNotes } from "../../customHooks/useSelectAllNotes";
const DivListNote = styled.div`
  display: grid;
  grid-template-columns: 420px 1fr;
  grid-template-rows: auto;
  grid-template-areas: "noteslist writtinarea";
`;

const DivTopOptions = styled.div`
  grid-area: noteslist;
`;

export const ListNotes = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const filterParam = searchParams.get("filter");
  const userId = localStorage.getItem("userId");
  const { data } = useSelectAllNotes({ filterParam, userId });
  const [inputTextToFilter, setinputTextToFilter] = useState("");

  const dataFiltered = data?.data?.data?.filter(
    (item) =>
      item.title.toLowerCase().includes(inputTextToFilter.toLowerCase()) ||
      item.content.toLowerCase().includes(inputTextToFilter.toLowerCase())
  );
  const onOpenCreateArea = () => {
    navigate("/notes");
  };

  return (
    <DivListNote>
      <DivTopOptions>
        <SearchBar setinputTextToFilter={setinputTextToFilter} />

        <button
          className="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          onClick={onOpenCreateArea}
        >
          + Add New Note
        </button>

        <div className="grid grid-cols-1 divide-y h-[550px] overflow-scroll mt-5">
          {dataFiltered?.map((notes, index) => {
            return <RenderNotes notes={notes} key={index} />;
          })}
        </div>
      </DivTopOptions>
      {<WriteNote data={data?.data?.data} />}
    </DivListNote>
  );
};
