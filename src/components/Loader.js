import React from "react";
import { TailSpin } from "react-loader-spinner";

function Loader({ show }) {
  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center ${
          show ? "visible" : "invisible"
        }`}
      >
        <div className="fixed inset-0 bg-slate-300 opacity-50"></div>
        <div className="relative">
          <TailSpin
            height="80"
            width="80"
            color="white"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      </div>
    </>
  );
}

export default Loader;
