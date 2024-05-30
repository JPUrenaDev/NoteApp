import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { convertTextToArray } from "../../helper/convertTextToArray";
import { useInsertNote } from "../../customHooks/useInsertNote";
import { useUpdateNote } from "../../customHooks/useUpdateNote";
import { FaSave } from "react-icons/fa";

const DivWrittinArea = styled.div`
  grid-area: writtinarea;
  overflow: scroll;
`;

const TextArea = styled.textarea`
  background: white;
  outline: none;
  width: 100%;
  height: 500px;
  font-weight: bold;
  max-lines: 400px;
  resize: none;
`;

const Input = styled.input`
  background: white;
  background: transparent;
  border: none;
  outline: none;
  width: 100%;
  word-break: break-all;
  height: 40px;
  font-size: 28px;
`;

export const WriteNote = ({ data }) => {
  const userId = localStorage.getItem("userId");
  const { mutation: insertMutation } = useInsertNote();
  const { mutation: updateMutation } = useUpdateNote();
  const [searchParams] = useSearchParams();
  const noteSelected = searchParams.get("noteId");
  const defaultValuesNote = useMemo(() => {
    return data?.find((note) => note.id == noteSelected);
  }, [data, noteSelected]);

  const [textContent, setTextContent] = useState("");
  const textConverted = convertTextToArray({ defaultValuesNote });

  useEffect(() => {
    setTextContent(defaultValuesNote);
  }, [defaultValuesNote]);

  const { handleSubmit, register } = useForm({
    defaultValues: {},
  });

  const onSaveData = (dataToBeSaved) => {
    console.log(dataToBeSaved);
    if (!defaultValuesNote) {
      insertMutation.mutate({
        ...dataToBeSaved,
        status: true,
        userId,
        categoryId:
          typeof Number(dataToBeSaved.category) !== "number"
            ? 1
            : dataToBeSaved.category,
      });
    } else {
      updateMutation.mutate({
        id: defaultValuesNote.id,
        ...dataToBeSaved,
        userId,
        categoryId:
          typeof Number(dataToBeSaved.category) !== "number"
            ? defaultValuesNote.categoryId
            : dataToBeSaved.category,
      });
    }
  };

  return (
    <DivWrittinArea>
      <form onSubmit={handleSubmit(onSaveData)}>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Select a category
        </label>
        <select
          {...register("category")}
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[50%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option selected>Select a category</option>
          <option value="3">Personal Proyect 😎</option>
          <option value="4">Business 👨‍💼</option>
          <option value="5">Work 🏢</option>
          <option value="6">Anime 🤸‍♀️ </option>
        </select>
        <div className="flex flex-wrap gap-4 justify-between">
          <div className="flex items-center gap-4"></div>

          <div className="flex gap-4 items-center">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex items-center">
              <FaSave className="mr-2" />
              Save
            </button>
          </div>
        </div>

        <Input
          {...register("title", { required: true })}
          placeholder="Title"
          id="title"
          onChange={(e) =>
            setTextContent({ ...textContent, title: e.target.value })
          }
          value={!textContent ? "" : textContent?.title}
        />
        <TextArea
          maxLength="10000"
          {...register("content", { required: true })}
          onChange={(e) =>
            setTextContent({ ...textContent, content: e.target.value })
          }
          placeholder="Contents"
          id="content"
          value={!textContent ? "" : textContent?.content}
        />
      </form>
    </DivWrittinArea>
  );
};
