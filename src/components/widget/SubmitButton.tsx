import React from "react";
import { PulseLoader  } from "react-spinners";

interface Props {
  title: string;
  isLoading: boolean | undefined;
}

const SubmitButton: React.FC<Props> = (props: Props) => {
  const { title, isLoading } = props;

  return (
    <button
      className={`flex bg-banddrivegray-200 justify-center items-center text-white w-full rounded-lg mt-4 py-3 san-serif
         ${
           isLoading
             ? "opacity-50 cursor-not-allowed"
             : "opacity-100 cursor-pointer"
         }
         `}
      disabled={isLoading}
    >
      <span className="mr-2">{title}</span>
      {  isLoading ? <PulseLoader
        size={10}
        color="#4fa94d"
      /> : null }
    </button>
  );
};

export default SubmitButton;
