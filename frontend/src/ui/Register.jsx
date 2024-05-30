import React, { useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useCreateUser } from "../customHooks/useCreateUser";
const DivLoginPage = styled.div`
  width: 100vw;

  display: flex;
  place-items: center;
  margin-right: auto;
  margin-left: auto;
`;

const Divform = styled.form`
  background-color: white;
  width: 440px;
  height: 650px;
  border: 2px solid;
  border-color: #b0afb0;
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  padding: 5px;
`;

const InputForm = styled.input`
  width: 100%;
  height: 40px;
  border: 2px solid;
  border-color: #b0afb0;
  margin-bottom: 10px;
  padding: 10px;
`;

const Label = styled.label`
  width: 100%;
  margin-bottom: 8px;
  font-weight: bold;
`;

export const Register = () => {
  const { mutation: registerUserMutation } = useCreateUser();

  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  const { handleSubmit, register } = useForm({
    defaultValues: {},
  });

  useEffect(() => {
    if (registerUserMutation.data) {
      navigate("/login");
    }
  }, [registerUserMutation.data, navigate]);

  const onSendUserData = (data) => {
    registerUserMutation.mutate({ ...data, status: true });
  };

  // Función para manejar la navegación al hacer clic en el botón "Create your Ensolvers Challenge"
  const handleCreateChallenge = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="flex gap-2 w-[440px] ml-auto mr-auto mt-[70px]">
        <div className="flex items-center mr-auto ml-auto mt-auto mb-auto gap-4">
          <label className="font-bold text-[20px]">Ensolvers Challenge</label>
        </div>
      </div>

      <DivLoginPage>
        <Divform
          onSubmit={handleSubmit(onSendUserData)}
          className="shadow-md rounded-md"
        >
          <Label className="font-semibold text-[30px]">Register</Label>
          <Label>Email</Label>
          <InputForm {...register("email", { require: true })} type="email" />
          <Label>Password</Label>
          <InputForm
            {...register("password", { require: true })}
            type="password"
          />

          <Label>Full Name</Label>
          <InputForm {...register("fullName", { require: true })} />
          <Label>user Name</Label>
          <InputForm {...register("userName", { require: true })} />

          <button
            className="bg-orange-500 rounded-md text-black p-2 w-full mt-6 shadow-md"
            onClick={handleSubmit(onSendUserData)}
          >
            Register
          </button>
          <label className="w-full mt-4">
            By signing-up you agree to the jean-shop Website Conditions of Use &
            Sale. Please see our Privacy Notice, our Cookies Notice and our
            Interest-Based Ads Notice.
          </label>
        </Divform>
      </DivLoginPage>
    </>
  );
};
