import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useLogiUser } from "../customHooks/useLoginUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DivLoginPage = styled.div`
  width: 100vw;
  height: 500px;
  display: flex;

  place-items: center;
  margin-right: auto;
  margin-left: auto;

  /* Center vertically */
`;

const Divform = styled.form`
  background-color: white;
  width: 440px;
  height: 460px;
  border: 2px solid;
  border-color: #b0afb0;
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  padding: 5px;
`;

const InputForm = styled.input`
  width: 93%;
  height: 44px;
  border: 2px solid;
  border-color: #b0afb0;
`;

const Label = styled.label`
  width: 93%;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 8px;
`;

export const Login = () => {
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  const { handleSubmit, register, reset } = useForm({
    defaultValues: {},
  });
  const { mutation: userLoginMutation } = useLogiUser();
  const onSendUserData = (data) => {
    userLoginMutation.mutate(data);
  };

  useEffect(() => {
    if (userId) {
      navigate("/notes");
    }
  }, [navigate, userId]);

  return (
    <>
      <div className="flex gap-2  w-[440px]  ml-auto mr-auto  mt-[70px] ">
        <div className="  flex items-center mr-auto ml-auto mt-auto mb-auto gap-4">
          <label className="font-bold text-[20px]">Ensolvers Challenge</label>
        </div>
      </div>

      <DivLoginPage>
        <Divform
          onSubmit={handleSubmit(onSendUserData)}
          className="shadow-md rounded-md  "
        >
          <Label className="font-semibold text-[30px]">Sign-in</Label>
          <Label className="font-semibold  w-[93%] ml-auto mr-auto">
            E-mail
          </Label>
          <InputForm
            {...register("email", { require: true })}
            type="email"
            className="mr-auto ml-auto rounded-md"
          ></InputForm>
          <Label className="font-semibold">Password</Label>
          <InputForm
            className="mr-auto ml-auto rounded-md"
            type="password"
            {...register("password", { require: true })}
          ></InputForm>
          <button className="bg-orange-500 rounded-md text-black p-2 w-[93%] mr-auto mb-5 ml-auto mt-6 shadow-md">
            Sign In
          </button>
          <label className="w-[93%] mr-auto ml-auto mb-4">
            By signing-in you agrew to the jean-shop Website Conditions of Use &
            Sale. Please see our Privacy Notice, our Cookies Notice and our
            Interest-Based Ads Notice.
          </label>

          <button className="w-[93%] ml-auto mr-auto rounded-mdg bg-slate-300 p-1 font-semibold shadow-md">
            Create your Ensolvers Challenge
          </button>
        </Divform>
      </DivLoginPage>
    </>
  );
};
