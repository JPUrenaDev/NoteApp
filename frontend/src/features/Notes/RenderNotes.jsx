import React from "react";
import styled from "styled-components";

import { adjustingContent } from "../../helper/adjustingContent";
import { useSearchParams } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { useDeleteNote } from "../../customHooks/useDeleteNote";
import { BiSolidArchiveIn } from "react-icons/bi";
import { useUpdateNote } from "../../customHooks/useUpdateNote";
export const RenderNotes = ({ notes }) => {
  const { mutation: mutationDelete } = useDeleteNote();
  const { mutation: mutationUpdate } = useUpdateNote();
  const [searchParams, setSearchParams] = useSearchParams();

  const onSetParams = (e) => {
    console.log(notes);
    searchParams.set("noteId", notes.id);
    setSearchParams(searchParams);
  };

  console.log(notes);

  const onDeleteNote = () => {
    mutationDelete.mutate({ id: notes.id });
  };

  const onArchiveNote = () => {
    mutationUpdate.mutate({ ...notes, status: !notes.status });
  };

  return (
    <div>
      <div className="cursor-pointer p-5" onClick={onSetParams}>
        <div>
          <div className="flex items-center justify-between text-[10px]">
            <div className="flex gap-[7px] items-center">
              <div
                className={`rounded-full w-3 h-3 ${notes.status == 1 ? "bg-yellow-400" : "bg-red-900"} `}
              ></div>
              <label>{notes.status == 1 ? "active" : "archived"}</label>
            </div>
            <label>{new Date(notes.createdAt).toLocaleString()}</label>
          </div>

          <h1 className="font-semibold break-all">
            {adjustingContent(notes?.title)}
          </h1>
          <h6 className="break-all">{adjustingContent(notes?.content)}</h6>
        </div>
      </div>
      <span className="bg-gray-500 text-white font-bold py-1 px-2 rounded">
        {notes?.categoryId == 3
          ? "Personal Proyect 😎"
          : notes?.categoryId == 4
            ? "Business 👨‍💼"
            : notes?.categoryId == 5
              ? "Work 🏢"
              : notes?.categoryId == 6
                ? "Anime 🤸‍♀️"
                : "No category"}
      </span>

      <div className="flex justify-end pb-1 mr-4 gap-4">
        <button>
          <FaEdit onClick={onSetParams} />
        </button>
        {searchParams.get("filter") !== "All Notes" && (
          <button onClick={onArchiveNote}>
            <BiSolidArchiveIn />
          </button>
        )}

        <button onClick={onDeleteNote} disabled={mutationDelete.isPending}>
          <FaRegTrashAlt />
        </button>
      </div>
    </div>
  );
};
