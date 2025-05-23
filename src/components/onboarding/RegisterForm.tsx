import SubmitButton from "@/components/widget/SubmitButton";
import React, { useState } from "react";
// import { ReactComponent as AppLogo } from "../../assets/images/svg/app-logo.svg";
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
import { useRouter } from "next/navigation";

interface Props {
  getUserInfo: (val: any)=> void;
  isLoading: boolean | undefined;
}

const LoginForm: React.FC<Props> = (props: Props) => {
  const { getUserInfo, isLoading } = props;
  const navigation = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
    fullname: ""
  });
  const [show, setShow] = useState(false);

  //Function
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getUserInfo(user);
  };

  return (
    <form
      onSubmit={(event) => submit(event)}
      className="md:w-[450px] sm:w-10/12 w-11/12 flex flex-wrap justify-center rounded-lg shadow-md p-4"
    >
     <div className="flex justify-center w-full"> <b className='about_header'>BANDdrive</b></div>
      <b className="block w-full text-center red-hat font-bold pt-4">
        Hi, Welcome
      </b>
      <span className="red-hat text-gray-400 pb-3">
        Please sign-up to start your experience
      </span>

      <div className="input-container">
        <input placeholder="Full name"
         onChange={(e) => {
          setUser({ ...user, fullname: e.target.value });
        }}
        className="w-full input" />
      </div>

      <div className="input-container">
        <input
          placeholder="Email"
          onChange={(e) => {
            setUser({ ...user, email: e.target.value });
          }}
          className="w-full input"
        />
      </div>

      <div className="input-container">
        <input
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
          }}
          type={show ? "text" : "password"}
          placeholder="Password"
          className="w-full input"
        />
        <span className="input-icon" onClick={() => setShow(!show)}>
          {show ? <BsEye size={21} /> : <BsEyeSlash size={21} />}
        </span>
      </div>

      <SubmitButton isLoading={isLoading} title={"Register"} />

      <div>
        <p className="red-hat text-[14px] py-5">
          <span>Don’t have an account?</span>
          <span
            className="text-red-500 mx-4 cursor-pointer"
            onClick={() => navigation.push("/auth/login")}
          >
            Login
          </span>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
