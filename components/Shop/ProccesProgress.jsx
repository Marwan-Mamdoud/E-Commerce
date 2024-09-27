import React from "react";

const ProccesProgress = ({ step1, step2, step3 }) => {
  return (
    <div className={`flex justify-center items-center gap-4 pt-10 mr-[5rem]`}>
      <div className="flex flex-col items-center justify-center gap-2">
        <p
          className={`rounded-full text-center font-mono ${
            step1
              ? "text-green-400 border-green-400"
              : " text-slate-500 border-slate-600"
          } text-xl  border-2  text-center  px-2.5 py-[1px] bg-black`}
        >
          1
        </p>
        <div
          className={`text-lg font-mono ${
            step1
              ? "text-green-400 border-green-400"
              : " text-slate-600 border-slate-600"
          }`}
        >
          Login
        </div>
      </div>
      <div
        className={`h-0.5 w-40 ${step1 ? "bg-green-400" : `bg-slate-600`}`}
      ></div>
      <div className="flex flex-col items-center justify-center gap-2">
        <div
          className={`rounded-full  font-mono ${
            step2
              ? "text-green-400 border-green-400"
              : " text-slate-500 border-slate-600"
          } text-xl  border-2 items-center justify-center text-center px-2.5 py-[1px] bg-black`}
        >
          2
        </div>
        <div
          className={`text-lg font-mono ${
            step2
              ? "text-green-400 border-green-400"
              : "text-slate-600 border-slate-600"
          } `}
        >
          Shipping
        </div>
      </div>
      <div
        className={`h-0.5 w-40 ${step2 ? "bg-green-400" : "bg-slate-600"}`}
      ></div>
      <div className="flex flex-col items-center justify-center gap-2">
        <div
          className={`rounded-full  font-mono ${
            step3
              ? "text-green-400 border-green-400"
              : " text-slate-500 border-slate-600"
          } text-xl  border-2  text-center px-2.5 py-[1px] bg-black`}
        >
          3
        </div>
        <div
          className={`text-lg font-mono ${
            step3
              ? "text-green-400 border-green-400"
              : "text-slate-600 border-slate-600"
          } `}
        >
          Summary
        </div>
      </div>
    </div>
  );
};

export default ProccesProgress;
